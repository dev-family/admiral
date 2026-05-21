import { jsx as w } from "react/jsx-runtime";
import { memo as M, useState as _, useEffect as v, useRef as b, useCallback as y } from "react";
import R from "rc-util/es/omit";
import { useMergeRefs as T } from "@floating-ui/react";
import L from "react-textarea-autosize";
import V from "classnames";
import a from "./Textarea.module.scss.mjs";
function D({ ref: r, ...e }) {
  const [h, i] = _(Math.random()), { size: n = "M", alert: p = !1, borderless: z = !1, onChange: l, disabled: s = !1 } = e;
  v(() => {
    let t = null, o = 0;
    const m = () => {
      const d = Date.now(), c = 300 - (d - o);
      c <= 0 ? (o = d, i(Math.random())) : t || (t = setTimeout(() => {
        o = Date.now(), t = null, i(Math.random());
      }, c));
    };
    return window.addEventListener("resize", m), () => {
      window.removeEventListener("resize", m), t && clearTimeout(t);
    };
  }, []);
  const S = b(null), g = T([S, r ?? null]), [u, f] = _(
    typeof e.value > "u" ? e.defaultValue : e.value
  );
  v(() => {
    (e.value !== void 0 || u !== e.value) && f(e.value);
  }, [e.value]);
  const x = y(
    (t) => {
      f(t.target.value), l && l(t);
    },
    [l]
  ), C = R(e, ["defaultValue", "size", "borderless", "alert"]);
  return /* @__PURE__ */ w(
    "div",
    {
      className: V(a.wrapper, {
        [a.wrapper__SizeL]: n === "L",
        [a.wrapper__SizeS]: n === "S",
        [a.wrapper__SizeXS]: n === "XS",
        [a.wrapper__Alert]: p,
        [a.wrapper__Clear]: z,
        [a.wrapper__Disabled]: s
      }),
      children: /* @__PURE__ */ w(
        L,
        {
          cacheMeasurements: !0,
          ...C,
          ref: g,
          value: E(u),
          onChange: x,
          disabled: s,
          className: a.textarea
        },
        h
      )
    }
  );
}
function E(r) {
  return typeof r > "u" || r === null ? "" : String(r);
}
const $ = M(D);
export {
  $ as default,
  E as fixControlledValue
};
