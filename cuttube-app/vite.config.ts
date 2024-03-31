import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
    proxy: {
      "/v1": {
        target: "http://cuttube-api:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
