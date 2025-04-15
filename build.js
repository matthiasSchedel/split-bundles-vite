import { build, loadEnv, mergeConfig } from "vite";
import { glob } from "glob";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Define entry points
const entryPoints = [
  {
    name: "source",
    entry: "src/source/index.ts",
    format: "iife",
    fileName: "source.js",
    globalName: "pixelTracker",
    options: {
      extend: true,
      exports: "named",
    },
  },
  {
    name: "worker",
    entry: "src/source/worker.ts",
    format: "iife",
    fileName: "worker.js",
  },
  {
    name: "meta",
    entry: "src/meta/index.ts",
    format: "iife",
    fileName: "meta.js",
  },
  {
    name: "tiktok",
    entry: "src/tiktok/index.ts",
    format: "iife",
    fileName: "tiktok.js",
  },
];

async function loadViteConfig(mode) {
  try {
    const { default: userConfig } = await import("./vite.config.js");
    return typeof userConfig === "function" ? userConfig({ mode }) : userConfig;
  } catch (error) {
    console.error(`Error loading Vite config:`, error);
    process.exit(1);
  }
}

async function buildBundles(options) {
  const viteConfig = await loadViteConfig(options.mode);
  const env = loadEnv(options.mode, process.cwd(), "");
  const filteredEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith("VITE_"))
  );

  // Clean dist directory
  const distDir = resolve(__dirname, "dist");
  if (fs.existsSync(distDir) && !options.watch) {
    console.log("Cleaning dist directory...");
    fs.rmSync(distDir, { force: true, recursive: true });
  }

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Build each bundle
  for (const { name, entry, format, fileName } of entryPoints) {
    console.log(`Building ${name} bundle...`);

    const bundleConfig = mergeConfig(viteConfig, {
      build: {
        emptyOutDir: false,
        minify: false,
        lib: {
          entry: resolve(__dirname, entry),
          name: name === "source" ? "pixelTracker" : `pixel_${name}`,
          fileName: () => fileName || `${name}.js`,
          formats: [format || "iife"],
        },
        outDir: "dist",
        rollupOptions: {
          output: {
            format: format || "iife",
            inlineDynamicImports: true,
            manualChunks: undefined,
            extend: true,
            name: name === "source" ? "pixelTracker" : `pixel_${name}`,
            exports: "named",
            globals:
              name === "source"
                ? {
                    window: "window",
                  }
                : undefined,
          },
        },
        watch: options.watch
          ? {
              buildDelay: 500,
              clearScreen: false,
            }
          : null,
      },
      define: {
        "process.env": filteredEnv,
        "import.meta.env": JSON.stringify(filteredEnv),
      },
      sourcemap: true,
    });

    // Run the build with our customized config
    await build(bundleConfig);
  }

  if (options.watch) {
    console.log("Watch mode active. Waiting for changes...");
  }
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option("mode", {
      alias: "m",
      default: "production",
      description: "Environment mode",
      type: "string",
    })
    .option("watch", {
      alias: "w",
      default: false,
      description: "Enable watch mode",
      type: "boolean",
    })
    .option("analyze", {
      alias: "a",
      default: false,
      description: "Enable bundle analysis",
      type: "boolean",
    })
    .help().argv;

  if (argv.analyze) {
    process.env.ANALYZE = "true";
  }

  try {
    await buildBundles(argv);
    console.log("Build completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

main();
