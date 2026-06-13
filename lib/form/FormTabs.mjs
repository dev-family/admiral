import { jsxs as K, jsx as c } from "react/jsx-runtime";
import A, { useState as k, useMemo as p, useEffect as w } from "react";
import { useForm as B } from "./FormContext.mjs";
import { matchesField as y } from "./rules.mjs";
import h from "./FormTabs.module.scss.mjs";
import { Badge as S } from "../ui/Badge/Badge.mjs";
import { Tabs as _ } from "../ui/Tabs/Tabs.mjs";
function O({ items: t, activeKey: n, defaultActiveKey: i, onChange: r, ...N }) {
  const { errors: d, locale: u, hiddenFields: I } = B(), [F, v] = k(
    () => {
      var e;
      return n ?? i ?? ((e = t[0]) == null ? void 0 : e.key);
    }
  ), x = n ?? F, b = p(
    () => t.map((e) => {
      const s = E(e.children);
      return e.fields ? [.../* @__PURE__ */ new Set([...s, ...e.fields])] : s;
    }),
    [t]
  ), f = p(
    () => Object.keys(d).filter(
      (e) => {
        var s;
        return e !== "_global" && ((s = d[e]) == null ? void 0 : s.length) && !$(e, I);
      }
    ),
    [d, I]
  ), m = p(
    () => b.map(
      (e) => e.filter((s) => f.some((a) => y(a, s))).length
    ),
    [b, f]
  );
  w(() => {
    if (!f.length) return;
    const e = f.filter(
      (o) => !b.some((T) => T.some((j) => y(o, j)))
    );
    e.length && console.warn(
      `[Admiral] Form.Tabs: no tab matches the error keys ${e.map((o) => `"${o}"`).join(", ")}. If these fields are rendered inside a tab by a component whose children cannot be inspected, list them in the "fields" prop of that tab item.`
    );
    const s = t.findIndex((o) => o.key === x);
    if (m[s]) return;
    const a = m.findIndex(Boolean);
    if (a === -1) return;
    const l = t[a].key;
    v(l), r == null || r(l);
  }, [d]);
  const g = p(
    () => t.map((e, s) => {
      const { fields: a, ...l } = e, o = m[s];
      return o ? {
        ...l,
        label: /* @__PURE__ */ K("span", { className: h.label, children: [
          /* @__PURE__ */ c("span", { className: h.label_Alert, children: e.label }),
          /* @__PURE__ */ c("span", { "aria-hidden": "true", children: /* @__PURE__ */ c(S, { count: o, status: "error", size: "S" }) }),
          u.tabErrors && /* @__PURE__ */ c("span", { className: h.srOnly, children: u.tabErrors(o) })
        ] })
      } : l;
    }),
    [t, m, u]
  );
  return /* @__PURE__ */ c(
    _,
    {
      ...N,
      activeKey: x,
      onChange: (e) => {
        v(e), r == null || r(e);
      },
      items: g
    }
  );
}
const $ = (t, n) => n ? Array.from(n).some((i) => y(t, i)) : !1;
function E(t, n = []) {
  return A.Children.forEach(t, (i) => {
    if (!A.isValidElement(i)) return;
    const r = i.props;
    typeof (typeof i.type == "string" ? void 0 : i.type.inputName) == "string" && typeof r.name == "string" && n.push(r.name), E(r == null ? void 0 : r.children, n);
  }), n;
}
O.formNodeType = "tabs";
export {
  O as default
};
