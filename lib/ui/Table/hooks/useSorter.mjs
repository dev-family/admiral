import { jsx as p, jsxs as K } from "react/jsx-runtime";
import { useState as b, useEffect as A, useMemo as M } from "react";
import { getColumnKey as k, getColumnPos as D } from "../util.mjs";
import g from "classnames";
import R from "../Table.module.scss.mjs";
import { Tooltip as W } from "../../Tooltip/Tooltip.mjs";
function j(e, r) {
  let n = null;
  return (e || []).forEach((o, u) => {
    const i = D(u);
    r ? o.sorter && o.key === r.columnKey && (n = {
      column: o,
      key: k(o, i),
      sortOrder: r.order
    }) : o.sorter && o.defaultSortOrder && (n = {
      column: o,
      key: k(o, i),
      sortOrder: o.defaultSortOrder
    });
  }), n;
}
function Y({
  mergedColumns: e,
  onSorterChange: r,
  sortDirections: n,
  controlledSorter: o,
  tableLocale: u,
  showSorterTooltip: i
}) {
  const [t, s] = b(
    j(e, o)
  );
  A(() => {
    const { columnKey: l, order: d } = o || {};
    (l !== (t == null ? void 0 : t.key) || d !== (t == null ? void 0 : t.sortOrder)) && s(j(e, o));
  }, [o]);
  function a(l) {
    s(l), r(v(l));
  }
  return [M(
    () => z(
      e,
      t,
      a,
      n,
      u,
      i
    ),
    [t, a]
  ), t, () => v(t)];
}
function q(e, r) {
  return r ? e[e.indexOf(r) + 1] : e[0];
}
function z(e, r, n, o, u, i, t) {
  return (e || []).map((s, a) => {
    const f = D(a);
    let c = s;
    if (c.sorter) {
      const l = c.sortDirections || o, d = c.showSorterTooltip === void 0 ? i : c.showSorterTooltip, C = k(c, f), S = (r == null ? void 0 : r.key) === C ? r : null, y = S ? S.sortOrder : null, N = q(l, y), x = l.includes(
        "asc"
        /* ascend */
      ) && /* @__PURE__ */ p(
        "span",
        {
          role: "img",
          className: g("column-sorter-up", {
            active: y === "asc"
            /* ascend */
          })
        }
      ), T = l.includes(
        "desc"
        /* descend */
      ) && /* @__PURE__ */ p(
        "span",
        {
          role: "img",
          className: g("column-sorter-down", {
            active: y === "desc"
            /* descend */
          })
        }
      ), { cancelSort: P, triggerAsc: H, triggerDesc: I } = u || {};
      let h = P;
      N === "desc" ? h = I : N === "asc" && (h = H);
      const E = typeof d == "object" ? d : {
        content: h,
        hideOnClick: !1,
        contentClassName: R.limitedWidth
      };
      c = {
        ...c,
        className: g(c.className, {
          "column-sort": y
        }),
        title: (() => {
          const O = /* @__PURE__ */ K("div", { className: "column-sorters", children: [
            /* @__PURE__ */ p("span", { className: "column-title", children: s.title }),
            /* @__PURE__ */ p(
              "span",
              {
                className: g("column-sorter", {
                  "column-sorter-full": !!(x && T)
                }),
                children: /* @__PURE__ */ K("span", { className: "column-sorter-inner", children: [
                  x,
                  T
                ] })
              }
            )
          ] });
          return d ? /* @__PURE__ */ p(W, { ...E, children: O }) : O;
        })(),
        onHeaderCell: (O) => {
          const m = s.onHeaderCell && s.onHeaderCell(O) || {}, w = m.onClick;
          return m.onClick = (F) => {
            n({
              column: s,
              key: C,
              sortOrder: N
            }), w && w(F);
          }, m.className = g(m.className, "column-has-sorters"), m;
        }
      };
    }
    return c;
  });
}
function B(e) {
  const { column: r, sortOrder: n } = e;
  return {
    column: r,
    order: n,
    field: r.dataIndex,
    columnKey: r.key
  };
}
function v(e) {
  return e && e.sortOrder ? B(e) : {};
}
function G(e) {
  return typeof e == "function" ? e : !1;
}
function Z(e, r) {
  const n = e.slice(), o = r;
  return o ? n.sort((u, i) => {
    const {
      column: { sorter: t },
      sortOrder: s
    } = o, a = G(t);
    if (a && s) {
      const f = a(u, i, s);
      if (f !== 0)
        return s === "asc" ? f : -f;
    }
    return 0;
  }) : n;
}
export {
  Y as default,
  Z as getSortData
};
