import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

function baseUrl() {
  const baseArgIndex = process.argv.indexOf('--base');
  if (baseArgIndex !== -1 && baseArgIndex + 1 < process.argv.length) {
    return process.argv[baseArgIndex + 1];
  }
  return null;
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      '@': path.resolve('./src/lib'),
      '@assets': path.resolve('./src/assets')
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  base: '/Notpad/',
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
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      base: baseUrl() ?? '/Notpad/',
      pwaAssets: {
        disabled: false,
        config: true
      },
      manifest: {
        name: 'Notpad',
        short_name: 'Notpad',
        description: 'Windows like notpad for cross platform.',
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
        start_url: '/Notpad',
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
