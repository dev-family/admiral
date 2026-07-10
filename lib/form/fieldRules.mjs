import { jsx as k } from "react/jsx-runtime";
import { useForm as g } from "./FormContext.mjs";
import { compileRule as F, getValueByPath as S } from "./rules.mjs";
const y = "[Admiral]", x = ["visibleWhen", "disabledWhen", "requiredWhen", "keepInPayload"], m = (e, i) => e ? `${e}.${i}` : i, P = /* @__PURE__ */ new Set();
function b(e, i, t) {
  const r = `${e}::${i}`;
  P.has(r) || (P.add(r), console.warn(t));
}
function A(e, i) {
  return e === void 0 || typeof e == "function" ? !1 : W(e, i);
}
function W(e, i) {
  return typeof e != "object" || e === null ? !1 : "field" in e ? e.field === i : "and" in e && Array.isArray(e.and) ? e.and.some((t) => W(t, i)) : "or" in e && Array.isArray(e.or) ? e.or.some((t) => W(t, i)) : "not" in e ? W(e.not, i) : !1;
}
function J(e, i) {
  const { values: t, scopePath: r = "", rules: h, scannedFields: f } = g(), d = m(r, e), { visibleWhen: s, disabledWhen: l, requiredWhen: u } = i, n = h == null ? void 0 : h[d];
  (s !== void 0 && (n == null ? void 0 : n.visible) !== void 0 || l !== void 0 && (n == null ? void 0 : n.disabled) !== void 0 || u !== void 0 && (n == null ? void 0 : n.required) !== void 0) && b(
    "conflict",
    d,
    `${y} Field "${d}" has both a JSX rule prop and a Form \`rules\` map entry for the same dimension. The JSX prop wins and the map entry is ignored. Define the rule in one place.`
  ), (A(s, e) || A(l, e) || A(u, e)) && b(
    "self",
    d,
    `${y} A rule on field "${d}" references its own value ("${e}"). A field's rule should depend on other fields; this likely is a mistake.`
  ), (s !== void 0 || l !== void 0 || u !== void 0) && f !== void 0 && !f.has(d) && b(
    "scan",
    d,
    `${y} Field "${d}" has a JSX rule prop but the form's static scan did not discover it (it is likely rendered inside a custom component the scan cannot inspect). Its value will NOT be omitted from the payload when hidden. Move the rule into the Form \`rules\` map so the scan can see it.`
  );
  const $ = s ?? (n == null ? void 0 : n.visible), o = $ !== void 0 ? !F($)(t) : !1, q = l ?? (n == null ? void 0 : n.disabled), c = !!i.disabled || (q !== void 0 ? F(q)(t) : !1), a = u ?? (n == null ? void 0 : n.required), v = a !== void 0 ? F(a)(t) : !!i.required;
  return { hidden: o, disabled: c, required: v };
}
function O(e, i) {
  return Object.is(e, i) ? !0 : Array.isArray(e) && Array.isArray(i) ? e.length !== i.length ? !1 : e.every((t, r) => Object.is(t, i[r])) : !1;
}
function X(e, i = {}) {
  const {
    supportsDisabled: t = !0,
    supportsRequiredWhen: r = !0,
    dispatchesChange: h = !0
  } = i, f = function(s) {
    const { values: l, scopePath: u = "", fieldChange: n } = g(), { hidden: p, disabled: w, required: $ } = J(s.name, s), o = m(u, s.name), q = s;
    if (!t && s.disabledWhen !== void 0 && b(
      "unsupported-disabled",
      o,
      `${y} \`disabledWhen\` is not supported on "${o}" and is ignored.`
    ), !r && s.requiredWhen !== void 0 && b(
      "unsupported-required",
      o,
      `${y} \`requiredWhen\` is not supported on "${o}" and is ignored.`
    ), p) return null;
    const c = { ...s };
    for (const a of x) delete c[a];
    if (t && (c.disabled = w), r && (c.required = $), h) {
      const a = q.onChange;
      c.onChange = (v) => {
        a == null || a(v);
        const j = S(l, o);
        O(v, j) || n == null || n.notify({ path: o, value: v });
      };
    }
    return /* @__PURE__ */ k(e, { ...c });
  };
  return Object.assign(f, e), f.displayName = `withFieldRules(${e.displayName || e.name || "Field"})`, f;
}
export {
  J as useFieldRules,
  X as withFieldRules
};
