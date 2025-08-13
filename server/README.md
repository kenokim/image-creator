Image Creator Server (Express + TypeScript)

Run locally

1. Install deps
   npm i
2. Start dev server
   npm run dev

Env (optional)

- PORT: default 8787
- GOOGLE_API_KEY: if you later integrate Imagen4 here.

Routes

- GET /api/health
- GET /api/anchors
- POST /api/anchors/generate { prompt }
- POST /functions/v1/imagen4-generate { prompt, count }

The last route mirrors the Supabase Edge Function path used in the frontend so you can point VITE_SUPABASE_URL to this server base URL for local development.


