import fs from 'fs';
import path from 'path';
import { injectPrerenderIntoTemplate } from '../src/serverPrerender.js';
import { PAGES_SEO } from '../src/seoData.js';

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

console.log('Generating static pre-rendered HTML files for SEO crawlability...');

const routes = Object.keys(PAGES_SEO);

for (const route of routes) {
  const renderedHtml = injectPrerenderIntoTemplate(route, baseTemplate);

  if (route === '/') {
    fs.writeFileSync(templatePath, renderedHtml, 'utf-8');
    console.log(`✓ Prerendered: / -> dist/index.html`);
  } else {
    const routeDir = path.join(distDir, route.replace(/^\//, ''));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const targetFile = path.join(routeDir, 'index.html');
    fs.writeFileSync(targetFile, renderedHtml, 'utf-8');
    console.log(`✓ Prerendered: ${route} -> ${path.relative(distDir, targetFile)}`);
  }
}

console.log('Static prerender complete for all routes!');
