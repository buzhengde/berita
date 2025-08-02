Cara Deploy ke Fly.io:

1. Rename file .env.sample jadi .env dan isi dengan data kamu.
2. Jalankan `flyctl launch` di folder ini untuk setup Fly.io pertama kali.
3. Jalankan `flyctl secrets set RSS_URL=https://... TARGET_WA=628xxx@c.us`
4. Jalankan `flyctl deploy` untuk upload dan jalanin bot.
5. Scan QR code di log Fly.io → bot aktif 24 jam nonstop.

Log: `flyctl logs`
Stop: `flyctl apps destroy whatsapp-rss-bot`