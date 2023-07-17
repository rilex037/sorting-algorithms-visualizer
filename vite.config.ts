import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  server: {
    hmr: {
      port: 4200,
    },
  },
  define: {
    'process.env': process.env,
  },
});
