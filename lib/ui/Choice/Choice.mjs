import { jsxs as y, jsx as s } from "react/jsx-runtime";
import { memo as b, useState as v, useRef as x, useEffect as R } from "react";
import { useMergeRefs as P } from "@floating-ui/react";
import c from "classnames";
import t from "./Choice.module.scss.mjs";
function j({
  ref: h,
  ...i
}) {
  const {
    checked: r,
    defaultChecked: m = !1,
    type: o = "checkbox",
    view: u = "primary",
    disabled: a,
    onChange: p,
    style: l,
    classNames: e,
    indeterminate: k = !1,
    ...g
  } = i, [f, d] = v(r ?? m), C = x(null), _ = P([C, h ?? null]);
  R(() => {
    typeof r == "boolean" && r !== f && d(r);
  }, [r]);
  const w = (n) => {
    a || (typeof r != "boolean" && d(n.target.checked), p && p({
      target: {
        ...i,
        checked: n.target.checked
      },
      event: n.nativeEvent
    }));
  };
  return /* @__PURE__ */ y(
    "span",
    {
      className: c(t.wrapper, e == null ? void 0 : e.wrapper, {
        [t.wrapper__Radio]: o === "radio",
        [t.wrapper__Indeterminate]: o !== "radio" && k,
        [t.wrapper__Ghost]: u === "ghost"
      }),
      style: l,
      children: [
        /* @__PURE__ */ s(
          "input",
          {
            ...g,
            type: o,
            checked: f,
            ref: _,
            className: c(t.input, e == null ? void 0 : e.input),
            onChange: w,
            disabled: a
          }
        ),
        /* @__PURE__ */ s("span", { className: c(t.inner, e == null ? void 0 : e.inner) })
      ]
    }
  );
}
const E = j, $ = b(E);
export {
  $ as default
};
