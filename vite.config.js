import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    open: true,
  },
  build: {
    target: 'esnext',
  },
});
