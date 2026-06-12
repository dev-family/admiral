import { jsxs as k, jsx as c } from "react/jsx-runtime";
import v, { useState as T, useMemo as p, useEffect as w } from "react";
import { useForm as B } from "./FormContext.mjs";
import b from "./FormTabs.module.scss.mjs";
import { Badge as K } from "../ui/Badge/Badge.mjs";
import { Tabs as S } from "../ui/Tabs/Tabs.mjs";
function V({ items: t, activeKey: n, defaultActiveKey: i, onChange: r, ...y }) {
  const { errors: d, locale: u } = B(), [g, I] = T(
    () => {
      var e;
      return n ?? i ?? ((e = t[0]) == null ? void 0 : e.key);
    }
  ), N = n ?? g, h = p(
    () => t.map((e) => {
      const s = E(e.children);
      return e.fields ? [.../* @__PURE__ */ new Set([...s, ...e.fields])] : s;
    }),
    [t]
  ), f = p(
    () => Object.keys(d).filter((e) => {
      var s;
      return e !== "_global" && ((s = d[e]) == null ? void 0 : s.length);
    }),
    [d]
  ), m = p(
    () => h.map(
      (e) => e.filter((s) => f.some((a) => x(a, s))).length
    ),
    [h, f]
  );
  w(() => {
    if (!f.length) return;
    const e = f.filter(
      (o) => !h.some((F) => F.some((j) => x(o, j)))
    );
    e.length && console.warn(
      `[Admiral] Form.Tabs: no tab matches the error keys ${e.map((o) => `"${o}"`).join(", ")}. If these fields are rendered inside a tab by a component whose children cannot be inspected, list them in the "fields" prop of that tab item.`
    );
    const s = t.findIndex((o) => o.key === N);
    if (m[s]) return;
    const a = m.findIndex(Boolean);
    if (a === -1) return;
    const l = t[a].key;
    I(l), r == null || r(l);
  }, [d]);
  const A = p(
    () => t.map((e, s) => {
      const { fields: a, ...l } = e, o = m[s];
      return o ? {
        ...l,
        label: /* @__PURE__ */ k("span", { className: b.label, children: [
          /* @__PURE__ */ c("span", { className: b.label_Alert, children: e.label }),
          /* @__PURE__ */ c("span", { "aria-hidden": "true", children: /* @__PURE__ */ c(K, { count: o, status: "error", size: "S" }) }),
          u.tabErrors && /* @__PURE__ */ c("span", { className: b.srOnly, children: u.tabErrors(o) })
        ] })
      } : l;
    }),
    [t, m, u]
  );
  return /* @__PURE__ */ c(
    S,
    {
      ...y,
      activeKey: N,
      onChange: (e) => {
        I(e), r == null || r(e);
      },
      items: A
    }
  );
}
const x = (t, n) => t === n || t.startsWith(`${n}.`);
function E(t, n = []) {
  return v.Children.forEach(t, (i) => {
    if (!v.isValidElement(i)) return;
    const r = i.props;
    typeof (typeof i.type == "string" ? void 0 : i.type.inputName) == "string" && typeof r.name == "string" && n.push(r.name), E(r == null ? void 0 : r.children, n);
  }), n;
}
export {
  V as default
};
