import { jsxs as N, jsx as t } from "react/jsx-runtime";
import { memo as R, useRef as S } from "react";
import { useMergeRefs as v } from "@floating-ui/react";
import e from "./Button.module.scss.mjs";
import c from "classnames";
import { Spin as L } from "../Spin/Spin.mjs";
function z({ ref: p, ...u }) {
  const {
    component: l = "button",
    className: h,
    size: r = "M",
    view: o = "primary",
    loading: n,
    disabled: m = !1,
    iconLeft: s,
    iconRight: i,
    children: a,
    ...y
  } = u, d = typeof n == "boolean", g = S(null), b = v([g, p ?? null]), w = !!s && !i && !a || !!i && !s && !a, f = /* @__PURE__ */ N("span", { className: e.content, children: [
    s && /* @__PURE__ */ t("span", { className: c(e.icon, e.icon__Left), children: s }),
    a,
    i && /* @__PURE__ */ t("span", { className: c(e.icon, e.icon__Right), children: i })
  ] });
  return /* @__PURE__ */ t(
    l,
    {
      ref: b,
      className: c(
        e.button,
        {
          [e.disabled]: n ? !1 : m,
          [e.loading]: d ? n : !1,
          [e.viewPrimary]: o === "primary",
          [e.viewSecondary]: o === "secondary",
          [e.viewGhost]: o === "ghost",
          [e.viewClear]: o === "clear",
          [e.sizeL]: r === "L",
          [e.sizeS]: r === "S",
          [e.sizeXS]: r === "XS",
          [e.onlyIcon]: w
        },
        h
      ),
      ...l === "button" && { disabled: m || !!n },
      ...y,
      children: d ? /* @__PURE__ */ t(L, { spinning: n, className: e.spinner, children: f }) : f
    }
  );
}
const M = R(z);
export {
  M as default
};
