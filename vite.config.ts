import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import fs from 'fs';

function baseUrl() {
  const baseArgIndex = process.argv.indexOf('--base');
  if (baseArgIndex !== -1 && baseArgIndex + 1 < process.argv.length) {
    return process.argv[baseArgIndex + 1];
  }
  return null;
}

(function () {
  // create a app.json with version using process.env.npm_package_version
  const appJson = path.resolve('./src/app.json');
  const content = {
    version: process.env.npm_package_version
  };
  fs.writeFileSync(appJson, JSON.stringify(content, null, 2) + '\n');
})();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/src': path.resolve('./src'),
      '@': path.resolve('./src/lib')
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  base: '/Notpad/',
  build: {
    outDir: 'www',
    rollupOptions: {
      output: {
        // https://github.com/vitejs/vite/discussions/9440#discussioncomment-8358001
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const modulePath = id.split('node_modules/')[1];
            const topLevelFolder = modulePath.split('/')[0];
            if (topLevelFolder !== '.pnpm') {
              return topLevelFolder;
            }
            const scopedPackageName = modulePath.split('/')[1];
            const chunkName =
              scopedPackageName.split('@')[scopedPackageName.startsWith('@') ? 1 : 0];
            return chunkName;
          }
        }
      }
    }
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
