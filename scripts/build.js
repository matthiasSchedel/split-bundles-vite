import { glob } from "glob";
import fs from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build, loadEnv, mergeConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const entryPoints = ["src/entries/meta.ts", "src/entries/tiktok.ts"];

async function loadViteConfig(configPath, mode) {
  try {
    // For TypeScript config files
    if (configPath.endsWith(".ts")) {
      configPath = configPath.replace(".ts", ".js");
    }
    const { default: userConfig } = await import(configPath);
    return typeof userConfig === "function" ? userConfig({ mode }) : userConfig;
  } catch (error) {
    console.error(`Error loading Vite config from ${configPath}:`, error);
    process.exit(1);
  }
}

async function buildBundles(
  options = { mode: "production", config: "../vite.config.js" }
) {
  const viteConfig = await loadViteConfig(options.config, options.mode);
  const env = loadEnv(options.mode, process.cwd(), "");

  // Clean dist directory
  const distDir = resolve(__dirname, "../dist");
  if (fs.existsSync(distDir)) {
    console.log("Cleaning dist directory...");
    fs.rmSync(distDir, { force: true, recursive: true });
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Build bundles
  for (const entry of entryPoints) {
    const bundleName = entry.split("/").pop().replace(".ts", "");
    console.log(`Building ${bundleName} bundle...`);

    const bundleConfig = mergeConfig(viteConfig, {
      build: {
        emptyOutDir: false,
        lib: {
          entry: resolve(__dirname, "..", entry),
          fileName: () => `${bundleName}.bundle.js`,
          formats: ["esm"],
          name: bundleName,
        },
        minify: true,
        outDir: "dist",
        rollupOptions: {
          external: [],
          output: {
            // format: "iife",
            inlineDynamicImports: false,
            manualChunks: undefined,
          },
          treeshake: {
            moduleSideEffects: "no-external",
            propertyReadSideEffects: true,
            tryCatchDeoptimization: false,
          },
        },
        sourcemap: true,
        target: "es2015",
      },
      configFile: false,
      define: {
        "process.env": JSON.stringify(env),
      },
    });

    await build(bundleConfig);
  }
}

// Run the build
buildBundles().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
