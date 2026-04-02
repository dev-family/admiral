import { jsx as o } from "react/jsx-runtime";
import { memo as b, useState as G, useEffect as R, useCallback as N } from "react";
import _ from "classnames";
import i from "./Radio.mjs";
import $ from "./Radio.module.scss.mjs";
function x({
  ref: m,
  ...v
}) {
  const {
    options: l = [],
    defaultValue: u,
    onChange: r,
    className: h,
    style: p,
    disabled: t,
    value: a,
    onMouseEnter: y,
    onMouseLeave: g,
    onFocus: k,
    onBlur: C,
    ...s
  } = v, [d, c] = G(
    typeof a > "u" ? u : a
  );
  R(() => {
    (a !== void 0 || d !== a) && c(a);
  }, [a]);
  const n = N(
    (e) => {
      c(e.target.value), r == null || r(e);
    },
    [r]
  );
  let f;
  return l && l.length > 0 && (f = l.map((e) => typeof e == "string" || typeof e == "number" ? /* @__PURE__ */ o(
    i,
    {
      disabled: t,
      value: e,
      defaultChecked: u == e,
      checked: d === e,
      type: "radio",
      onChange: n,
      ...s,
      children: e
    },
    `radio-value-${e}`
  ) : /* @__PURE__ */ o(
    i,
    {
      disabled: t,
      value: e.value,
      defaultChecked: u == e.value,
      checked: d === e.value,
      type: "radio",
      onChange: n,
      ...s,
      children: e.label
    },
    `radio-value-${e.value}`
  ))), /* @__PURE__ */ o(
    "div",
    {
      className: _($.radio__Group, h),
      style: p,
      onMouseEnter: y,
      onMouseLeave: g,
      onFocus: k,
      onBlur: C,
      ref: m,
      children: f
    }
  );
}
const E = x, B = b(E);
export {
  B as default
};
