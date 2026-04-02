import { jsxs as x, jsx as g } from "react/jsx-runtime";
import { memo as C, useRef as b, useState as z, useEffect as h, useCallback as y } from "react";
import R from "rc-util/lib/omit";
import { useMergeRefs as V } from "@floating-ui/react";
import t from "./Input.module.scss.mjs";
import s from "classnames";
function M({ ref: a, ...e }) {
  const {
    size: r = "M",
    alert: m = !1,
    borderless: d = !1,
    onChange: l,
    disabled: n = !1,
    type: p = "text",
    inputMode: c = "text",
    suffix: u
  } = e, _ = b(null), S = V([_, a ?? null]), [f, i] = z(
    typeof e.value > "u" ? e.defaultValue : e.value
  );
  h(() => {
    (e.value !== void 0 || f !== e.value) && i(e.value);
  }, [e.value]);
  const v = y(
    (o) => {
      i(o.target.value), l && l(o);
    },
    [l]
  ), w = R(e, ["defaultValue", "size", "borderless", "alert"]);
  return /* @__PURE__ */ x(
    "div",
    {
      className: s(t.wrapper, {
        [t.wrapper__SizeL]: r === "L",
        [t.wrapper__SizeS]: r === "S",
        [t.wrapper__SizeXS]: r === "XS",
        [t.wrapper__Alert]: m,
        [t.wrapper__Clear]: d,
        [t.wrapper__Disabled]: n,
        [t.wrapper__Suffix]: !!u
      }),
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            autoComplete: "off",
            ...w,
            value: j(f),
            type: p,
            inputMode: c,
            ref: S,
            onChange: v,
            disabled: n,
            className: s(t.input)
          }
        ),
        u
      ]
    }
  );
}
function j(a) {
  return typeof a > "u" || a === null ? "" : String(a);
}
const D = C(M);
export {
  D as default,
  j as fixControlledValue
};
