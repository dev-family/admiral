import { jsx as s } from "react/jsx-runtime";
import { memo as y, useRef as V, useState as a, useEffect as H, useCallback as u } from "react";
import { ChromePicker as q } from "react-color";
import e from "tinycolor2";
import { useMergeRefs as O } from "@floating-ui/react";
import L from "classnames";
/* empty css                  */
import { Tooltip as M } from "../Tooltip/Tooltip.mjs";
const N = {
  default: {
    body: {
      padding: "var(--space-m) var(--space-m) var(--space-s)"
    }
  }
};
function X({
  initialOpen: o = !1,
  value: t,
  size: i = "M",
  disabled: d = !1,
  alert: k = !1,
  onChange: l,
  onChangeComplete: n,
  appendTo: S,
  ref: h
}) {
  const P = V(null), _ = O([h ?? null, P]), [C, T] = a(o), [c, m] = a(g(t)), [f, p] = a(e(t).isValid());
  H(() => {
    const r = t ? g(t) : g();
    (!e.equals(r, c) || !f) && (m(r), p(e(t).isValid()));
  }, [t]);
  const R = u(
    (r) => {
      m(r.rgb), p(e(r.rgb).isValid()), l && l(b(r.rgb));
    },
    [l]
  ), x = u(
    (r) => {
      n && n(b(r.rgb));
    },
    [n]
  );
  return /* @__PURE__ */ s(
    M,
    {
      placement: "bottom-start",
      invertTheme: !1,
      trigger: "click",
      open: C,
      onOpenChange: T,
      content: /* @__PURE__ */ s(
        q,
        {
          styles: N,
          className: "colorPicker",
          color: c,
          onChange: R,
          onChangeComplete: x
        }
      ),
      interactive: !0,
      disabled: d,
      mode: "custom",
      root: S,
      children: /* @__PURE__ */ s(
        "button",
        {
          ref: _,
          className: L("colorPickerToggle", {
            colorPickerToggle__SizeL: i === "L",
            colorPickerToggle__SizeS: i === "S",
            colorPickerToggle__SizeXS: i === "XS",
            colorPickerToggle__Alert: k,
            colorPickerToggle__Unset: !f
          }),
          type: "button",
          children: /* @__PURE__ */ s("span", { style: { backgroundColor: e(c).toRgbString() } })
        }
      )
    }
  );
}
const w = y(X);
function b(o) {
  return {
    hex: e(o).toHex(),
    hex8: e(o).toHex8(),
    rgb: e(o).toRgb(),
    rgbString: e(o).toRgbString(),
    hsl: e(o).toHsl(),
    hslString: e(o).toHslString()
  };
}
function g(o) {
  return e(o).toRgb();
}
export {
  w as default
};
