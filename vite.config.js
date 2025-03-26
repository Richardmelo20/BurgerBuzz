import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/BurgerBuzz/',
  // css: ['./assets/scss/_global.scss'],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/scss/main.scss"; 
        @import "@/assets/scss/global.scss";
        `
      }
    }
  }
});
