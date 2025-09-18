import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://dazzle-order.store/api_dazzle_order",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
