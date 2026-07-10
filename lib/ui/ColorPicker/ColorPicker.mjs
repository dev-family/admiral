import { jsx as n, jsxs as O } from "react/jsx-runtime";
import { memo as j, useRef as C, useState as d, useEffect as E, useCallback as p } from "react";
import { RgbaColorPicker as I, HexColorInput as L } from "react-colorful";
import o from "tinycolor2";
import { useMergeRefs as M } from "@floating-ui/react";
import N from "classnames";
/* empty css                  */
import { Tooltip as X } from "../Tooltip/Tooltip.mjs";
function z({
  initialOpen: t = !1,
  value: e,
  size: g = "M",
  disabled: b = !1,
  alert: x = !1,
  onChange: i,
  onChangeComplete: s,
  appendTo: k,
  ref: h
}) {
  const P = C(null), _ = M([h ?? null, P]), [R, T] = d(t), [l, m] = d(f(e)), [S, u] = d(o(e).isValid());
  E(() => {
    const r = e ? f(e) : f();
    (!o.equals(r, l) || !S) && (m(r), u(o(e).isValid()));
  }, [e]);
  const H = p(
    (r) => {
      m(r), u(o(r).isValid()), i && i(a(r));
    },
    [i]
  ), V = p(
    (r) => {
      s && s(a(r));
    },
    [s]
  ), q = p(
    (r) => {
      const c = f(r);
      m(c), u(o(c).isValid()), i && i(a(c)), s && s(a(c));
    },
    [i, s]
  ), y = l.a < 1 ? o(l).toHex8String() : o(l).toHexString();
  return /* @__PURE__ */ n(
    X,
    {
      placement: "bottom-start",
      invertTheme: !1,
      trigger: "click",
      open: R,
      onOpenChange: T,
      content: /* @__PURE__ */ O("div", { className: "colorPicker", children: [
        /* @__PURE__ */ n(
          I,
          {
            color: l,
            onChange: H,
            onChangeEnd: V
          }
        ),
        /* @__PURE__ */ n(
          L,
          {
            "aria-label": "hex",
            color: y,
            onChange: q,
            prefixed: !0,
            alpha: !0
          }
        )
      ] }),
      interactive: !0,
      disabled: b,
      mode: "custom",
      root: k,
      children: /* @__PURE__ */ n(
        "button",
        {
          ref: _,
          className: N("colorPickerToggle", {
            colorPickerToggle__SizeL: g === "L",
            colorPickerToggle__SizeS: g === "S",
            colorPickerToggle__SizeXS: g === "XS",
            colorPickerToggle__Alert: x,
            colorPickerToggle__Unset: !S
          }),
          type: "button",
          children: /* @__PURE__ */ n("span", { style: { backgroundColor: o(l).toRgbString() } })
        }
      )
    }
  );
}
const J = j(z);
function a(t) {
  return {
    hex: o(t).toHex(),
    hex8: o(t).toHex8(),
    rgb: o(t).toRgb(),
    rgbString: o(t).toRgbString(),
    hsl: o(t).toHsl(),
    hslString: o(t).toHslString()
  };
}
function f(t) {
  return o(t).toRgb();
}
export {
  J as default
};
