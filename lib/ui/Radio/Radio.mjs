import { jsx as i } from "react/jsx-runtime";
import { memo as m } from "react";
import a from "../Checkbox/Checkbox.mjs";
function e({
  children: o,
  ref: r,
  ...t
}) {
  return /* @__PURE__ */ i(a, { ref: r, type: "radio", ...t, children: o });
}
const n = e, c = m(n);
export {
  c as default
};
