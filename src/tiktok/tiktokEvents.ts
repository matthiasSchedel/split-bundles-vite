import { EventPayload } from "../shared/types";

// Map our event names to TikTok Pixel event names
const EVENT_NAME_MAP: Record<string, string> = {
  page_view: "PageView",
  add_to_cart: "AddToCart",
  purchase: "CompletePayment",
  view_content: "ViewContent",
  lead: "SubmitForm",
  complete_registration: "CompleteRegistration",
};

// TikTok-specific event processing
export function processTikTokEvent(payload: EventPayload): void {
  if (typeof window === "undefined" || !window.ttq) {
    console.warn("TikTok Pixel (ttq) not available");
    return;
  }

  const { eventName, userData, eventData, customData } = payload;
  const tikTokEventName = EVENT_NAME_MAP[eventName] || eventName;

  // Build event parameters - no hashing needed for TikTok
  const eventParams: Record<string, any> = {
    ...eventData,
    ...customData,
  };

  // Add user data if present (TikTok handles different than Meta)
  if (userData) {
    eventParams.user_data = userData;
  }
  console.log("processing tiktok event", tikTokEventName, eventParams);

  // Fire the event to TikTok Pixel
  window.ttq.track(tikTokEventName, eventParams);
}
// Add global type for ttq
declare global {
  interface Window {
    ttq: any;
  }
}
