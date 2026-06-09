# CareSync AI

A patient-facing post-consultation web co-pilot. Turns doctor consultations into clear, personal care dashboards.

## Demo tech stack (all free)
- **Next.js 14** on **Vercel** (free tier)
- **Phosphor Icons** for expressive medical UI
- **Framer Motion** for scroll animations
- **Static JSON** for demo AI responses (no API key needed)
- **ICS file generation** (client-side, no server)

## Getting started locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub (see below)
2. Go to vercel.com → New Project → Import from GitHub
3. Select this repo, click Deploy
4. Done — Vercel auto-detects Next.js

## Pushing to GitHub

```bash
git init
git add .
git commit -m "feat: initial CareSync AI demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/caresync-ai.git
git push -u origin main
```

## Pages
- `/` — Landing page with demo trigger
- `/dashboard` — Full patient dashboard (medications, jargon buster, follow-ups)
- `/share/cs-demo-2026-06-08` — Caregiver read-only view

## Project structure
```
data/           ← Hardcoded demo data (transcript + AI response)
lib/            ← TypeScript types and utilities  
components/     ← Reusable UI components
pages/          ← Next.js pages
styles/         ← Global CSS (skeuomorphic design system)
```
