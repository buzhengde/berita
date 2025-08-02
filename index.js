import { create, Client } from 'venom-bot';
import Parser from 'rss-parser';

const parser = new Parser();
const feedUrl = ‘https://www.google.nl/alerts/feeds/16389820613107650445/12527708777886263019'; // Ubah ke RSS kamu jika perlu
const targetNumber = '6287777188870@c.us'; // No WA tujuan

async function fetchAndSend(client) {
  const feed = await parser.parseURL(feedUrl);
  const item = feed.items[0];
  const message = `?? *${item.title}*\n${item.link}`;
  await client.sendText(targetNumber, message);
}

create().then(client => {
  fetchAndSend(client);
  setInterval(() => fetchAndSend(client), 60 * 60 * 1000); // tiap 1 jam
});
