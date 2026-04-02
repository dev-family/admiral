import { jsx as i, Fragment as R } from "react/jsx-runtime";
import q, { useState as M, useCallback as d, useEffect as N } from "react";
import { useForm as W } from "../FormContext.mjs";
import { Form as x } from "../Form.mjs";
import { TextInput as z } from "./TextInput.mjs";
import { EditorInput as B } from "./EditorInput.mjs";
import { MultilineTextInput as D } from "./MultilineTextInput.mjs";
import { Tabs as S } from "../../ui/Tabs/Tabs.mjs";
const G = {
  editor: B,
  multilineText: D,
  text: z
}, H = (p) => {
  var y;
  const { name: r, label: m, required: u, languages: a, tabType: b = "card", field: l, props: f } = p, { values: C, setValues: j, errors: h, setErrors: E, ...w } = W(), [K, T] = M((y = a[0]) == null ? void 0 : y.value), O = G[l], o = C[r] ?? {}, g = I(h, r), P = d(
    (e) => (t) => {
      j((n) => {
        const s = o[e];
        let c;
        return typeof t == "function" ? c = t(s) : c = t, {
          ...n,
          [r]: {
            ...!(r in (n ?? {})) || !(n != null && n[r]) ? o : n[r],
            ...c
          }
        };
      });
    },
    []
  ), V = d(
    (e) => {
      E((t) => {
        const n = I(t, r) ?? {};
        let s;
        typeof e == "function" ? s = e(n) : s = e;
        const c = Object.entries(s).reduce(
          (F, [k, A]) => (F[`${r}.${k}`] = A, F),
          {}
        );
        return {
          ...t,
          ...c
        };
      });
    },
    [E]
  ), $ = d((e) => {
    T(e);
  }, []);
  return N(() => {
    const e = Object.keys(g);
    e.length && T(e[0]);
  }, [h]), /* @__PURE__ */ i(R, { children: /* @__PURE__ */ i(x.Item, { label: m, columnSpan: 2, labelAs: "div", required: u, children: /* @__PURE__ */ i(S, { type: b, activeKey: K, onChange: $, children: a.map(({ label: e, value: t }) => {
    const n = g[t] ?? {};
    return /* @__PURE__ */ i(S.TabPane, { tab: e, children: /* @__PURE__ */ i(
      x.ChildForm,
      {
        values: { [t]: o == null ? void 0 : o[t] },
        setValues: P(t),
        errors: n,
        setErrors: V,
        ...w,
        children: q.createElement(O, {
          ...f,
          name: t
        })
      }
    ) }, t);
  }) }) }) });
};
H.inputName = "TranslatableInput";
const I = (p, r) => Object.entries(p).reduce(
  (m, [u, a]) => {
    const b = new RegExp(`^${r}\\.(.+)`), l = u.match(b);
    if (l) {
      const [, f] = l;
      m[f] = { [f]: a };
    }
    return m;
  },
  {}
);
export {
  H as TranslatableInput
};
