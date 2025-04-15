/// <reference lib="webworker" />

// Import and initialize the Meta bundle
importScripts("/dist/meta.js");

console.log("Worker initializing...");

// Get Meta Pixel ID from environment variable
const metaPixelId =
  (self as any).import?.meta?.env?.VITE_META_PIXEL_ID || "TEST_PIXEL_ID";
console.log("Initializing Meta Pixel with ID:", metaPixelId);

// Initialize Meta pixel
const metaPixel = new (self as any).pixel_meta.MetaPixel(metaPixelId, {
  debug: true,
});

// Forward all messages to the Meta bundle's handler
self.addEventListener("message", (event: MessageEvent) => {
  console.log("Source Worker received message:", event.data);
  metaPixel.track(event.data);
});

// Signal that the worker is ready
self.postMessage({ type: "READY" });
