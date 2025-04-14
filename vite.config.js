import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        meta: resolve(__dirname, "src/entries/meta.ts"),
        tiktok: resolve(__dirname, "src/entries/tiktok.ts"),
      },
      output: {
        entryFileNames: "[name].bundle.js",
        format: "esm",
        dir: resolve(__dirname, "dist"),
        manualChunks: {
          vendor: ["@/baseEvents"],
        },
      },
    },
  },
  server: {
    port: 8081,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
