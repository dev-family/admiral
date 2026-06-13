import g from "react";
import { omitPaths as W, compileRule as d, getValueByPath as v } from "./rules.mjs";
const S = "[Admiral]", h = (n, e) => typeof n == "string" || n == null ? void 0 : n[e], $ = (n, e) => n[e];
function q(n, e) {
  const t = { hasRules: !1 }, o = f(n, t), i = t.hasRules || e !== void 0 && Object.keys(e).length > 0;
  return { nodes: o, rulesMap: e, hasRules: i };
}
function f(n, e) {
  const t = [];
  return g.Children.forEach(n, (o) => {
    if (!g.isValidElement(o)) return;
    const i = o.type, a = o.props;
    if (h(i, "formNodeType") === "when") {
      e.hasRules = !0, t.push({
        kind: "when",
        rule: a.rule,
        children: f(a.children, e)
      });
      return;
    }
    if (h(i, "formNodeType") === "tabs") {
      const u = a.items;
      for (const r of u ?? [])
        t.push(...f(r == null ? void 0 : r.children, e));
      return;
    }
    const s = h(i, "inputName");
    if (s === "ArrayInput" && typeof a.name == "string") {
      const u = N(a, e);
      t.push(u);
      return;
    }
    if (s === "TranslatableInput" && typeof a.name == "string") {
      t.push(V(a, e));
      return;
    }
    if (typeof s == "string" && typeof a.name == "string") {
      t.push(A(a, e));
      return;
    }
    t.push(...f(a.children, e));
  }), t;
}
function m(n, e) {
  const t = $(n, "visibleWhen"), o = n.disabledWhen !== void 0, i = n.requiredWhen !== void 0;
  return (t !== void 0 || o || i) && (e.hasRules = !0), {
    visibleWhen: t,
    hasDisabledWhen: o,
    hasRequiredWhen: i,
    keepInPayload: n.keepInPayload === !0
  };
}
function A(n, e) {
  return { kind: "field", name: n.name, ...m(n, e) };
}
function N(n, e) {
  const t = n.children, o = typeof t == "function", i = o ? void 0 : f(t, e);
  return o && (e.hasRules = !0), {
    kind: "array",
    name: n.name,
    ...m(n, e),
    rowTemplate: t,
    staticRowScan: i
  };
}
function V(n, e) {
  const t = n.languages ?? [];
  return {
    kind: "translatable",
    name: n.name,
    languages: t.map((o) => o.value),
    ...m(n, e)
  };
}
const R = (n, e) => n ? `${n}.${e}` : e;
function B(n, e) {
  const t = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
  return p(n.nodes, e, "", !0, n.rulesMap, t, o, i), n.rulesMap && F(n.rulesMap, e, o, t), { hiddenPaths: t, scannedPaths: o, keepPaths: i, hasRules: n.hasRules };
}
function p(n, e, t, o, i, a, s, u) {
  for (const r of n) {
    if (r.kind === "when") {
      const c = d(r.rule)(e);
      p(
        r.children,
        e,
        t,
        o && c,
        i,
        a,
        s,
        u
      );
      continue;
    }
    if (r.kind === "array") {
      E(
        r,
        e,
        t,
        o,
        i,
        a,
        s,
        u
      );
      continue;
    }
    const l = R(t, r.name);
    if (s.add(l), r.keepInPayload && u.add(l), r.kind === "translatable")
      for (const c of r.languages) s.add(`${l}.${c}`);
    w(r, l, e, o, i) || a.add(l);
  }
}
function E(n, e, t, o, i, a, s, u) {
  const r = R(t, n.name);
  s.add(r), n.keepInPayload && u.add(r);
  const l = w(n, r, e, o, i);
  l || a.add(r);
  const c = v(e, n.name);
  (Array.isArray(c) ? c : []).forEach((k, y) => {
    const I = `${r}.${y}`, b = k ?? {}, T = n.staticRowScan ?? f(
      n.rowTemplate(
        b,
        y
      ),
      {
        hasRules: !1
      }
    );
    p(
      T,
      b,
      I,
      l,
      // Row scope is a child form: the root rules-map does not reach into it.
      void 0,
      a,
      s,
      u
    );
  });
}
function w(n, e, t, o, i) {
  var s;
  if (!o) return !1;
  if (n.visibleWhen !== void 0)
    return d(n.visibleWhen)(t);
  const a = (s = i == null ? void 0 : i[e]) == null ? void 0 : s.visible;
  return a !== void 0 ? d(a)(t) : !0;
}
function F(n, e, t, o) {
  for (const [i, a] of Object.entries(n)) {
    const s = t.has(i), u = v(e, i) !== void 0;
    if (!s && !u) {
      console.warn(
        `${S} The rules-map key "${i}" matches neither a discovered field nor a value path. In v1 the rules-map applies at the root scope only; check the key spelling against your field names.`
      );
      continue;
    }
    if (s) continue;
    const r = a.visible;
    r !== void 0 && !d(r)(e) && o.add(i);
  }
}
function C(n, e, t) {
  const o = [...e].filter((i) => !t.has(i));
  return W(n, o);
}
export {
  B as evaluateVisibility,
  C as omitHiddenValues,
  q as scanFormChildren
};
