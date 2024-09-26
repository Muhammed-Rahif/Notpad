import { VitePWA } from 'vite-plugin-pwa';
import { ConfigEnv, defineConfig, Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import fs from 'fs';

const authInfoFilePath = path.join(__dirname, './.tmp', 'auth_info.json');
const isNeutralino = process.env._?.includes('neu');

// https://github.com/neutralinojs/neutralinojs/issues/909#issuecomment-1493518600.
const neutralino = (): Plugin => {
  let config: ConfigEnv;

  return {
    name: 'neutralino',
    configResolved(resolvedConfig: ConfigEnv) {
      config = resolvedConfig;
    },
    async transformIndexHtml(html: string) {
      if (config.mode === 'development') {
        if (!fs.existsSync(authInfoFilePath)) return;

        const auth_info_file = fs.readFileSync(authInfoFilePath, {
          encoding: 'utf-8'
        });

        const auth_info = JSON.parse(auth_info_file);

        const port = auth_info.nlPort;
        return html.replace(
          '<script src="__neutralino_globals.js"></script>',
          `<script src="http://localhost:${port}/__neutralino_globals.js"></script>`
        );
      }
      return html;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      '@': path.resolve('./src/lib')
    }
  },
  base: isNeutralino ? '' : '/Notepad',
  build: {
    outDir: 'www'
  },
  server: {
    port: 5173,
    strictPort: true
  },
  define: {
    isNeutralino
  },
  plugins: [
    svelte(),
    neutralino(),
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
