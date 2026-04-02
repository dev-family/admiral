import { jsx as u } from "react/jsx-runtime";
import { useMemo as N, useState as V, useCallback as K, useEffect as X } from "react";
import { useForm as j } from "../FormContext.mjs";
import { Form as w } from "../Form.mjs";
import E from "slugify";
import { FiLock as M, FiUnlock as O } from "react-icons/fi";
import U from "classnames";
import l from "../Form.module.scss.mjs";
import h from "../../ui/Input/Input.mjs";
const q = (g, t, s) => {
  var o, e;
  const r = g.split("[");
  if (r.length === 1) {
    if (s)
      return (o = t[r[0]]) == null ? void 0 : o[s];
    const n = t == null ? void 0 : t[r[0]];
    return typeof n == "string" ? n : "";
  }
  const p = r[0], f = r[1].replace("]", "");
  return ((e = t[p]) == null ? void 0 : e[f]) || "";
}, z = function({
  name: t,
  label: s,
  from: r,
  required: p,
  disabled: f,
  columnSpan: k,
  options: o,
  size: e,
  slugLang: n,
  onChange: c,
  ...F
}) {
  var _;
  const { values: a, errors: b, setValues: L } = j(), v = a[t], y = (_ = b[t]) == null ? void 0 : _[0], I = N(() => q(r, a, n), [a]), [i, S] = V(f), m = K(
    (d) => {
      L((x) => ({ ...x, [t]: d.target.value })), c == null || c(d.target.value);
    },
    [t, c]
  );
  return X(() => {
    if (!i) {
      if (I) {
        m({
          target: {
            value: E(I, {
              lower: !0,
              replacement: "-",
              ...o
            })
          }
        });
        return;
      }
      m({
        target: {
          value: null
        }
      });
    }
  }, [I, i, m, o]), /* @__PURE__ */ u(w.Item, { label: s, required: p, error: y, columnSpan: k, children: /* @__PURE__ */ u(
    h,
    {
      ...F,
      readOnly: i,
      name: t,
      value: v,
      onChange: m,
      alert: !!y,
      size: e,
      className: U(l.slugInput, {
        [l.slugInput__sizeL]: e === "L",
        [l.slugInput__sizeS]: e === "S",
        [l.slugInput__sizeXS]: e === "XS"
      }),
      suffix: /* @__PURE__ */ u("button", { type: "button", className: l.slugInput_Icon, children: i ? /* @__PURE__ */ u(M, { onClick: () => S(!1) }) : /* @__PURE__ */ u(O, { onClick: () => S(!0) }) })
    }
  ) });
};
z.inputName = "SlugInput";
export {
  z as SlugInput
};
