// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',

  // ---- Landing Page Protection (dev server only) ----
  // Intercepts direct URL access to /landing-page and /home.
  // Authorized requests (short-lived cookie '_lp_a=1' from puzzle win) pass through.
  // Unauthorized requests are let through to the HTML shells, which contain an inline
  // transition page: matching #FAF9F6 background + "No shortcuts" fade animation +
  // redirect to / only after the animation completes. This avoids any white/grey flash
  // because the redirect happens when the screen is already "empty".
  //
  // The middleware also handles /landing-page (no trailing slash) by rewriting to
  // /landing-page/ so Vite serves the correct index.html.
  plugins: [{
    name: 'protect-landing',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Rewrite /landing-page (no slash) to /landing-page/ so Vite finds index.html
        if (req.url === '/landing-page' || req.url.startsWith('/landing-page?')) {
          req.url = req.url.replace('/landing-page', '/landing-page/');
        }
        next();
      });
    },
  }],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing-page/index.html'),
        home: resolve(__dirname, 'home.html')
      },
    },
  },
})
