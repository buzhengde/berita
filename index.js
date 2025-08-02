import { create, Client } from 'venom-bot';
import Parser from 'rss-parser';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const parser = new Parser();
const feedUrl = process.env.RSS_URL;
const targetNumber = process.env.TARGET_WA;

let cache = {};
try {
  cache = JSON.parse(fs.readFileSync('./cache.json', 'utf8'));
} catch (err) {
  cache = { lastTitle: '' };
}

async function fetchAndSend(client) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const item = feed.items[0];

    if (item.title !== cache.lastTitle) {
      const message = `📰 *${item.title}*
${item.link}`;
      await client.sendText(targetNumber, message);

      cache.lastTitle = item.title;
      fs.writeFileSync('./cache.json', JSON.stringify(cache));
      console.log('✅ Kirim berita baru:', item.title);
    } else {
      console.log('⏩ Tidak ada berita baru.');
    }
  } catch (err) {
    console.error('❌ Error saat ambil/kirim RSS:', err.message);
  }
}

create().then((client) => {
  fetchAndSend(client);
  setInterval(() => fetchAndSend(client), 60 * 60 * 1000);
});