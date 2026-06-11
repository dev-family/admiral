import { jsxs as v, jsx as G, Fragment as J } from "react/jsx-runtime";
import { useState as K, useRef as L, cloneElement as Q } from "react";
import { createPortal as W } from "react-dom";
import { useFloating as X, autoUpdate as Y, offset as Z, flip as $, shift as ee, arrow as oe, useHover as te, safePolygon as ne, useClick as se, useFocus as re, useDismiss as ae, useRole as ie, useInteractions as le, useTransitionStyles as ce, useMergeRefs as fe, FloatingArrow as me } from "@floating-ui/react";
import pe from "classnames";
import { useTheme as ue } from "../../theme/ThemeContext.mjs";
import i from "./Tooltip.module.scss.mjs";
import { getPopupContainer as de } from "../../utils/helpers/getPopupContainer.mjs";
const Fe = ({
  content: h,
  children: l,
  placement: C = "top",
  offset: n = 10,
  trigger: s = "hover",
  interactive: x = !1,
  disabled: r = !1,
  hideOnClick: I,
  open: c,
  onOpenChange: w,
  arrow: f = !1,
  mode: F,
  invertTheme: k = !1,
  contentClassName: A,
  root: a
}) => {
  const [N, O] = K(!1), m = c !== void 0, R = m ? c : N, S = m ? w ?? (() => {
  }) : O, p = L(null), { themeClassNames: e } = ue(), T = Array.isArray(n) ? { mainAxis: n[1], crossAxis: n[0] } : n, { refs: u, floatingStyles: d, context: o } = X({
    open: R && !r,
    onOpenChange: S,
    placement: C,
    strategy: "fixed",
    middleware: [
      Z(T),
      $(),
      ee({ padding: 5 }),
      ...f ? [oe({ element: p })] : []
    ],
    whileElementsMounted: Y
  }), j = te(o, {
    enabled: s === "hover" && !r,
    handleClose: x ? ne() : void 0
  }), M = se(o, {
    enabled: s === "click" && !r
  }), z = re(o, {
    enabled: s === "hover" && !r
  }), E = ae(o), U = ie(o, { role: "tooltip" }), { getReferenceProps: _, getFloatingProps: b } = le([
    j,
    M,
    z,
    E,
    U
  ]), { isMounted: B, styles: y } = ce(o, {
    duration: 160,
    initial: { opacity: 0, transform: "scale(0.85)" }
  }), t = l.props, D = fe([u.setReference, t.ref]), H = _({
    ...t,
    ...I === !1 && s === "hover" ? {
      onClick: (q) => {
        var g;
        (g = t == null ? void 0 : t.onClick) == null || g.call(t, q);
      }
    } : {}
  }), P = () => typeof a == "function" ? a() || document.body : a || de(), V = /* @__PURE__ */ v(
    "div",
    {
      ref: u.setFloating,
      style: {
        ...d,
        ...y,
        transform: [d.transform, y.transform].filter(Boolean).join(" ") || void 0,
        zIndex: 9999
      },
      ...b(),
      className: pe(
        i.tooltip,
        e.color.primary,
        e.control,
        e.font,
        e.size,
        e.space,
        e.shadow,
        {
          [e.color.invert]: k,
          [i.tooltip__Custom]: F === "custom"
        },
        A
      ),
      children: [
        h,
        f && /* @__PURE__ */ G(me, { ref: p, context: o, className: i.arrow })
      ]
    }
  );
  return /* @__PURE__ */ v(J, { children: [
    Q(l, { ...H, ref: D }),
    B && W(V, P())
  ] });
};
export {
  Fe as Tooltip
};
