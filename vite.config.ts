import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths(),
    VitePWA({
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          }
        ]
      },
      manifest: {
        id: 'app:kbbi-web',
        name: 'KBBI Web - Kamus Besar Bahasa Indonesia',
        description: 'Kamus besar bahasa Indonesia berbasis web',
        short_name: 'KBBI Web',
        start_url: '/',
        display: 'standalone',
        background_color: '#feffff',
        theme_color: '#1a5cfb',
        lang: 'id',
        scope: '/',
        orientation: 'natural',
        dir: 'ltr',
        screenshots: [
          { src: '/image/ss-home.png', sizes: '517x517', type: 'image/png' },
          { src: '/image/ss-letter.png', sizes: '517x517', type: 'image/png' },
          { src: '/image/ss-word.png', sizes: '517x517', type: 'image/png' },
        ],
        launch_handler: {
          client_mode: ['focus-existing', 'auto'],
        },
        categories: ['book', 'education'],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
