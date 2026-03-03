// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [{
    name: 'protect-landing',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0].replace(/\/$/, '') || '/';
        if (url === '/landing-page' || url === '/home' || url === '/home.html') {
          // Only let through if short-lived cookie from puzzle win exists
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