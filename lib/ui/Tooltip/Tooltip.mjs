import { jsxs as h, jsx as J, Fragment as K } from "react/jsx-runtime";
import { useState as L, useRef as P, useCallback as Q, cloneElement as W } from "react";
import { createPortal as X } from "react-dom";
import { useFloating as Y, autoUpdate as Z, offset as $, flip as ee, shift as oe, arrow as te, useHover as ne, safePolygon as se, useClick as re, useFocus as ae, useDismiss as ie, useRole as le, useInteractions as ce, useTransitionStyles as fe, FloatingArrow as me } from "@floating-ui/react";
import ue from "classnames";
import { useTheme as pe } from "../../theme/ThemeContext.mjs";
import m from "./Tooltip.module.scss.mjs";
const Ie = ({
  content: C,
  children: r,
  placement: x = "top",
  offset: a = 10,
  trigger: i = "hover",
  interactive: I = !1,
  disabled: l = !1,
  hideOnClick: k,
  open: u,
  onOpenChange: w,
  arrow: p = !1,
  mode: F,
  invertTheme: R = !1,
  contentClassName: S,
  root: c
}) => {
  const [T, b] = L(!1), y = u !== void 0, j = y ? u : T, A = y ? w ?? (() => {
  }) : b, d = P(null), { themeClassNames: o } = pe(), N = Array.isArray(a) ? { mainAxis: a[1], crossAxis: a[0] } : a, { refs: f, floatingStyles: v, context: t } = Y({
    open: j && !l,
    onOpenChange: A,
    placement: x,
    strategy: "fixed",
    middleware: [
      $(N),
      ee(),
      oe({ padding: 5 }),
      ...p ? [te({ element: d })] : []
    ],
    whileElementsMounted: Z
  }), O = ne(t, {
    enabled: i === "hover" && !l,
    handleClose: I ? se() : void 0
  }), z = re(t, {
    enabled: i === "click" && !l
  }), E = ae(t, {
    enabled: i === "hover" && !l
  }), M = ie(t), U = le(t, { role: "tooltip" }), { getReferenceProps: _, getFloatingProps: q } = ce([
    O,
    z,
    E,
    M,
    U
  ]), { isMounted: B, styles: g } = fe(t, {
    duration: 160,
    initial: { opacity: 0, transform: "scale(0.85)" }
  }), D = Q(
    (s) => {
      f.setReference(s);
      const e = r.ref;
      typeof e == "function" ? e(s) : e && typeof e == "object" && (e.current = s);
    },
    [f.setReference, r]
  ), n = r.props, H = _({
    ...n,
    ...k === !1 && i === "hover" ? {
      onClick: (s) => {
        var e;
        (e = n == null ? void 0 : n.onClick) == null || e.call(n, s);
      }
    } : {}
  }), V = () => typeof c == "function" ? c() || document.body : c || document.querySelector("#root > .Theme") || document.body, G = /* @__PURE__ */ h(
    "div",
    {
      ref: f.setFloating,
      style: {
        ...v,
        ...g,
        transform: [v.transform, g.transform].filter(Boolean).join(" ") || void 0,
        zIndex: 9999
      },
      ...q(),
      className: ue(
        m.tooltip,
        o.color.primary,
        o.control,
        o.font,
        o.size,
        o.space,
        o.shadow,
        {
          [o.color.invert]: R,
          [m.tooltip__Custom]: F === "custom"
        },
        S
      ),
      children: [
        C,
        p && /* @__PURE__ */ J(me, { ref: d, context: t, className: m.arrow })
      ]
    }
  );
  return /* @__PURE__ */ h(K, { children: [
    W(r, { ...H, ref: D }),
    B && X(G, V())
  ] });
};
export {
  Ie as Tooltip
};
