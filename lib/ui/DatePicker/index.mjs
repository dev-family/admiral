import { jsx as r } from "react/jsx-runtime";
import c from "rc-picker/lib/generate/dateFns";
import k from "./generatePicker/generatePicker.mjs";
import m from "./generatePicker/generateRangePicker.mjs";
function a(e) {
  return e.replace(new RegExp("(?<![a-zA-Z])A(?![a-zA-Z])", "g"), "a");
}
const n = {
  ...c,
  locale: {
    ...c.locale,
    format(e, o, i) {
      return c.locale.format(e, o, a(i));
    },
    parse(e, o, i) {
      return c.locale.parse(
        e,
        o,
        i.map(a)
      );
    }
  }
}, p = k(n), g = m(n), t = p, u = (e) => /* @__PURE__ */ r(t, { ...e, picker: "time" }), A = (e) => /* @__PURE__ */ r(t, { ...e, picker: "month" }), d = (e) => /* @__PURE__ */ r(t, { ...e, picker: "week" }), h = (e) => /* @__PURE__ */ r(t, { ...e, picker: "quarter" }), x = (e) => /* @__PURE__ */ r(t, { ...e, picker: "year" });
export {
  p as DatePicker,
  A as MonthPicker,
  h as QuarterPicker,
  g as RangePicker,
  u as TimePicker,
  d as WeekPicker,
  x as YearPicker
};
