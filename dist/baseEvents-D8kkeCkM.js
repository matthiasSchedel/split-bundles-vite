var o = Object.defineProperty;
var a = Object.getOwnPropertySymbols;
var r = Object.prototype.hasOwnProperty, v = Object.prototype.propertyIsEnumerable;
var s = (n, e, t) => e in n ? o(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, l = (n, e) => {
  for (var t in e || (e = {}))
    r.call(e, t) && s(n, t, e[t]);
  if (a)
    for (var t of a(e))
      v.call(e, t) && s(n, t, e[t]);
  return n;
};
class c {
  sendEvent(e) {
    console.log(
      `Base event handler sending event: ${e.eventName}`,
      e.payload
    );
  }
  validateEvent(e) {
    return !!e.eventName && !!e.payload;
  }
}
const i = (n) => l({
  timestamp: (/* @__PURE__ */ new Date()).toISOString()
}, n);
export {
  c as B,
  i as c
};
//# sourceMappingURL=baseEvents-D8kkeCkM.js.map
