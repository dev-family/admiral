import { jsx as l } from "react/jsx-runtime";
import { useMemo as T, useState as X, useCallback as N, useRef as h, useEffect as j } from "react";
import { useForm as B } from "../FormContext.mjs";
import { Form as D } from "../Form.mjs";
import E from "slugify";
import { FiLock as M, FiUnlock as O } from "react-icons/fi";
import U from "classnames";
import i from "../Form.module.scss.mjs";
import { withFieldRules as q } from "../fieldRules.mjs";
import z from "../../ui/Input/Input.mjs";
const A = (d, t, c) => {
  var s, e;
  const r = d.split("[");
  if (r.length === 1) {
    if (c)
      return (s = t[r[0]]) == null ? void 0 : s[c];
    const n = t == null ? void 0 : t[r[0]];
    return typeof n == "string" ? n : "";
  }
  const g = r[0], I = r[1].replace("]", "");
  return ((e = t[g]) == null ? void 0 : e[I]) || "";
}, R = function({
  name: t,
  label: c,
  from: r,
  required: g,
  disabled: I,
  columnSpan: F,
  options: s,
  size: e,
  slugLang: n,
  onChange: p,
  ...w
}) {
  var V;
  const { values: S, errors: K, setValues: y } = B(), o = S[t], _ = (V = K[t]) == null ? void 0 : V[0], m = T(
    () => A(r, S, n),
    [S, r, n]
  ), [f, v] = X(I), a = N(
    (u) => {
      y((x) => ({ ...x, [t]: u.target.value })), p == null || p(u.target.value);
    },
    [t, p, y]
  ), k = N(
    (u) => E(u, { lower: !0, replacement: "-", ...s }),
    [s]
  ), b = h(void 0);
  return j(() => {
    const u = b.current;
    if (b.current = m, !(f || !(!o || o === k(String(u ?? ""))))) {
      if (m) {
        const L = k(String(m));
        L !== o && a({ target: { value: L } });
        return;
      }
      o && a({ target: { value: null } });
    }
  }, [m, f, o, a, k]), /* @__PURE__ */ l(D.Item, { label: c, required: g, error: _, columnSpan: F, children: /* @__PURE__ */ l(
    z,
    {
      ...w,
      readOnly: f,
      name: t,
      value: o,
      onChange: a,
      alert: !!_,
      size: e,
      className: U(i.slugInput, {
        [i.slugInput__sizeL]: e === "L",
        [i.slugInput__sizeS]: e === "S",
        [i.slugInput__sizeXS]: e === "XS"
      }),
      suffix: /* @__PURE__ */ l("button", { type: "button", className: i.slugInput_Icon, children: f ? /* @__PURE__ */ l(M, { onClick: () => v(!1) }) : /* @__PURE__ */ l(O, { onClick: () => v(!0) }) })
    }
  ) });
};
R.inputName = "SlugInput";
const tt = q(R, { supportsDisabled: !1 });
export {
  tt as SlugInput
};
