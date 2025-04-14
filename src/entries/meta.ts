import {
  BaseEventHandler,
  EventData,
  createEventPayload,
} from "../shared/baseEvents";
import { hashData } from "../utils/hash";

class MetaPixelHandler extends BaseEventHandler {
  constructor() {
    super();
    console.log("Meta Pixel Handler Initialized");
  }

  public track(eventName: string, data: Record<string, any>): void {
    const payload = createEventPayload(data);
    const hashedPayload = {
      ...payload,
      hash: hashData(payload),
    };

    const eventData: EventData = {
      eventName,
      payload: hashedPayload,
    };

    if (this.validateEvent(eventData)) {
      this.sendEvent(eventData);
      // Here you would typically call the actual Meta Pixel API
      console.log("Meta Pixel Event:", eventData);
    }
  }
}

// Create and expose the handler instance
const metaPixel = new MetaPixelHandler();

// Expose to window for non-module usage
(window as any).metaPixel = metaPixel;
