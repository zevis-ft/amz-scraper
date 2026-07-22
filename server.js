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

## Why local, not hosted

This is built to run **on your own machine**, not deployed to a cloud host.
Amazon's anti-bot systems are far more suspicious of datacenter IPs (which is
what free hosts like Render/Railway run on) than an ordinary home connection.
It also currently keeps scan progress in memory only — no database — so a host
that spins the app down between requests would silently lose an in-progress scan.

If you do want to deploy it later, fix those two things first:
1. Swap the in-memory job `Map` in `server.js` for something that survives a
   restart (SQLite is the simplest fit).
2. Expect more CAPTCHAs/soft-blocks from a datacenter IP — a residential proxy
   would help if that becomes the bottleneck.

## How it works

1. Paste ASINs (comma, space, or newline separated) and pick a marketplace.
2. `POST /api/scan` kicks off a background scan job on the server — each ASIN
   is fetched with a randomized delay between requests to stay polite.
3. The page polls `GET /api/scan/:jobId` every 1.5s for live progress, logs,
   and results.
4. `POST /api/scan/:jobId/stop` lets you cancel a run in progress.
5. When it's done, download everything as a CSV.

## Project structure

```
.
├── package.json
├── server.js
└── public/
    └── index.html
```
