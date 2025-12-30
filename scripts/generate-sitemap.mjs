/**
 * Sitemap Generator for PoolZen
 * Generates XML sitemap with all pages for SEO
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://pool-zen.vercel.app';

// Service slugs from the database
const services = [
  { slug: 'pool-cleaning', name: 'Pool Cleaning', priority: 0.9 },
  { slug: 'pool-maintenance', name: 'Pool Maintenance', priority: 0.9 },
  { slug: 'chemical-balancing', name: 'Chemical Balancing', priority: 0.8 },
  { slug: 'equipment-repairs', name: 'Equipment Repairs', priority: 0.8 }
];

// Location slugs from the database
const locations = [
  { slug: 'sydney-north-shore', region: 'Sydney', priority: 0.8 },
  { slug: 'sydney-eastern-suburbs', region: 'Sydney', priority: 0.8 },
  { slug: 'sydney-inner-west', region: 'Sydney', priority: 0.8 },
  { slug: 'sydney-south', region: 'Sydney', priority: 0.8 },
  { slug: 'sydney-west', region: 'Sydney', priority: 0.8 },
  { slug: 'newcastle', region: 'Newcastle', priority: 0.7 },
  { slug: 'illawarra', region: 'Illawarra', priority: 0.7 }
];

// Suburb slugs
const suburbs = [
  // North Shore
  'mosman', 'neutral-bay', 'chatswood', 'lane-cove', 'willoughby', 'artarmon', 'cremorne',
  // Eastern Suburbs
  'bondi', 'double-bay', 'paddington', 'woollahra', 'rose-bay', 'vaucluse', 'coogee',
  // Inner West
  'leichhardt', 'balmain', 'newtown', 'glebe', 'marrickville', 'dulwich-hill', 'annandale',
  // South
  'cronulla', 'miranda', 'hurstville', 'kogarah', 'brighton-le-sands', 'sans-souci', 'caringbah',
  // West
  'parramatta', 'blacktown', 'penrith', 'castle-hill', 'baulkham-hills', 'ryde', 'homebush',
  // Newcastle
  'lake-macquarie', 'port-stephens', 'cessnock', 'maitland', 'raymond-terrace', 'wallsend',
  // Illawarra
  'wollongong', 'shellharbour', 'kiama', 'port-kembla', 'dapto', 'corrimal', 'thirroul'
];

// Static pages
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/progress', changefreq: 'weekly', priority: 0.5 }
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add location pages
  locations.forEach(location => {
    xml += `  <url>
    <loc>${BASE_URL}/${location.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${location.priority}</priority>
  </url>
`;
  });

  // Add suburb pages
  suburbs.forEach(suburb => {
    xml += `  <url>
    <loc>${BASE_URL}/${suburb}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  // Add service + location combination pages (most valuable for SEO)
  services.forEach(service => {
    locations.forEach(location => {
      xml += `  <url>
    <loc>${BASE_URL}/services/${service.slug}/${location.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${Math.min(service.priority, location.priority)}</priority>
  </url>
`;
    });
  });

  xml += '</urlset>';

  // Write sitemap to client/public folder
  const outputPath = path.join(__dirname, '../client/public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  
  console.log(`✅ Sitemap generated successfully at ${outputPath}`);
  console.log(`   - ${staticPages.length} static pages`);
  console.log(`   - ${locations.length} location pages`);
  console.log(`   - ${suburbs.length} suburb pages`);
  console.log(`   - ${services.length * locations.length} service-location pages`);
  console.log(`   - Total: ${staticPages.length + locations.length + suburbs.length + (services.length * locations.length)} URLs`);
}

// Run
generateSitemap();
