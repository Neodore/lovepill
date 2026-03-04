// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',

  // ---- Landing Page Protection (dev server only) ----
  // In dev, this middleware intercepts direct URL access to /landing-page and /home
  // and returns a 302 to /?ns BEFORE the browser renders anything. This makes the
  // transition seamless — the puzzle page's matching background (#FAF9F6) is already
  // set via <style> in index.html <head>, so there's no white/grey flash.
  //
  // The only exception: requests with the short-lived cookie '_lp_a=1' (set by
  // GridManager.js on puzzle win, expires in 10s). These are legitimate wins.
  //
  // In production (GitHub Pages), there's no server middleware, so the HTML shells
  // (landing-page/index.html, home.html) have a synchronous <script> in <head>
  // that does the same redirect client-side, with matching background colors on
  // both pages to minimize any flash.
  plugins: [{
    name: 'protect-landing',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0].replace(/\/$/, '') || '/';
        if (url === '/landing-page' || url === '/home' || url === '/home.html') {
          if (req.headers.cookie && req.headers.cookie.includes('_lp_a=1')) return next();
          res.writeHead(302, { Location: '/?ns' });
          return res.end();
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
