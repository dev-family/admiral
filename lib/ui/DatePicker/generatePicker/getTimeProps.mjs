import { toArray as f } from "./interfaces.mjs";
function h(s) {
  const { format: e, picker: r, showHour: u, showMinute: n, showSecond: t, use12Hours: c } = s, o = f(e)[0], i = { ...s };
  return o && (!o.includes("s") && t === void 0 && (i.showSecond = !1), !o.includes("m") && n === void 0 && (i.showMinute = !1), !o.includes("H") && !o.includes("h") && u === void 0 && (i.showHour = !1), (o.includes("a") || o.includes("A")) && c === void 0 && (i.use12Hours = !0)), r === "time" ? i : {
    showTime: i
  };
}
export {
  h as getTimeProps
};
