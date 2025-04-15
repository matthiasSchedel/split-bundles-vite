import { defineConfig, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import treeShakeable from "rollup-plugin-tree-shakeable";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const filteredEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith("VITE_"))
  );

  const isAnalyze = process.env.ANALYZE === "true";

  return {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      // Base build options - will be customized per bundle in build.js
      minify: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          exports: "named",
        },
        treeshake: {
          // Enhanced tree-shaking
          moduleSideEffects: "no-external",
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
    },
    server: {
      port: 8081,
      open: true,
      host: true,
      watch: {
        // Watch the dist directory
        ignored: ["!**/dist/**"],
      },
      // Serve files from dist directory
      publicDir: "dist",
    },
    plugins: [
      treeShakeable(),
      isAnalyze &&
        visualizer({
          filename: "dist/stats.html",
          gzipSize: true,
          brotliSize: true,
          open: true,
        }),
    ].filter(Boolean),
    define: {
      "process.env": filteredEnv,
      "import.meta.env": JSON.stringify(filteredEnv),
    },
  };
});
