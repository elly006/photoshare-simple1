# PhotoShare Prototype

A simple React prototype demonstrating:

- **Navigation**: Login → Forgot Password → Feed / Search / Activity / Profile → Settings
- **Conditional (if/then) actions**: login validation, forgot-password email validation,
  like/save toggles, follow toggle, and settings switches
- **Live data binding**: the Search screen filters posts as you type; like counts update live

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Login accepts any non-empty username and password — it's a prototype, not a real backend.

## Making it live on GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds
and publishes the app automatically every time you push to `main`.

To turn it on (one-time setup, after you've pushed this code to GitHub):

1. On GitHub, go to your repo's **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push any commit to `main` (or go to the **Actions** tab and re-run the workflow).
5. After the workflow finishes (green check), refresh the **Settings → Pages** page —
   your live URL will be shown there, usually `https://<your-username>.github.io/<repo-name>/`.

Every future push to `main` redeploys the site automatically.

## Structure

Everything lives in one file, `src/App.jsx`, so it's easy to read top to bottom:

```
src/
  App.jsx     # all screens, components, and state
  main.jsx    # Vite entry point
index.html
package.json
```
