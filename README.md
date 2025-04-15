# Optimized Pixel Tracker

This project demonstrates how to build separate optimized bundles for different tracking pixels (Meta and TikTok) that share common code but only include the dependencies they actually use.

## Key Features

- Separate bundles for Meta and TikTok pixels
- Common base tracking logic shared between both
- Specialized functionality (hashing) only included in the Meta bundle
- Tree-shaking to minimize bundle sizes
- IIFE output format that doesn't require `type="module"` when loading

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

## Build Process

The build process:

1. Uses Vite for modern build tooling
2. Configures separate entry points for each bundle
3. Outputs IIFE format bundles
4. Applies advanced tree-shaking
5. Visualizes bundle sizes (optional with `--analyze`)

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Build the bundles:

   ```
   npm run build
   ```

3. Analyze bundle sizes:

   ```

   ```
