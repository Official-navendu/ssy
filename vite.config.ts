import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "vendor-framer";
            }
            if (id.includes("swiper") || id.includes("embla")) {
              return "vendor-swiper";
            }
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor-react-core";
            }
            return "vendor-libs"; // Other standard packages (emailjs, lucide-react, etc.)
          }
        },
      },
    },
    chunkSizeWarningLimit: 900,
    minify: "esbuild",
    cssCodeSplit: true,
  },
});
