# Split Bundles Vite Demo

This project demonstrates how to create separate bundles for different pixel tracking implementations (Meta and TikTok) while sharing common code and optimizing bundle sizes.

## Project Structure

```
├── src/
│   ├── entries/
│   │   ├── meta.ts      # Meta pixel entry point
│   │   └── tiktok.ts    # TikTok pixel entry point
│   ├── shared/
│   │   └── baseEvents.ts # Shared event handling logic
│   └── utils/
│       └── hash.ts      # Hashing utility for Meta events
├── index.html           # Demo page
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Features

- Separate bundles for Meta and TikTok pixel implementations
- Shared base event handling logic
- Tree-shaking to ensure minimal bundle sizes
- TypeScript support
- No `type="module"` required for script loading

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Development mode:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Bundle Optimization

The project uses Vite's build configuration to:

- Create separate bundles for Meta and TikTok pixels
- Share common code through manual chunks
- Minimize bundle sizes through tree-shaking
- Output in IIFE format for direct browser usage

## Usage

Include the bundles in your HTML:

```html
<script src="/dist/meta.bundle.js"></script>
<script src="/dist/tiktok.bundle.js"></script>
```

Send events:

```javascript
// Meta Pixel event
window.metaPixel.track("purchase", {
  value: 99.99,
  currency: "USD",
});

// TikTok Pixel event
window.tiktokPixel.track("view_content", {
  contentId: "12345",
  contentType: "product",
});
```
