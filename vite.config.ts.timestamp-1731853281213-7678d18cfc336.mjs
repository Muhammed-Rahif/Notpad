// vite.config.ts
import { VitePWA } from "file:///C:/Users/pp/Desktop/React-Projects/Notpad/notpad/node_modules/vite-plugin-pwa/dist/index.js";
import { defineConfig } from "file:///C:/Users/pp/Desktop/React-Projects/Notpad/notpad/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///C:/Users/pp/Desktop/React-Projects/Notpad/notpad/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import path from "path";
import fs from "fs";
function baseUrl() {
  const baseArgIndex = process.argv.indexOf("--base");
  if (baseArgIndex !== -1 && baseArgIndex + 1 < process.argv.length) {
    return process.argv[baseArgIndex + 1];
  }
  return null;
}
(function() {
  const appJson = path.resolve("./src/app.json");
  const content = {
    version: process.env.npm_package_version
  };
  fs.writeFileSync(appJson, JSON.stringify(content, null, 2) + "\n");
})();
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@/src": path.resolve("./src"),
      "@": path.resolve("./src/lib")
    }
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  base: "/Notpad/",
  build: {
    outDir: "www",
    rollupOptions: {
      output: {
        // https://github.com/vitejs/vite/discussions/9440#discussioncomment-5913798
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
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
      registerType: "autoUpdate",
      injectRegister: "auto",
      base: baseUrl() ?? "/Notpad/",
      pwaAssets: {
        disabled: false,
        config: true
      },
      manifest: {
        name: "Notpad",
        short_name: "Notpad",
        description: "Windows like notpad for cross platform.",
        theme_color: "#888888",
        background_color: "#d4d4d4",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png"
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png"
          }
        ],
        orientation: "any",
        display: "standalone",
        dir: "ltr",
        lang: "en-IN",
        start_url: "/Notpad",
        scope: "."
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwcFxcXFxEZXNrdG9wXFxcXFJlYWN0LVByb2plY3RzXFxcXE5vdHBhZFxcXFxub3RwYWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBwXFxcXERlc2t0b3BcXFxcUmVhY3QtUHJvamVjdHNcXFxcTm90cGFkXFxcXG5vdHBhZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcHAvRGVza3RvcC9SZWFjdC1Qcm9qZWN0cy9Ob3RwYWQvbm90cGFkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5mdW5jdGlvbiBiYXNlVXJsKCkge1xuICBjb25zdCBiYXNlQXJnSW5kZXggPSBwcm9jZXNzLmFyZ3YuaW5kZXhPZignLS1iYXNlJyk7XG4gIGlmIChiYXNlQXJnSW5kZXggIT09IC0xICYmIGJhc2VBcmdJbmRleCArIDEgPCBwcm9jZXNzLmFyZ3YubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuYXJndltiYXNlQXJnSW5kZXggKyAxXTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgLy8gY3JlYXRlIGEgYXBwLmpzb24gd2l0aCB2ZXJzaW9uIHVzaW5nIHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb25cbiAgY29uc3QgYXBwSnNvbiA9IHBhdGgucmVzb2x2ZSgnLi9zcmMvYXBwLmpzb24nKTtcbiAgY29uc3QgY29udGVudCA9IHtcbiAgICB2ZXJzaW9uOiBwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uXG4gIH07XG4gIGZzLndyaXRlRmlsZVN5bmMoYXBwSnNvbiwgSlNPTi5zdHJpbmdpZnkoY29udGVudCwgbnVsbCwgMikgKyAnXFxuJyk7XG59KSgpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQC9zcmMnOiBwYXRoLnJlc29sdmUoJy4vc3JjJyksXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMvbGliJylcbiAgICB9XG4gIH0sXG4gIGRlZmluZToge1xuICAgIEFQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKVxuICB9LFxuICBiYXNlOiAnL05vdHBhZC8nLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ3d3dycsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9kaXNjdXNzaW9ucy85NDQwI2Rpc2N1c3Npb25jb21tZW50LTU5MTM3OThcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IHRydWVcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHN2ZWx0ZSgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxuICAgICAgYmFzZTogYmFzZVVybCgpID8/ICcvTm90cGFkLycsXG4gICAgICBwd2FBc3NldHM6IHtcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBjb25maWc6IHRydWVcbiAgICAgIH0sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnTm90cGFkJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ05vdHBhZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnV2luZG93cyBsaWtlIG5vdHBhZCBmb3IgY3Jvc3MgcGxhdGZvcm0uJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjODg4ODg4JyxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNkNGQ0ZDQnLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZScsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgc3JjOiAnaWNvbjUxMl9tYXNrYWJsZS5wbmcnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHNyYzogJ2ljb241MTJfcm91bmRlZC5wbmcnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG9yaWVudGF0aW9uOiAnYW55JyxcbiAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICBkaXI6ICdsdHInLFxuICAgICAgICBsYW5nOiAnZW4tSU4nLFxuICAgICAgICBzdGFydF91cmw6ICcvTm90cGFkJyxcbiAgICAgICAgc2NvcGU6ICcuJ1xuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHN2ZyxwbmcsaWNvfSddLFxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG5hdmlnYXRlRmFsbGJhY2s6ICdpbmRleC5odG1sJyxcbiAgICAgICAgc3VwcHJlc3NXYXJuaW5nczogdHJ1ZSxcbiAgICAgICAgdHlwZTogJ21vZHVsZSdcbiAgICAgIH1cbiAgICB9KVxuICBdXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1YsU0FBUyxlQUFlO0FBQ3hXLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsY0FBYztBQUN2QixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBRWYsU0FBUyxVQUFVO0FBQ2pCLFFBQU0sZUFBZSxRQUFRLEtBQUssUUFBUSxRQUFRO0FBQ2xELE1BQUksaUJBQWlCLE1BQU0sZUFBZSxJQUFJLFFBQVEsS0FBSyxRQUFRO0FBQ2pFLFdBQU8sUUFBUSxLQUFLLGVBQWUsQ0FBQztBQUFBLEVBQ3RDO0FBQ0EsU0FBTztBQUNUO0FBQUEsQ0FFQyxXQUFZO0FBRVgsUUFBTSxVQUFVLEtBQUssUUFBUSxnQkFBZ0I7QUFDN0MsUUFBTSxVQUFVO0FBQUEsSUFDZCxTQUFTLFFBQVEsSUFBSTtBQUFBLEVBQ3ZCO0FBQ0EsS0FBRyxjQUFjLFNBQVMsS0FBSyxVQUFVLFNBQVMsTUFBTSxDQUFDLElBQUksSUFBSTtBQUNuRSxHQUFHO0FBR0gsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsU0FBUyxLQUFLLFFBQVEsT0FBTztBQUFBLE1BQzdCLEtBQUssS0FBSyxRQUFRLFdBQVc7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGFBQWEsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFBQSxFQUM3RDtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBO0FBQUEsUUFFTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsbUJBQU8sR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQUEsVUFDeEU7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsTUFBTSxRQUFRLEtBQUs7QUFBQSxNQUNuQixXQUFXO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLFNBQVM7QUFBQSxZQUNULE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsU0FBUztBQUFBLFlBQ1QsT0FBTztBQUFBLFlBQ1AsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhO0FBQUEsUUFDYixTQUFTO0FBQUEsUUFDVCxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLGdDQUFnQztBQUFBLFFBQy9DLHVCQUF1QjtBQUFBLFFBQ3ZCLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1Qsa0JBQWtCO0FBQUEsUUFDbEIsa0JBQWtCO0FBQUEsUUFDbEIsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
