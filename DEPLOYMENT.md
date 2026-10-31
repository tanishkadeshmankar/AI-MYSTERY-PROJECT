# Deployment

This project uses Vercel for the React frontend and Render for the Express API. The GitHub repository is already configured as `tanishkadeshmankar/AI-MYSTERY-PROJECT`.

## 1. Deploy the API to Render

1. Sign in to [Render](https://render.com/) and create a **Web Service** from the GitHub repository `AI-MYSTERY-PROJECT`.
2. Set **Root Directory** to `server`, **Build Command** to `npm ci`, and **Start Command** to `npm start`.
3. Add `NODE_ENV` with value `production`. Render supplies `PORT` automatically.
4. Deploy, then copy the service URL, for example `https://ai-mystery-room-api.onrender.com`.
5. Check that `<service-url>/api/health` returns JSON with `"ok": true`.

`GEMINI_API_KEY` and `MONGO_URI` are optional. Without a Gemini key, the app uses its built-in mystery generator. Without MongoDB, cases still work but are not stored in a database.

## 2. Deploy the frontend to Vercel

1. Sign in to [Vercel](https://vercel.com/) and import the same GitHub repository.
2. Set **Root Directory** to `client` and keep the Vite build settings: build command `npm run build`, output directory `dist`.
3. Before deploying, add the environment variable `VITE_API_URL` with the value `https://<your-render-service>.onrender.com/api` (replace the example with the Render URL from step 1).
4. Deploy and copy the Vercel production URL, such as `https://ai-mystery-room.vercel.app`.

The `client/vercel.json` rewrite supports direct navigation to routes such as `/investigate`.

## 3. Allow the frontend to call the API

1. In Render, open the API service's **Environment** settings.
2. Add `CLIENT_URL` with the exact Vercel production origin, for example `https://ai-mystery-room.vercel.app` (no path or trailing slash).
3. Save the setting and redeploy the API service.
4. Open the Vercel URL, generate a mystery, and verify that the investigation page loads. If the browser reports a network error, check the deployed frontend's `VITE_API_URL` and Render's `CLIENT_URL`; after changing `VITE_API_URL`, redeploy Vercel because Vite embeds it during the build.

For a custom domain, set `CLIENT_URL` to that exact origin. Multiple allowed origins can be comma-separated.
