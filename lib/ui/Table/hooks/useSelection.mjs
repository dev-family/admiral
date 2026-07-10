import { jsx as j } from "react/jsx-runtime";
import ie, { useCallback as E, useEffect as J, useMemo as Q, useState as de } from "react";
import fe from "rc-util/es/hooks/useMergedState";
import { INTERNAL_COL_DEFINE as he } from "rc-table";
import U from "../../Checkbox/Checkbox.mjs";
function ue(o, g) {
  const r = o.slice(), b = r.indexOf(g);
  return b >= 0 && r.splice(b, 1), r;
}
function me(o, g) {
  const r = o.slice();
  return r.indexOf(g) === -1 && r.push(g), r;
}
function pe(o) {
  return o && o.fixed;
}
function ke(o, g) {
  const {
    preserveSelectedRowKeys: r,
    selectedRowKeys: b,
    defaultSelectedRowKeys: V,
    getCheckboxProps: L,
    getTitleCheckboxProps: O,
    onChange: R,
    onSelect: _,
    onSelectMultiple: D,
    columnWidth: B,
    fixed: X,
    hideSelectAll: Y
  } = o || {}, { prefixCls: $, pageData: Z, getRecordByKey: d, getRowKey: f } = g, [C, F] = fe(
    b || V || [],
    {
      value: b
    }
  ), v = ie.useRef(/* @__PURE__ */ new Map()), q = E(
    (s) => {
      if (r) {
        const e = /* @__PURE__ */ new Map();
        s.forEach((t) => {
          let c = d(t);
          !c && v.current.has(t) && (c = v.current.get(t)), e.set(t, c);
        }), v.current = e;
      }
    },
    [d, r]
  );
  J(() => {
    q(C);
  }, [C]);
  const h = Z, y = Q(() => {
    const s = /* @__PURE__ */ new Map();
    return h.forEach((e, t) => {
      const c = f(e, t), u = (L ? L(e) : null) || {};
      s.set(c, u);
    }), s;
  }, [h, f, L]), ee = E(
    (s) => {
      var e;
      return !!((e = y.get(f(s))) != null && e.disabled);
    },
    [y, f]
  ), T = Q(() => {
    const s = C || [];
    return new Set(s);
  }, [C]), [z, te] = de(null);
  J(() => {
    o || F([]);
  }, [!!o]);
  const A = E(
    (s) => {
      let e, t;
      q(s), r ? (e = s, t = s.map((c) => v.current.get(c))) : (e = [], t = [], s.forEach((c) => {
        const u = d(c);
        u !== void 0 && (e.push(c), t.push(u));
      })), F(e), R == null || R(e, t);
    },
    [F, d, R, r]
  ), G = E(
    (s, e, t, c) => {
      if (_) {
        const u = t.map((W) => d(W));
        _(d(s), e, u, c);
      }
      A(t);
    },
    [_, d, A]
  );
  return [E(
    (s) => {
      if (!o)
        return s;
      const e = T, t = h.map(f).filter((n) => !y.get(n).disabled), c = t.every((n) => e.has(n)), u = t.some((n) => e.has(n)), W = () => {
        c ? t.forEach((i) => {
          e.delete(i);
        }) : t.forEach((i) => {
          e.has(i) || e.add(i);
        });
        const n = Array.from(e);
        A(n);
      }, w = h.map((n, i) => {
        const x = f(n, i), l = y.get(x) || {};
        return { checked: e.has(x), ...l };
      }).filter(({ disabled: n }) => n), K = !!w.length && w.length === h.length, H = K && w.every(({ checked: n }) => n), se = K && w.some(({ checked: n }) => n), ne = (O == null ? void 0 : O()) ?? {}, ce = !Y && /* @__PURE__ */ j("div", { className: `${$}-selection`, children: /* @__PURE__ */ j(
        U,
        {
          ...ne,
          checked: K ? H : !!h.length && c,
          indeterminate: K ? !H && se : !c && u,
          onChange: W,
          disabled: h.length === 0 || K
        }
      ) }), oe = (n, i, x) => {
        const l = f(i, x), S = e.has(l), M = y.get(l), le = (M == null ? void 0 : M.indeterminate) ?? !1;
        return {
          node: /* @__PURE__ */ j(
            U,
            {
              ...M,
              indeterminate: le,
              checked: S,
              onClick: (N) => N.stopPropagation(),
              onChange: ({ event: N }) => {
                const { shiftKey: ae } = N;
                let P = -1, I = -1;
                if (ae) {
                  const m = /* @__PURE__ */ new Set([z, l]);
                  t.some((p, k) => {
                    if (m.has(p))
                      if (P === -1)
                        P = k;
                      else
                        return I = k, !0;
                    return !1;
                  });
                }
                if (I !== -1 && P !== I) {
                  const m = t.slice(P, I + 1), p = [];
                  S ? m.forEach((a) => {
                    e.has(a) && (p.push(a), e.delete(a));
                  }) : m.forEach((a) => {
                    e.has(a) || (p.push(a), e.add(a));
                  });
                  const k = Array.from(e);
                  D == null || D(
                    !S,
                    k.map((a) => d(a)),
                    p.map((a) => d(a))
                  ), A(k);
                } else {
                  const m = C, p = S ? ue(m, l) : me(m, l);
                  G(l, !S, p, N);
                }
                te(l);
              }
            }
          ),
          checked: S
        };
      }, re = (n, i, x) => {
        const { node: l } = oe(n, i, x);
        return l;
      };
      return [{ ...{
        width: B,
        className: `${$}-selection-column`,
        title: o.columnTitle || ce,
        render: re,
        [he]: {
          className: `${$}-selection-col`
        }
      }, fixed: X || pe(s[0]) }, ...s];
    },
    [
      f,
      h,
      o,
      C,
      T,
      B,
      z,
      y,
      D,
      G,
      ee
    ]
  ), T];
}
export {
  me as arrAdd,
  ue as arrDel,
  ke as default
};
