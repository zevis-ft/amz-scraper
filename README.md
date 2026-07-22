# Amazon Buy Box Scanner

A small Node.js web app that scans a list of Amazon ASINs and reports who
currently holds the Buy Box on each one — with a "You Own It?" column if you
give it your own seller/brand name(s). Fetches each product page directly and
parses it server-side (title, price, brand, rating, BSR, category, bullets,
Buy Box seller, other offers), with a live dashboard UI to run and monitor scans
and export a CSV when done.

## Running it

Requires Node.js 18+.

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

## Deploying to Render (free, connects straight to GitHub)

1. Go to [render.com](https://render.com) → New → **Blueprint** → connect this GitHub repo. Render reads `render.yaml` automatically and configures everything.
2. Render gives you a public URL like `https://amazon-buybox-scanner.onrender.com`.
3. Push a new commit any time and Render redeploys automatically.

GitHub Pages alone cannot run this app — it's static hosting only and cannot execute `server.js`. Render (or Railway/Fly.io) is required for the app to actually work.
