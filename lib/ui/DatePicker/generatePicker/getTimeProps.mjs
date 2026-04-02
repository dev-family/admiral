import { toArray as c } from "./interfaces.mjs";
function l(i) {
  const { format: s, picker: t, showHour: n, showMinute: r, showSecond: u, use12Hours: f } = i, o = c(s)[0], e = { ...i };
  return o && typeof o == "string" && (!o.includes("s") && u === void 0 && (e.showSecond = !1), !o.includes("m") && r === void 0 && (e.showMinute = !1), !o.includes("H") && !o.includes("h") && n === void 0 && (e.showHour = !1), (o.includes("a") || o.includes("A")) && f === void 0 && (e.use12Hours = !0)), t === "time" ? e : (typeof o == "function" && delete e.format, {
    showTime: e
  });
}
export {
  l as getTimeProps
};
