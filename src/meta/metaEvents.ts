import { EventPayload } from "../shared/types";
import { hashUserData } from "../shared/hash";

// Map our event names to Meta Pixel event names
const EVENT_NAME_MAP: Record<string, string> = {
  page_view: "PageView",
  add_to_cart: "AddToCart",
  purchase: "Purchase",
  view_content: "ViewContent",
  lead: "Lead",
  complete_registration: "CompleteRegistration",
};

// Meta-specific event processing
export function processMetaEvent(payload: EventPayload): void {
  const { eventName, userData, eventData, customData } = payload;
  const metaEventName = EVENT_NAME_MAP[eventName] || eventName;

  // Check if we're in a worker context
  const isWorker = typeof self !== "undefined" && typeof Window === "undefined";

  if (!isWorker && (typeof window === "undefined" || !window.fbq)) {
    console.warn("Meta Pixel (fbq) not available");
    return;
  }

  // Meta-specific: hash user data for privacy
  const hashedUserData = userData ? hashUserData(userData) : undefined;

  // Build event parameters
  const eventParams: Record<string, any> = {
    ...eventData,
    ...customData,
  };

  // Add user data if present
  if (hashedUserData) {
    if (isWorker) {
      (self as any).fbq("init", hashedUserData);
    } else {
      window.fbq("init", hashedUserData);
    }
  }

  // Fire the event to Meta Pixel
  if (isWorker) {
    (self as any).fbq("track", metaEventName, eventParams);
  } else {
    window.fbq("track", metaEventName, eventParams);
  }
}

// Add global type for fbq
declare global {
  interface Window {
    fbq: any;
  }
}
