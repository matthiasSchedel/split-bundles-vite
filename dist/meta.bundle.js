var d = Object.defineProperty, h = Object.defineProperties;
var v = Object.getOwnPropertyDescriptors;
var l = Object.getOwnPropertySymbols;
var P = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
var i = (a, t, e) => t in a ? d(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e, r = (a, t) => {
  for (var e in t || (t = {}))
    P.call(t, e) && i(a, e, t[e]);
  if (l)
    for (var e of l(t))
      g.call(t, e) && i(a, e, t[e]);
  return a;
}, c = (a, t) => h(a, v(t));
import { B as x, c as f } from "./baseEvents-D8kkeCkM.js";
const y = (a) => {
  const t = JSON.stringify(a);
  let e = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t.charCodeAt(n);
    e = (e << 5) - e + s, e = e & e;
  }
  return e.toString(16);
};
class E extends x {
  constructor() {
    super(), console.log("Meta Pixel Handler Initialized");
  }
  track(t, e) {
    const n = f(e), s = c(r({}, n), {
      hash: y(n)
    }), o = {
      eventName: t,
      payload: s
    };
    this.validateEvent(o) && (this.sendEvent(o), console.log("Meta Pixel Event:", o));
  }
}
const m = new E();
window.metaPixel = m;
//# sourceMappingURL=meta.bundle.js.map
