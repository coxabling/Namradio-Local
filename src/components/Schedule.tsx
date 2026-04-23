/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface ScheduleItem {
  id: number;
  name: string;
  title: string;
  start: string;
  end: string;
  is_now: boolean;
}

export function StationSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://music-station.live/api/station/nam_radio_local/schedule";

  const fetchSchedule = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        // Filter out items with same start time or name to keep it clean
        const uniqueItems = data.reduce((acc: ScheduleItem[], current) => {
          const x = acc.find(item => item.name === current.name || item.start === current.start);
          if (!x) {
            return acc.concat([current]);
          } else {
            // If current is 'now', prefer it over existing match
            if (current.is_now && !x.is_now) {
              const index = acc.indexOf(x);
              acc[index] = current;
            }
            return acc;
          }
        }, []);

        // Sort: Now playing first, then by start time
        const sorted = uniqueItems.sort((a, b) => {
          if (a.is_now && !b.is_now) return -1;
          if (!a.is_now && b.is_now) return 1;
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        });

        setSchedule(sorted.slice(0, 4));
      }
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  if (loading) return (
    <div className="py-12 text-center opacity-40 animate-pulse text-xs uppercase tracking-widest font-black">
      Loading Schedule...
    </div>
  );

  return (
    <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
          <Calendar size={24} />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
            Broadcast <span className="text-white/20">Schedule</span>
          </h2>
          <p className="text-xs text-white/40 uppercase font-bold tracking-widest">
            What's playing next on Nam Radio Local
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {schedule.map((slot, index) => (
          <motion.div 
            key={slot.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-3xl border transition-all ${
              slot.is_now 
                ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10' 
                : 'bg-surface border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded ${
                slot.is_now ? 'bg-primary text-black' : 'bg-white/5 text-white/40'
              }`}>
                {slot.is_now ? 'On Air' : 'Upcoming'}
              </div>
              <Clock size={16} className={slot.is_now ? 'text-primary' : 'text-white/20'} />
            </div>
            
            <h3 className={`text-lg font-bold mb-4 leading-tight italic ${slot.is_now ? 'text-white' : 'text-white/80'}`}>
              {slot.name}
            </h3>
            
            <div className="flex items-center gap-2 text-xs font-mono text-white/40">
              <span>{formatTime(slot.start)}</span>
              <ArrowRight size={10} />
              <span>{formatTime(slot.end)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-[40px] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex gap-4 items-center text-left">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-black">
            <Calendar size={24} />
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm text-white">Full Weekly Calendar</h4>
            <p className="text-xs text-white/40">Download our monthly artist spotlight guide.</p>
          </div>
        </div>
        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
          View Full Schedule
        </button>
      </div>
    </section>
  );
}
