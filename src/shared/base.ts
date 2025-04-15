import { EventPayload, TrackerOptions, EventCallback } from "./types";

// Base tracker class that will be shared between both implementations
export class BaseTracker {
  protected options: TrackerOptions;
  protected eventHandlers: Map<string, EventCallback[]> = new Map();

  constructor(options: TrackerOptions = {}) {
    this.options = {
      debug: false,
      disableCookies: false,
      ...options,
    };
  }

  /**
   * Process and standardize the event payload
   */
  protected processEvent(payload: EventPayload): EventPayload {
    // Clone to avoid mutating original
    const processedPayload = { ...payload };

    // Common processing logic for all trackers
    if (this.options.debug) {
      console.debug(
        `[Tracker] Processing event: ${payload.eventName}`,
        payload
      );
    }

    return processedPayload;
  }

  /**
   * Track an event
   */
  public track(payload: EventPayload): void {
    const processedPayload = this.processEvent(payload);

    // Fire event handlers
    const handlers = this.eventHandlers.get(payload.eventName) || [];
    handlers.forEach((handler) => handler(processedPayload));

    if (this.options.debug) {
      console.debug(`[Tracker] Tracked event: ${payload.eventName}`);
    }
  }

  /**
   * Add event handler
   */
  public on(eventName: string, callback: EventCallback): void {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }

    this.eventHandlers.get(eventName)!.push(callback);
  }
}
