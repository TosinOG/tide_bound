import { defineConfig } from 'vite';
export default defineConfig({
  server: { host: '0.0.0.0', allowedHosts: true, port: 3000 },
  build: { target: 'es2020', chunkSizeWarningLimit: 900 },
});
