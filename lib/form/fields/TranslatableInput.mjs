import { jsx as l, Fragment as B } from "react/jsx-runtime";
import D, { useState as M, useCallback as b, useEffect as N } from "react";
import { useForm as W } from "../FormContext.mjs";
import { Form as x } from "../Form.mjs";
import { TextInput as z } from "./TextInput.mjs";
import { EditorInput as G } from "./EditorInput.mjs";
import { MultilineTextInput as H } from "./MultilineTextInput.mjs";
import { withFieldRules as J } from "../fieldRules.mjs";
import { Tabs as L } from "../../ui/Tabs/Tabs.mjs";
const Q = {
  editor: G,
  multilineText: H,
  text: z
}, C = (o) => {
  var y;
  const { name: t, label: c, required: p, languages: i, tabType: f = "card", field: a, props: m } = o, {
    values: P,
    setValues: d,
    errors: E,
    setErrors: T,
    scopePath: j = "",
    ...w
  } = W(), [$, g] = M((y = i[0]) == null ? void 0 : y.value), k = Q[a], u = P[t] ?? {}, F = I(E, t), K = b(
    (e) => (r) => {
      d((n) => {
        const s = (n == null ? void 0 : n[t]) ?? {}, h = typeof r == "function" ? r({ [e]: s[e] }) : r;
        return {
          ...n,
          [t]: {
            ...s,
            ...h
          }
        };
      });
    },
    [t, d]
  ), O = b(
    (e) => {
      T((r) => {
        const n = I(r, t) ?? {};
        let s;
        typeof e == "function" ? s = e(n) : s = e;
        const h = Object.entries(s).reduce(
          (S, [A, q]) => (S[`${t}.${A}`] = q, S),
          {}
        );
        return {
          ...r,
          ...h
        };
      });
    },
    [T]
  ), R = b((e) => {
    g(e);
  }, []);
  return N(() => {
    const e = Object.keys(F);
    e.length && g(e[0]);
  }, [E]), /* @__PURE__ */ l(B, { children: /* @__PURE__ */ l(x.Item, { label: c, columnSpan: 2, labelAs: "div", required: p, children: /* @__PURE__ */ l(
    L,
    {
      type: f,
      activeKey: $,
      onChange: R,
      items: i.map(({ label: e, value: r }) => ({
        key: r,
        label: e,
        children: /* @__PURE__ */ l(
          x.ChildForm,
          {
            values: { [r]: u == null ? void 0 : u[r] },
            setValues: K(r),
            errors: F[r] ?? {},
            setErrors: O,
            ...w,
            scopePath: U(j, t),
            children: D.createElement(k, {
              ...m,
              name: r
            })
          }
        )
      }))
    }
  ) }) });
};
C.inputName = "TranslatableInput";
const U = (o, t) => o ? `${o}.${t}` : t, ot = J(
  C,
  { supportsDisabled: !1, dispatchesChange: !1 }
), I = (o, t) => Object.entries(o).reduce(
  (c, [p, i]) => {
    const f = new RegExp(`^${t}\\.(.+)`), a = p.match(f);
    if (a) {
      const [, m] = a;
      c[m] = { [m]: i };
    }
    return c;
  },
  {}
);
export {
  ot as TranslatableInput
};
