import { EventPayload } from "../shared/types";

console.log("Source index.ts");

// Define fbq function type
type FbqFunction = {
  (...args: any[]): void;
  callMethod: ((...args: any[]) => void) | null;
  queue: any[][];
  loaded: boolean;
  version: string;
};

// Extend Window interface
declare global {
  interface Window {
    sendPixelEvent: (payload: EventPayload) => void;
    pixelTracker: SourceTracker;
  }
}

// Initialize Meta Pixel
(function (f: any, b: Document, e: string, v: string) {
  if (f.fbq) return;

  const n = function (...args: any[]) {
    (n as FbqFunction).callMethod
      ? (n as FbqFunction).callMethod!.apply(n, args)
      : (n as FbqFunction).queue.push(args);
  } as FbqFunction;

  // Set up fbq properties
  n.callMethod = null;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  f.fbq = n;
  f._fbq = n;

  // Load the script
  const script = b.createElement(e) as HTMLScriptElement;
  script.async = true;
  script.src = v;
  script.onload = () => {
    console.log("[Meta Pixel] Successfully loaded Meta Pixel script");
  };
  script.onerror = (error) => {
    console.error("[Meta Pixel] Failed to load Meta Pixel script:", error);
  };

  const firstScript = b.getElementsByTagName(e)[0];
  firstScript.parentNode?.insertBefore(script, firstScript);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js"
);

class SourceTracker {
  private worker!: Worker; // Using definite assignment assertion
  private isReady: boolean = false;
  private queue: EventPayload[] = [];

  constructor() {
    // Initialize the worker that will load the Meta bundle aa
    try {
      console.log("[Source] Initializing worker...");
      this.worker = new Worker("/dist/worker.js");
      console.log("[Source] Worker initialized successfully");

      // Listen for messages from the worker test
      this.worker.onmessage = (event) => {
        const data = event.data;
        console.log("[Source] Re1ceived message from worker:", data);

        if (data.type === "READY") {
          console.log("[Source] Meta bundle ready");
          this.isReady = true;
          this.processQueue();
        } else if (data.type === "ERROR") {
          console.error("[Source] Meta bundle error:", data.error);
        }
      };

      this.worker.onerror = (error) => {
        console.error("[Source] Worker error:", error);
      };
    } catch (error) {
      console.error("[Source] Failed to initialize worker:", error);
    }
  }

  private processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.sendEvent(event);
      }
    }
  }

  sendEvent(payload: EventPayload) {
    if (!this.isReady) {
      this.queue.push(payload);
      return;
    }

    this.worker.postMessage(payload);
  }
}

// Create the source tracker instance
const sourceTracker = new SourceTracker();

// Expose functionality to window test sa
window.pixelTracker = sourceTracker;
window.sendPixelEvent = (payload: EventPayload) => {
  sourceTracker.sendEvent(payload);
};

// Export for bundling
export { type EventPayload };
export { sourceTracker };
export default sourceTracker;
