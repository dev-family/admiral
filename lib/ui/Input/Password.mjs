import { jsx as e } from "react/jsx-runtime";
import { memo as m, useState as u, useCallback as c, useRef as d } from "react";
import { useMergeRefs as p } from "@floating-ui/react";
import b from "./Input.module.scss.mjs";
import { FiEye as g, FiEyeOff as y } from "react-icons/fi";
import x from "./Input.mjs";
function R({ ref: r, ...t }) {
  const [s, i] = u(!1), o = t.disabled ?? !1, n = c(() => {
    o || i((a) => !a);
  }, [o]), f = d(null), l = p([f, r ?? null]);
  return /* @__PURE__ */ e(
    x,
    {
      ref: l,
      ...t,
      type: s ? "text" : "password",
      suffix: /* @__PURE__ */ e("button", { type: "button", className: b.toggle, onClick: n, children: s ? /* @__PURE__ */ e(g, {}) : /* @__PURE__ */ e(y, {}) })
    }
  );
}
const P = m(R);
export {
  P as default
};
