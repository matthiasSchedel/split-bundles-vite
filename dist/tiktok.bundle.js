import { B as i, c as a } from "./baseEvents-D8kkeCkM.js";
class l extends i {
  constructor() {
    super(), console.log("TikTok Pixel Handler Initialized");
  }
  track(t, o) {
    const n = a(o), e = {
      eventName: t,
      payload: n
    };
    this.validateEvent(e) && (this.sendEvent(e), console.log("TikTok Pixel Event:", e));
  }
}
const s = new l();
window.tiktokPixel = s;
//# sourceMappingURL=tiktok.bundle.js.map
