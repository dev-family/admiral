import { jsx as c } from "react/jsx-runtime";
import { useMemo as T, useState as X, useCallback as N, useRef as j, useEffect as w } from "react";
import { useForm as E } from "../FormContext.mjs";
import { Form as M } from "../Form.mjs";
import O from "slugify";
import { FiLock as U, FiUnlock as h } from "react-icons/fi";
import q from "classnames";
import l from "../Form.module.scss.mjs";
import z from "../../ui/Input/Input.mjs";
const A = (F, t, i) => {
  var n, e;
  const r = F.split("[");
  if (r.length === 1) {
    if (i)
      return (n = t[r[0]]) == null ? void 0 : n[i];
    const s = t == null ? void 0 : t[r[0]];
    return typeof s == "string" ? s : "";
  }
  const g = r[0], I = r[1].replace("]", "");
  return ((e = t[g]) == null ? void 0 : e[I]) || "";
}, B = function({
  name: t,
  label: i,
  from: r,
  required: g,
  disabled: I,
  columnSpan: d,
  options: n,
  size: e,
  slugLang: s,
  onChange: m,
  ...K
}) {
  var b;
  const { values: k, errors: R, setValues: y } = E(), o = k[t], _ = (b = R[t]) == null ? void 0 : b[0], f = T(
    () => A(r, k, s),
    [k, r, s]
  ), [p, v] = X(I), a = N(
    (u) => {
      y((x) => ({ ...x, [t]: u.target.value })), m == null || m(u.target.value);
    },
    [t, m, y]
  ), S = N(
    (u) => O(u, { lower: !0, replacement: "-", ...n }),
    [n]
  ), V = j(void 0);
  return w(() => {
    const u = V.current;
    if (V.current = f, !(p || !(!o || o === S(String(u ?? ""))))) {
      if (f) {
        const L = S(String(f));
        L !== o && a({ target: { value: L } });
        return;
      }
      o && a({ target: { value: null } });
    }
  }, [f, p, o, a, S]), /* @__PURE__ */ c(M.Item, { label: i, required: g, error: _, columnSpan: d, children: /* @__PURE__ */ c(
    z,
    {
      ...K,
      readOnly: p,
      name: t,
      value: o,
      onChange: a,
      alert: !!_,
      size: e,
      className: q(l.slugInput, {
        [l.slugInput__sizeL]: e === "L",
        [l.slugInput__sizeS]: e === "S",
        [l.slugInput__sizeXS]: e === "XS"
      }),
      suffix: /* @__PURE__ */ c("button", { type: "button", className: l.slugInput_Icon, children: p ? /* @__PURE__ */ c(U, { onClick: () => v(!1) }) : /* @__PURE__ */ c(h, { onClick: () => v(!0) }) })
    }
  ) });
};
B.inputName = "SlugInput";
export {
  B as SlugInput
};
