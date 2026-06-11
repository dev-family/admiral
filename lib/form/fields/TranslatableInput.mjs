import { jsx as a, Fragment as R } from "react/jsx-runtime";
import q, { useState as M, useCallback as d, useEffect as N } from "react";
import { useForm as W } from "../FormContext.mjs";
import { Form as S } from "../Form.mjs";
import { TextInput as z } from "./TextInput.mjs";
import { EditorInput as B } from "./EditorInput.mjs";
import { MultilineTextInput as D } from "./MultilineTextInput.mjs";
import { Tabs as G } from "../../ui/Tabs/Tabs.mjs";
const H = {
  editor: B,
  multilineText: D,
  text: z
}, J = (l) => {
  var F;
  const { name: r, label: s, required: f, languages: c, tabType: p = "card", field: i, props: m } = l, { values: C, setValues: h, errors: E, setErrors: T, ...j } = W(), [w, g] = M((F = c[0]) == null ? void 0 : F.value), k = H[i], u = C[r] ?? {}, y = I(E, r), K = d(
    (t) => (e) => {
      h((n) => {
        const o = (n == null ? void 0 : n[r]) ?? {}, b = typeof e == "function" ? e({ [t]: o[t] }) : e;
        return {
          ...n,
          [r]: {
            ...o,
            ...b
          }
        };
      });
    },
    [r, h]
  ), O = d(
    (t) => {
      T((e) => {
        const n = I(e, r) ?? {};
        let o;
        typeof t == "function" ? o = t(n) : o = t;
        const b = Object.entries(o).reduce(
          (x, [A, P]) => (x[`${r}.${A}`] = P, x),
          {}
        );
        return {
          ...e,
          ...b
        };
      });
    },
    [T]
  ), $ = d((t) => {
    g(t);
  }, []);
  return N(() => {
    const t = Object.keys(y);
    t.length && g(t[0]);
  }, [E]), /* @__PURE__ */ a(R, { children: /* @__PURE__ */ a(S.Item, { label: s, columnSpan: 2, labelAs: "div", required: f, children: /* @__PURE__ */ a(
    G,
    {
      type: p,
      activeKey: w,
      onChange: $,
      items: c.map(({ label: t, value: e }) => ({
        key: e,
        label: t,
        children: /* @__PURE__ */ a(
          S.ChildForm,
          {
            values: { [e]: u == null ? void 0 : u[e] },
            setValues: K(e),
            errors: y[e] ?? {},
            setErrors: O,
            ...j,
            children: q.createElement(k, {
              ...m,
              name: e
            })
          }
        )
      }))
    }
  ) }) });
};
J.inputName = "TranslatableInput";
const I = (l, r) => Object.entries(l).reduce(
  (s, [f, c]) => {
    const p = new RegExp(`^${r}\\.(.+)`), i = f.match(p);
    if (i) {
      const [, m] = i;
      s[m] = { [m]: c };
    }
    return s;
  },
  {}
);
export {
  J as TranslatableInput
};
