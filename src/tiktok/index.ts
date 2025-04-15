import { BaseTracker } from "../shared/base";
import { EventPayload, TrackerOptions } from "../shared/types";
import { processTikTokEvent } from "./tiktokEvents";

export class TikTokPixelTracker extends BaseTracker {
  private pixelId: string;

  constructor(pixelId: string, options: TrackerOptions = {}) {
    super(options);
    this.pixelId = pixelId;
    this.initTikTokPixel();
  }

  private initTikTokPixel(): void {
    if (typeof window === "undefined") return;

    // Initialize TikTok Pixel if not already loaded
    if (!window.ttq) {
      // Simple pixel initialization (in a real app you would include TikTok's full snippet)
      window.ttq = {
        track: function () {},
        page: function () {},
        identify: function () {},
        instance: this.pixelId,
      };

      // Initialize
      window.ttq.page();

      if (this.options.debug) {
        console.debug(`[TikTokPixel] Initialized with ID: ${this.pixelId}`);
      }
    }
  }

  public override track(payload: EventPayload): void {
    // First call the base tracker's track method to process the event
    super.track(payload);

    // Then send to TikTok Pixel
    processTikTokEvent(payload);
  }
}

// Initialize global tracker instance
const createTikTokPixelTracker = (
  pixelId: string,
  options?: TrackerOptions
) => {
  return new TikTokPixelTracker(pixelId, options);
};

// Export for global use when loaded as IIFE
// This will be available as window.pixel_tiktok.createTikTokPixelTracker
export default createTikTokPixelTracker;
