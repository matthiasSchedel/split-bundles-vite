# Optimized Pixel Tracker

This project demonstrates how to build separate optimized bundles for different tracking pixels (Meta and TikTok) that share common code but only include the dependencies they actually use.

## Key Features

- Separate bundles for Meta and TikTok pixels
- Common base tracking logic shared between both
- Specialized functionality (hashing) only included in the Meta bundle
- Tree-shaking to minimize bundle sizes
- IIFE output format that doesn't require `type="module"` when loading
- Development server with hot reloading
- Bundle analysis and debugging tools

## Project Structure

```
pixel-tracker/
├── src/
│   ├── shared/        # Shared code between bundles
│   │   ├── base.ts    # Base tracker logic
│   │   ├── hash.ts    # Hashing functions (only used by Meta)
│   │   └── types.ts   # Common types
│   ├── meta/          # Meta Pixel specific code
│   │   ├── index.ts
│   │   └── metaEvents.ts
│   └── tiktok/        # TikTok Pixel specific code
│       ├── index.ts
│       └── tiktokEvents.ts
└── dist/
    ├── meta.js        # Built Meta pixel bundle
    └── tiktok.js      # Built TikTok pixel bundle
```

## How It Works

1. **Shared Base Logic**: Both trackers extend the `BaseTracker` class, which provides common functionality.
2. **Specific Features**: The Meta pixel includes hashing functions that are not needed by TikTok.
3. **Tree-Shaking**: The build process ensures only required modules are included in each bundle.
4. **IIFE Format**: Outputs non-module JavaScript that can be loaded with standard `<script>` tags.

## Development Scripts

- **Build Production Bundles**:

  ```bash
  npm run build
  ```

- **Development Mode**:

  ```bash
  npm run dev
  ```

  Starts the development server on port 8081 with hot reloading

- **Debug Mode**:

  ```bash
  npm run debug:dev
  ```

  Runs development server with additional debugging information

- **Bundle Analysis**:

  ```bash
  npm run analyze
  ```

  Generates separate bundle analysis files for each bundle in the `dist` directory:

  - `dist/stats-source.html` - Source bundle analysis
  - `dist/stats-worker.html` - Worker bundle analysis
  - `dist/stats-meta.html` - Meta pixel bundle analysis
  - `dist/stats-tiktok.html` - TikTok pixel bundle analysis

  The analysis includes:

  - Interactive treemap visualization
  - Gzip and Brotli size information
  - Module relationships and dependencies
  - All bundle analysis files will automatically open in your default browser
  - Analysis files are preserved between builds for comparison

- **Profile Mode**:

  ```bash
  npm run debug:profile
  ```

  Runs development server with CPU profiling enabled

- **Inspect Mode**:
  ```bash
  npm run debug:inspect
  ```
  Runs development server with Vite Inspector for debugging

## Configuration

### Vite Configuration

The project uses Vite with the following key configurations:

- Tree-shakeable plugin for optimized dead code elimination
- Source maps enabled for debugging
- Development server on port 8081
- Bundle visualization (when using analyze mode)
- Vite Inspector for debugging (in debug mode)

### VS Code Integration

The project includes VS Code tasks for:

- Running debug development server
- Running Vite with inspect plugin
- Running Vite with CPU profiling

These tasks can be accessed through VS Code's command palette or tasks menu.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. For debugging and analysis:
   - Use `npm run debug:dev` for debug mode
   - Use `npm run analyze` for bundle analysis
   - Use `npm run debug:inspect` for Vite Inspector
