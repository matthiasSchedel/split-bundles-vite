import { EventPayload } from "../shared/types";

console.log("Meta index.ts");

export class MetaPixel {
  private worker: Worker | null = null;
  private pixelId: string;
  private options: { debug?: boolean };
  private isReady: boolean = false;
  private queue: EventPayload[] = [];

  constructor(pixelId: string, options: { debug?: boolean } = {}) {
    this.pixelId = pixelId;
    this.options = options;
    this.initWorker();
  }

  private initWorker() {
    try {
      this.worker = new Worker("/dist/meta.js");

      this.worker.onmessage = (event) => {
        console.log("Meta Pixel Worker Message:", event.data);
        if (event.data.type === "READY") {
          this.isReady = true;
          // Process any queued events
          this.processQueue();
        }
      };

      this.worker.onerror = (error) => {
        console.error("Meta Pixel Worker Error:", error);
        // Fall back to direct pixel loading if worker fails
        this.worker = null;
      };
      console.log("Meta Pixel Worker initialized");

      // Send initial READY message to trigger the onmessage handler
    } catch (error) {
      console.error("Failed to initialize Meta Pixel Worker:", error);
      this.worker = null;
    }
  }

  private processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.track(event);
      }
    }
  }

  track(payload: EventPayload) {
    if (!this) {
      this.queue.push(payload);
      return;
    }

    if (this.worker) {
      this.worker.postMessage(payload);
    } else {
      // Import and use direct pixel tracking as fallback
      import("./metaEvents").then(({ processMetaEvent }) => {
        processMetaEvent(payload);
      });
    }
  }
}
