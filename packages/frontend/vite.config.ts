import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';

export default defineConfig({
  plugins: [
    devServer({
      entry: 'src/index.tsx',
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      external: ['@hono/node-server'],
    },
  },
});