/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export interface ArtistRecommendation {
  genre: string;
  region: string;
  description: string;
  why: string;
}

export async function getArtistRecommendation(prompt: string): Promise<ArtistRecommendation> {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: `You are an expert in African music ethnomusicology and a talent scout for Nam Radio Local. 
      The user will describe a mood, a sound they like, or a region. 
      You must recommend a specific African sub-genre or a type of artist they should explore on the platform.
      Focus on emerging sounds like Amapiano, Afro-soul, Highlife, Benga, Gqom, Gengetone, etc.
      Provide the response in JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          genre: { type: Type.STRING, description: "The recommended sub-genre (e.g. Amapiano)" },
          region: { type: Type.STRING, description: "The specific region or city this sound originates from" },
          description: { type: Type.STRING, description: "A brief, poetic description of the sound" },
          why: { type: Type.STRING, description: "Why this matches the user's request" }
        },
        required: ["genre", "region", "description", "why"]
      }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
}
