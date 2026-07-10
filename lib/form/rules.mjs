const p = "[Admiral]";
function l(t, i) {
  if (i in t) return t[i];
  const e = i.split(".");
  let o = t;
  for (const r of e) {
    if (o == null) return;
    o = o[r];
  }
  return o;
}
function m(t) {
  return t == null || t === "" ? !0 : Array.isArray(t) ? t.length === 0 : !1;
}
const b = (t, i) => t === i || t.startsWith(`${i}.`), g = (t) => typeof t == "object" && t !== null && !Array.isArray(t);
function h(t, i) {
  const e = t.field;
  if ("is" in t) {
    const r = t.is;
    return (n) => {
      const s = l(n, e);
      return Array.isArray(s) ? !1 : s === r;
    };
  }
  if ("not" in t) {
    const r = t.not;
    return (n) => {
      const s = l(n, e);
      return Array.isArray(s) ? !0 : s !== r;
    };
  }
  if ("in" in t) {
    const r = t.in;
    return Array.isArray(r) ? (n) => r.includes(l(n, e)) : () => (i(
      `${p} Rule operator "in" on field "${e}" expects an array operand, got ${typeof r}. The condition evaluates to false.`
    ), !1);
  }
  if ("empty" in t) {
    const r = t.empty;
    return (n) => m(l(n, e)) === r;
  }
  const o = ["gt", "gte", "lt", "lte"];
  for (const r of o)
    if (r in t) {
      const n = t[r];
      return (s) => {
        const u = l(s, e);
        if (!Number.isFinite(u) || !Number.isFinite(n))
          return i(
            `${p} Rule operator "${r}" on field "${e}" expects finite numbers on both sides (no string/date coercion). The condition evaluates to false.`
          ), !1;
        const f = u, c = n;
        return r === "gt" ? f > c : r === "gte" ? f >= c : r === "lt" ? f < c : f <= c;
      };
    }
  return null;
}
function a(t, i) {
  if (!g(t)) return null;
  if ("and" in t) {
    const e = t.and;
    if (!Array.isArray(e)) return null;
    const o = e.map((r) => a(r, i) ?? (() => !0));
    return (r) => o.every((n) => n(r));
  }
  if ("or" in t) {
    const e = t.or;
    if (!Array.isArray(e)) return null;
    const o = e.map((r) => a(r, i) ?? (() => !0));
    return (r) => o.some((n) => n(r));
  }
  if ("not" in t && !("field" in t)) {
    const e = a(t.not, i);
    return e ? (o) => !e(o) : null;
  }
  return "field" in t && typeof t.field == "string" ? h(t, i) : null;
}
const y = /* @__PURE__ */ new WeakMap();
function $(t) {
  if (typeof t == "function") return t;
  const i = t;
  if (i !== null && typeof i == "object") {
    const s = y.get(i);
    if (s) return s;
  }
  let e = !1;
  const o = (s) => {
    e || (e = !0, console.warn(s));
  }, n = a(t, o) ?? (() => (o(
    `${p} Malformed rule ${A(t)} — it has no recognized operator. Failing open: the field stays visible. Check the rule shape against the DSL grammar.`
  ), !0));
  return i !== null && typeof i == "object" && y.set(i, n), n;
}
function A(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return String(t);
  }
}
function N(t, i) {
  if (i.length === 0) return t;
  let e = t, o = !1;
  const r = () => {
    o || (e = { ...e }, o = !0);
  };
  for (const n of i) {
    if (n in e) {
      r(), delete e[n];
      continue;
    }
    const s = n.split("."), u = d(e, s);
    u !== e && (e = u, o = !0);
  }
  return e;
}
function d(t, i) {
  if (t == null || typeof t != "object") return t;
  const [e, ...o] = i, r = Array.isArray(t), n = t;
  if (o.length === 0) {
    if (!(e in n)) return t;
    if (r) {
      const c = t.slice();
      return delete c[Number(e)], c;
    }
    const f = { ...n };
    return delete f[e], f;
  }
  if (!(e in n)) return t;
  const s = d(n[e], o);
  if (s === n[e]) return t;
  if (r) {
    const f = t.slice();
    return f[Number(e)] = s, f;
  }
  const u = { ...n };
  return u[e] = s, u;
}
export {
  $ as compileRule,
  l as getValueByPath,
  m as isEmptyValue,
  b as matchesField,
  N as omitPaths
};
