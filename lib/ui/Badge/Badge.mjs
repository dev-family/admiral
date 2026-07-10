import { jsxs as L, jsx as X } from "react/jsx-runtime";
import { useMemo as T, useRef as f } from "react";
import { useTransition as V, config as w } from "@react-spring/web";
import h from "classnames";
import z from "./ScrollNumber.mjs";
import { cloneElement as A } from "./utils.mjs";
import { useTheme as B } from "../../theme/ThemeContext.mjs";
import e from "./Badge.module.scss.mjs";
function O({
  children: i,
  status: r = "normal",
  count: n = null,
  overflowCount: p = 99,
  dot: v = !1,
  size: l = "M",
  view: c = "filled",
  className: D,
  showZero: _ = !1,
  ...E
}) {
  const { themeClassNames: g, themeName: M } = B(), m = n > p ? `${p}+` : n, d = m === "0" || m === 0, a = v && !d, o = a ? "" : m, s = T(() => (o == null || o === "" || d && !_) && !a, [o, d, _, a]), b = f(n);
  s || (b.current = n);
  const u = b.current, y = f(o);
  s || (y.current = o);
  const R = y.current, S = f(a);
  s || (S.current = a);
  const Y = !u || typeof u != "object" ? void 0 : A(u), j = h(
    e.badge,
    {
      [g.color.accent]: r !== "system" && c === "filled" && M === "light",
      [e.badge__SizeXS]: l === "XS",
      [e.badge__SizeS]: l === "S",
      [e.badge__SizeM]: l === "M",
      [e.badge__SizeL]: l === "L",
      [e.badge__ViewFilled]: c === "filled",
      [e.badge__ViewStroked]: c === "stroked",
      [e.badge__StatusNormal]: r === "normal",
      [e.badge__StatusSuccess]: r === "success",
      [e.badge__StatusError]: r === "error",
      [e.badge__StatusWarning]: r === "warning",
      [e.badge__StatusSystem]: r === "system",
      [e.badge__NotWrapper]: !i
    },
    D
  ), t = !i, x = V(!s, {
    initial: {
      opacity: 1,
      scale: 1,
      translateX: t ? 0 : "50%",
      translateY: t ? 0 : "-50%"
    },
    from: {
      opacity: 0,
      scale: 0,
      translateX: t ? 0 : "50%",
      translateY: t ? 0 : "-50%"
    },
    enter: {
      opacity: 1,
      scale: 1,
      translateX: t ? 0 : "50%",
      translateY: t ? 0 : "-50%"
    },
    leave: {
      opacity: 0,
      scale: 0,
      translateX: t ? 0 : "50%",
      translateY: t ? 0 : "-50%"
    },
    reverse: !s,
    config: { ...w.stiff, duration: 160 }
  });
  return /* @__PURE__ */ L("div", { ...E, className: j, children: [
    /* @__PURE__ */ X("div", { className: g.color.primary, children: i }),
    x((N, W) => {
      const C = S.current, k = h({
        [e.dot]: C,
        [e.count]: !C
      });
      return W && /* @__PURE__ */ X(
        z,
        {
          show: !s,
          className: k,
          count: R,
          style: N,
          children: Y
        },
        "scrollNumber"
      );
    })
  ] });
}
export {
  O as Badge
};
