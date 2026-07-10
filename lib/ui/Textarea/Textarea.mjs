import { jsx as f } from "react/jsx-runtime";
import { memo as x, useState as m, useEffect as d, useRef as g, useCallback as C } from "react";
import b from "rc-util/es/omit";
import { useMergeRefs as y } from "@floating-ui/react";
import M from "react-textarea-autosize";
import R from "classnames";
import r from "./Textarea.module.scss.mjs";
import L from "../../utils/hooks/useThrottledCallback.mjs";
function T({ ref: a, ...e }) {
  const [c, _] = m(Math.random()), { size: t = "M", alert: v = !1, borderless: w = !1, onChange: n, disabled: o = !1 } = e, l = L(() => _(Math.random()), 300);
  d(() => (window.addEventListener("resize", l), () => {
    window.removeEventListener("resize", l);
  }), [l]);
  const p = g(null), h = y([p, a ?? null]), [s, i] = m(
    typeof e.value > "u" ? e.defaultValue : e.value
  );
  d(() => {
    (e.value !== void 0 || s !== e.value) && i(e.value);
  }, [e.value]);
  const z = C(
    (u) => {
      i(u.target.value), n && n(u);
    },
    [n]
  ), S = b(e, ["defaultValue", "size", "borderless", "alert"]);
  return /* @__PURE__ */ f(
    "div",
    {
      className: R(r.wrapper, {
        [r.wrapper__SizeL]: t === "L",
        [r.wrapper__SizeS]: t === "S",
        [r.wrapper__SizeXS]: t === "XS",
        [r.wrapper__Alert]: v,
        [r.wrapper__Clear]: w,
        [r.wrapper__Disabled]: o
      }),
      children: /* @__PURE__ */ f(
        M,
        {
          cacheMeasurements: !0,
          ...S,
          ref: h,
          value: V(s),
          onChange: z,
          disabled: o,
          className: r.textarea
        },
        c
      )
    }
  );
}
function V(a) {
  return typeof a > "u" || a === null ? "" : String(a);
}
const P = x(T);
export {
  P as default,
  V as fixControlledValue
};
