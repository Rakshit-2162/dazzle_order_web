import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// for local dev, keep "/" as base
// for GitHub Pages, set "/dazzle_order_web/"
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProd ? "/dazzle_order_web/" : "/",
  server: {
    proxy: {
      "/api": {
        target: "https://dazzle-order.store/api_dazzle_order",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
