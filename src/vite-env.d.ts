/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/svelte" />

declare global {
  interface Window {
    APP_VERSION: string;
  }
}

export {};
