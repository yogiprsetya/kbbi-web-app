import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://your-domain.com'; // Ganti dengan domain Anda

async function getAvailableLetters() {
  const kbbiPath = path.join(process.cwd(), 'public', 'kbbi');
  const items = fs.readdirSync(kbbiPath);
  return items.filter(item => {
    const itemPath = path.join(kbbiPath, item);
    return fs.statSync(itemPath).isDirectory() && /^[a-z]$/.test(item);
  }).sort();
}

async function getWordsForLetter(letter) {
  const letterPath = path.join(process.cwd(), 'public', 'kbbi', letter);
  const items = fs.readdirSync(letterPath);
  return items
    .filter(item => item.endsWith('.json'))
    .map(item => item.replace('.json', ''))
    .sort();
}

function generateSitemap(urls) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

async function main() {
  console.log('Generating sitemap...');
  
  const urls = [
    `${BASE_URL}/`, // Home page
  ];

  try {
    // Add letter pages
    const letters = await getAvailableLetters();
    for (const letter of letters) {
      urls.push(`${BASE_URL}/${letter}`);
    }

    // Add word pages (limit to first 1000 words per letter to avoid huge sitemap)
    for (const letter of letters) {
      const words = await getWordsForLetter(letter);
      const limitedWords = words.slice(0, 1000); // Limit to 1000 words per letter
      
      for (const word of limitedWords) {
        urls.push(`${BASE_URL}/${letter}/${word}`);
      }
    }

    const sitemap = generateSitemap(urls);
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Sitemap generated with ${urls.length} URLs`);
    console.log(`Sitemap saved to: ${sitemapPath}`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

main(); 