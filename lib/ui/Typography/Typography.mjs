import { jsx as n } from "react/jsx-runtime";
import { memo as e } from "react";
import a from "classnames";
import i from "./Typography.module.scss.mjs";
function s({
  component: o = "article",
  className: r,
  children: t,
  ref: m,
  ...p
}) {
  return /* @__PURE__ */ n(o, { className: a(i.typography, r), ref: m, ...p, children: t });
}
const h = e(s);
export {
  h as default
};
