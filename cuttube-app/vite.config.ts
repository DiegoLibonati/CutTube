import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      proxy: {
        "/api/v1": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      host: true,
      strictPort: true,
      port: 3000,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
        "@tests": path.resolve(__dirname, "./tests"),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    plugins: [react()],
  };
});