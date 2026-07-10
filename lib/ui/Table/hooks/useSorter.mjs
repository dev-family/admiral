import { jsx as y, jsxs as K } from "react/jsx-runtime";
import { useState as A, useEffect as M, useMemo as R } from "react";
import { getColumnKey as C, getColumnPos as P } from "../util.mjs";
import O from "classnames";
import W from "../Table.module.scss.mjs";
import { Tooltip as q } from "../../Tooltip/Tooltip.mjs";
function j(e, r) {
  let t = null;
  return (e || []).forEach((n, d) => {
    const i = P(d);
    r ? n.sorter && n.key === r.columnKey && (t = {
      column: n,
      key: C(n, i),
      sortOrder: r.order
    }) : n.sorter && n.defaultSortOrder && (t = {
      column: n,
      key: C(n, i),
      sortOrder: n.defaultSortOrder
    });
  }), t;
}
function Z({
  mergedColumns: e,
  onSorterChange: r,
  sortDirections: t,
  controlledSorter: n,
  tableLocale: d,
  showSorterTooltip: i
}) {
  const [o, s] = A(
    j(e, n)
  );
  M(() => {
    const { columnKey: l, order: g } = n || {};
    (l !== (o == null ? void 0 : o.key) || g !== (o == null ? void 0 : o.sortOrder)) && s(j(e, n));
  }, [n]);
  function u(l) {
    s(l), r(D(l));
  }
  return [R(
    () => B(
      e,
      o,
      u,
      t,
      d,
      i
    ),
    [o, u]
  ), o, () => D(o)];
}
function z(e, r) {
  return r ? e[e.indexOf(r) + 1] : e[0];
}
const a = {
  ascend: "asc",
  descend: "desc"
};
function B(e, r, t, n, d, i, o) {
  return (e || []).map((s, u) => {
    const f = P(u);
    let c = s;
    if (c.sorter) {
      const l = c.sortDirections || n, g = c.showSorterTooltip === void 0 ? i : c.showSorterTooltip, S = C(c, f), x = (r == null ? void 0 : r.key) === S ? r : null, m = x ? x.sortOrder : null, h = z(l, m), T = l.includes(a.ascend) && /* @__PURE__ */ y(
        "span",
        {
          role: "img",
          className: O("column-sorter-up", {
            active: m === a.ascend
          })
        }
      ), w = l.includes(a.descend) && /* @__PURE__ */ y(
        "span",
        {
          role: "img",
          className: O("column-sorter-down", {
            active: m === a.descend
          })
        }
      ), { cancelSort: H, triggerAsc: I, triggerDesc: E } = d || {};
      let k = H;
      h === a.descend ? k = E : h === a.ascend && (k = I);
      const F = typeof g == "object" ? g : {
        content: k,
        hideOnClick: !1,
        contentClassName: W.limitedWidth
      };
      c = {
        ...c,
        className: O(c.className, {
          "column-sort": m
        }),
        title: (() => {
          const N = /* @__PURE__ */ K("div", { className: "column-sorters", children: [
            /* @__PURE__ */ y("span", { className: "column-title", children: s.title }),
            /* @__PURE__ */ y(
              "span",
              {
                className: O("column-sorter", {
                  "column-sorter-full": !!(T && w)
                }),
                children: /* @__PURE__ */ K("span", { className: "column-sorter-inner", children: [
                  T,
                  w
                ] })
              }
            )
          ] });
          return g ? /* @__PURE__ */ y(q, { ...F, children: N }) : N;
        })(),
        onHeaderCell: (N) => {
          const p = s.onHeaderCell && s.onHeaderCell(N) || {}, v = p.onClick;
          return p.onClick = (b) => {
            t({
              column: s,
              key: S,
              sortOrder: h
            }), v && v(b);
          }, p.className = O(p.className, "column-has-sorters"), p["aria-sort"] = m ? m === a.ascend ? "ascending" : "descending" : void 0, p;
        }
      };
    }
    return c;
  });
}
function G(e) {
  const { column: r, sortOrder: t } = e;
  return {
    column: r,
    order: t,
    field: r.dataIndex,
    columnKey: r.key
  };
}
function D(e) {
  return e && e.sortOrder ? G(e) : {};
}
function J(e) {
  return typeof e == "function" ? e : !1;
}
function _(e, r) {
  const t = e.slice(), n = r;
  return n ? t.sort((d, i) => {
    const {
      column: { sorter: o },
      sortOrder: s
    } = n, u = J(o);
    if (u && s) {
      const f = u(d, i, s);
      if (f !== 0)
        return s === a.ascend ? f : -f;
    }
    return 0;
  }) : t;
}
export {
  Z as default,
  _ as getSortData
};
