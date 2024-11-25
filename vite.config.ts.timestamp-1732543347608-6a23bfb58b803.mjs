// vite.config.ts
import { VitePWA } from 'file:///home/muhammed-rahif/Workspace/Tauri/Notpad/node_modules/.pnpm/vite-plugin-pwa@0.20.5_@vite-pwa+assets-generator@0.2.6_vite@5.4.11_@types+node@22.9.0_terser_bytasdasf4le6dogdwc7qpmgke/node_modules/vite-plugin-pwa/dist/index.js';
import { defineConfig } from 'file:///home/muhammed-rahif/Workspace/Tauri/Notpad/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.0_terser@5.36.0/node_modules/vite/dist/node/index.js';
import { svelte } from 'file:///home/muhammed-rahif/Workspace/Tauri/Notpad/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@4.0.1_svelte@5.2.7_vite@5.4.11_@types+node@22.9.0_terser@5.36.0_/node_modules/@sveltejs/vite-plugin-svelte/src/index.js';
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
  const appJson = path.resolve('./src/app.json');
  const content = {
    version: process.env.npm_package_version
  };
  fs.writeFileSync(appJson, JSON.stringify(content, null, 2) + '\n');
})();
var vite_config_default = defineConfig({
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
        // https://github.com/vitejs/vite/discussions/9440#discussioncomment-5913798
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9tdWhhbW1lZC1yYWhpZi9Xb3Jrc3BhY2UvVGF1cmkvTm90cGFkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9tdWhhbW1lZC1yYWhpZi9Xb3Jrc3BhY2UvVGF1cmkvTm90cGFkL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL211aGFtbWVkLXJhaGlmL1dvcmtzcGFjZS9UYXVyaS9Ob3RwYWQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmZ1bmN0aW9uIGJhc2VVcmwoKSB7XG4gIGNvbnN0IGJhc2VBcmdJbmRleCA9IHByb2Nlc3MuYXJndi5pbmRleE9mKCctLWJhc2UnKTtcbiAgaWYgKGJhc2VBcmdJbmRleCAhPT0gLTEgJiYgYmFzZUFyZ0luZGV4ICsgMSA8IHByb2Nlc3MuYXJndi5sZW5ndGgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5hcmd2W2Jhc2VBcmdJbmRleCArIDFdO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICAvLyBjcmVhdGUgYSBhcHAuanNvbiB3aXRoIHZlcnNpb24gdXNpbmcgcHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfdmVyc2lvblxuICBjb25zdCBhcHBKc29uID0gcGF0aC5yZXNvbHZlKCcuL3NyYy9hcHAuanNvbicpO1xuICBjb25zdCBjb250ZW50ID0ge1xuICAgIHZlcnNpb246IHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb25cbiAgfTtcbiAgZnMud3JpdGVGaWxlU3luYyhhcHBKc29uLCBKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAyKSArICdcXG4nKTtcbn0pKCk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAL3NyYyc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSxcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYy9saWInKVxuICAgIH1cbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgQVBQX1ZFUlNJT046IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb24pXG4gIH0sXG4gIGJhc2U6ICcvTm90cGFkLycsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnd3d3JyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzk0NDAjZGlzY3Vzc2lvbmNvbW1lbnQtNTkxMzc5OFxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZVxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgc3ZlbHRlKCksXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIGluamVjdFJlZ2lzdGVyOiAnYXV0bycsXG4gICAgICBiYXNlOiBiYXNlVXJsKCkgPz8gJy9Ob3RwYWQvJyxcbiAgICAgIHB3YUFzc2V0czoge1xuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIGNvbmZpZzogdHJ1ZVxuICAgICAgfSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdOb3RwYWQnLFxuICAgICAgICBzaG9ydF9uYW1lOiAnTm90cGFkJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdXaW5kb3dzIGxpa2Ugbm90cGFkIGZvciBjcm9zcyBwbGF0Zm9ybS4nLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyM4ODg4ODgnLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI2Q0ZDRkNCcsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICBzcmM6ICdpY29uNTEyX21hc2thYmxlLnBuZycsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcHVycG9zZTogJ2FueScsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgc3JjOiAnaWNvbjUxMl9yb3VuZGVkLnBuZycsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgb3JpZW50YXRpb246ICdhbnknLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIGRpcjogJ2x0cicsXG4gICAgICAgIGxhbmc6ICdlbi1JTicsXG4gICAgICAgIHN0YXJ0X3VybDogJy9Ob3RwYWQnLFxuICAgICAgICBzY29wZTogJy4nXG4gICAgICB9LFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsc3ZnLHBuZyxpY299J10sXG4gICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlXG4gICAgICB9LFxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFjazogJ2luZGV4Lmh0bWwnLFxuICAgICAgICBzdXBwcmVzc1dhcm5pbmdzOiB0cnVlLFxuICAgICAgICB0eXBlOiAnbW9kdWxlJ1xuICAgICAgfVxuICAgIH0pXG4gIF1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLGVBQWU7QUFDM1UsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFFBQVE7QUFFZixTQUFTLFVBQVU7QUFDakIsUUFBTSxlQUFlLFFBQVEsS0FBSyxRQUFRLFFBQVE7QUFDbEQsTUFBSSxpQkFBaUIsTUFBTSxlQUFlLElBQUksUUFBUSxLQUFLLFFBQVE7QUFDakUsV0FBTyxRQUFRLEtBQUssZUFBZSxDQUFDO0FBQUEsRUFDdEM7QUFDQSxTQUFPO0FBQ1Q7QUFBQSxDQUVDLFdBQVk7QUFFWCxRQUFNLFVBQVUsS0FBSyxRQUFRLGdCQUFnQjtBQUM3QyxRQUFNLFVBQVU7QUFBQSxJQUNkLFNBQVMsUUFBUSxJQUFJO0FBQUEsRUFDdkI7QUFDQSxLQUFHLGNBQWMsU0FBUyxLQUFLLFVBQVUsU0FBUyxNQUFNLENBQUMsSUFBSSxJQUFJO0FBQ25FLEdBQUc7QUFHSCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxTQUFTLEtBQUssUUFBUSxPQUFPO0FBQUEsTUFDN0IsS0FBSyxLQUFLLFFBQVEsV0FBVztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sYUFBYSxLQUFLLFVBQVUsUUFBUSxJQUFJLG1CQUFtQjtBQUFBLEVBQzdEO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUE7QUFBQSxRQUVOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUFHLFNBQVMsRUFBRSxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVM7QUFBQSxVQUN4RTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixNQUFNLFFBQVEsS0FBSztBQUFBLE1BQ25CLFdBQVc7QUFBQSxRQUNULFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsU0FBUztBQUFBLFlBQ1QsT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxTQUFTO0FBQUEsWUFDVCxPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsWUFDTCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxRQUNULEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsUUFDL0MsdUJBQXVCO0FBQUEsUUFDdkIsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixrQkFBa0I7QUFBQSxRQUNsQixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
