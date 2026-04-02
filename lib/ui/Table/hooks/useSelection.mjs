import { jsx as j } from "react/jsx-runtime";
import ie, { useCallback as E, useEffect as J, useMemo as Q, useState as de } from "react";
import { INTERNAL_COL_DEFINE as fe } from "rc-table";
import he from "../../../utils/hooks/useMergedState.mjs";
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
function Ee(o, g) {
  const {
    preserveSelectedRowKeys: r,
    selectedRowKeys: b,
    defaultSelectedRowKeys: V,
    getCheckboxProps: I,
    getTitleCheckboxProps: L,
    onChange: R,
    onSelect: O,
    onSelectMultiple: D,
    columnWidth: B,
    fixed: X,
    hideSelectAll: Y
  } = o || {}, { prefixCls: $, pageData: Z, getRecordByKey: d, getRowKey: f } = g, [C, F] = he(
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
      const c = f(e, t), u = (I ? I(e) : null) || {};
      s.set(c, u);
    }), s;
  }, [h, f, I]), ee = E(
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
      if (O) {
        const u = t.map((W) => d(W));
        O(d(s), e, u, c);
      }
      A(t);
    },
    [O, d, A]
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
        const S = f(n, i), l = y.get(S) || {};
        return { checked: e.has(S), ...l };
      }).filter(({ disabled: n }) => n), K = !!w.length && w.length === h.length, H = K && w.every(({ checked: n }) => n), se = K && w.some(({ checked: n }) => n), ne = (L == null ? void 0 : L()) ?? {}, ce = !Y && /* @__PURE__ */ j("div", { className: `${$}-selection`, children: /* @__PURE__ */ j(
        U,
        {
          ...ne,
          checked: K ? H : !!h.length && c,
          indeterminate: K ? !H && se : !c && u,
          onChange: W,
          disabled: h.length === 0 || K
        }
      ) }), oe = (n, i, S) => {
        const l = f(i, S), x = e.has(l), N = y.get(l), le = (N == null ? void 0 : N.indeterminate) ?? !1;
        return {
          node: /* @__PURE__ */ j(
            U,
            {
              ...N,
              indeterminate: le,
              checked: x,
              onClick: (M) => M.stopPropagation(),
              onChange: ({ event: M }) => {
                const { shiftKey: ae } = M;
                let P = -1, _ = -1;
                if (ae) {
                  const m = /* @__PURE__ */ new Set([z, l]);
                  t.some((p, k) => {
                    if (m.has(p))
                      if (P === -1)
                        P = k;
                      else
                        return _ = k, !0;
                    return !1;
                  });
                }
                if (_ !== -1 && P !== _) {
                  const m = t.slice(P, _ + 1), p = [];
                  x ? m.forEach((a) => {
                    e.has(a) && (p.push(a), e.delete(a));
                  }) : m.forEach((a) => {
                    e.has(a) || (p.push(a), e.add(a));
                  });
                  const k = Array.from(e);
                  D == null || D(
                    !x,
                    k.map((a) => d(a)),
                    p.map((a) => d(a))
                  ), A(k);
                } else {
                  const m = C, p = x ? ue(m, l) : me(m, l);
                  G(l, !x, p, M);
                }
                te(l);
              }
            }
          ),
          checked: x
        };
      }, re = (n, i, S) => {
        const { node: l } = oe(n, i, S);
        return l;
      };
      return [{ ...{
        width: B,
        className: `${$}-selection-column`,
        title: o.columnTitle || ce,
        render: re,
        [fe]: {
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
      null,
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
  Ee as default
};
