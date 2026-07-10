import { jsx as e, jsxs as s, Fragment as d } from "react/jsx-runtime";
import { Upload as l } from "./Upload.mjs";
import { FiInbox as n } from "react-icons/fi";
import m from "./Upload.module.scss.mjs";
import { enUS as g } from "./locales/enUS.mjs";
const x = (r) => /* @__PURE__ */ s(d, { children: [
  /* @__PURE__ */ e("div", { className: m.uploadStyleExample_Img, children: /* @__PURE__ */ e(n, {}) }),
  /* @__PURE__ */ e("p", { className: m.uploadStyleExample_Text, children: r == null ? void 0 : r.clickToUpload })
] });
function y({
  ref: r,
  style: t,
  height: o,
  locale: p = g,
  children: a,
  ...i
}) {
  return /* @__PURE__ */ e(
    l,
    {
      ref: r,
      children: a || x(p),
      ...i,
      type: "drag",
      style: { ...t, height: o }
    }
  );
}
y.displayName = "Dragger";
export {
  y as Dragger
};
