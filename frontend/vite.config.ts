import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3033
  },
  base: './',
  build: {
    outDir: './build'
  },
  resolve: {
    alias: [{ find: '@app', replacement: path.resolve(__dirname, 'src') }]
  }
});
