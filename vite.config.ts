import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      '@': path.resolve('./src/lib')
    }
  },
  base: '/Notepad',
  build: {
    outDir: 'www'
  },
  server: {
    port: 5173,
    strictPort: true
  },
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true
      },

      manifest: {
        name: 'Notepad',
        short_name: 'Notepad',
        description: 'Windows like notepad for cross platform.',
        theme_color: '#888888',
        background_color: '#d4d4d4',
        icons: [
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'icon512_maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'icon512_rounded.png',
            type: 'image/png'
          }
        ],
        orientation: 'any',
        display: 'standalone',
        dir: 'ltr',
        lang: 'en-IN',
        start_url: '/Notepad',
        scope: '.'
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module'
      }
    })
  ]
});
