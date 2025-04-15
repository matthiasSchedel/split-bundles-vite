import { defineConfig, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import treeShakeable from "rollup-plugin-tree-shakeable";
import Inspect from "vite-plugin-inspect";

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const filteredEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith("VITE_"))
  );

  const isAnalyze = process.env.ANALYZE === "true";
  const isDebug = process.env.DEBUG === "true";
  const bundleName = process.env.VITE_BUNDLE_NAME;

  // Only create visualizer plugin if we have a bundle name
  const visualizerPlugin =
    isAnalyze && bundleName
      ? visualizer({
          filename: `dist/stats-${bundleName}.html`,
          gzipSize: true,
          brotliSize: true,
          open: false, // We'll handle opening files in build.js
          template: "treemap", // Use treemap for better visualization
          projectRoot: process.cwd(),
        })
      : null;

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
      strictPort: true, // Force the specified port or fail
      open: true,
      host: true,
      watch: {
        // Watch the dist directory
        ignored: ["!**/dist/**"],
      },
      // Serve files from dist directory
      publicDir: "dist",
    },
    plugins: [treeShakeable(), visualizerPlugin, isDebug && Inspect()].filter(
      Boolean
    ),
    define: {
      "process.env": filteredEnv,
      "import.meta.env": JSON.stringify(filteredEnv),
    },
  };
});
