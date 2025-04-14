import {
  BaseEventHandler,
  EventData,
  createEventPayload,
} from "../shared/baseEvents";

class TikTokPixelHandler extends BaseEventHandler {
  constructor() {
    super();
    console.log("TikTok Pixel Handler Initialized");
  }

  public track(eventName: string, data: Record<string, any>): void {
    const payload = createEventPayload(data);

    const eventData: EventData = {
      eventName,
      payload,
    };

    if (this.validateEvent(eventData)) {
      this.sendEvent(eventData);
      // Here you would typically call the actual TikTok Pixel API
      console.log("TikTok Pixel Event:", eventData);
    }
  }
}

// Create and expose the handler instance
const tiktokPixel = new TikTokPixelHandler();

// Expose to window for non-module usage
(window as any).tiktokPixel = tiktokPixel;
