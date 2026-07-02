import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../src/data/catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://nammaprinthouse.com';

const generateSitemap = () => {
  const staticRoutes = [
    '/',
    '/search',
    '/cart',
    '/info/shipping',
    '/info/care',
    '/info/returns',
    '/info/faqs',
    '/info/terms',
    '/info/privacy',
    '/info/size-guide',
    '/info/about',
    '/info/contact',
    '/track-order',
    '/bulk-orders'
  ];

  const categories = [...new Set(products.map(p => p.category))];
  const categoryRoutes = categories.map(cat => `/category/${cat}`);
  const productRoutes = products.map(p => `/product/${p.id}`);

  const allRoutes = [...staticRoutes, '/category/all', ...categoryRoutes, ...productRoutes];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/product/') ? '0.8' : '0.6'}</priority>
  </url>`).join('')}
</urlset>`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapContent, 'utf8');
  console.log(`[SEO] Sitemap successfully generated at ${outputPath}`);
};

generateSitemap();
