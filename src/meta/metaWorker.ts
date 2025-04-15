// Import Meta event processing
import { processMetaEvent } from "./metaEvents";
import { EventPayload } from "../shared/types";

// Define fbq function type
declare global {
  interface WorkerGlobalScope {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

try {
  // Load Meta Pixel script directly in worker context
  importScripts("https://connect.facebook.net/en_US/fbevents.js");

  if (typeof self.fbq === "function") {
    console.log("[Meta Pixel] Successfully initialized Meta Pixel");
  } else {
    console.error("[Meta Pixel] Script loaded but fbq is not available");
  }
} catch (error) {
  console.error("[Meta Pixel] Failed to load Meta Pixel script:", error);
}

// Listen for messages from the main thread
self.addEventListener("message", (event: MessageEvent) => {
  const payload = event.data as EventPayload;

  if (payload) {
    // Process the event using the existing Meta event processor
    processMetaEvent(payload);
  }
});

// Send ready message back to main thread
self.postMessage({ type: "READY" });
