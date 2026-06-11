import { jsxs as z, jsx as p, Fragment as B } from "react/jsx-runtime";
import { useState as h, useCallback as b, useMemo as w, useEffect as M } from "react";
import { FaPause as it, FaPlay as ct } from "react-icons/fa";
import { DataTableContextProvider as dt } from "./DataTableContext.mjs";
import { arrayMove as ut } from "@dnd-kit/sortable";
import { useCrudIndex as lt } from "../crud/CrudIndexPageContext.mjs";
import { useTopLocation as pt } from "../router/index.mjs";
import $ from "./DataTable.module.scss.mjs";
import { useDataProvider as mt } from "../dataProvider/DataProviderContext.mjs";
import ft from "../utils/hooks/useLatestRequest.mjs";
import gt from "../utils/hooks/useLatest.mjs";
import ht from "../utils/hooks/useUpdateEffect.mjs";
import bt from "../ui/Button/Button.mjs";
import { Table as Tt } from "../ui/Table/Table.mjs";
function Pt({
  resource: r,
  columns: C,
  locale: s,
  config: x,
  autoupdateTime: V
}) {
  var E;
  const { getList: R, reorderList: L } = mt(), [T, I] = h([]), u = (x == null ? void 0 : x.autoupdateTime) ?? V, [N, X] = h(!!u), { rowSelection: d, title: m, ...G } = x || {}, [_, H] = h([]), [A, J] = h([]), D = b(
    (t, e) => {
      var o;
      H(t), J(e), d && ((o = d.onSelectionChange) == null || o.call(d, t, e));
    },
    [d]
  ), [Q, v] = h(!1), [S, W] = h(), { urlState: i, setUrlState: K } = lt(), P = St(), U = b(() => {
    X((t) => !t);
  }, []), Y = w(() => {
    const t = Object.entries(i.sort);
    return t.length > 0 ? {
      columnKey: t[0][0],
      order: t[0][1]
    } : null;
  }, [i]), j = ft(), y = b(
    async (t, e) => {
      const o = j();
      v(!0);
      try {
        const [n, a] = Object.entries(e.sort)[0] || [], c = await R(t, {
          pagination: {
            perPage: Number(e.page_size) || 10,
            page: Number(e.page) || 1
          },
          ...n && a && { sort: { field: n, order: a } },
          filter: e.filter
        });
        o() && (I(c.items), W(c.meta.total));
      } catch (n) {
        console.error(`[Admiral] Failed to fetch "${t}":`, n);
      } finally {
        o() && v(!1);
      }
    },
    [R, j]
  ), F = b(
    async (t, e, o, n) => {
      await L(t, {
        data: {
          pagination: {
            perPage: e.page_size,
            page: e.page
          },
          ids: o,
          replaces: n
        }
      });
    },
    [L]
  ), O = gt(() => {
    y(r, i);
  }), f = b(() => O.current(), [O]);
  M(() => {
    y(r, i);
  }, [r, i, y]), ht(() => {
    P && f();
  }, [P, f]), M(() => {
    if (!u || !N)
      return;
    let t = !1, e;
    const o = async () => {
      await y(r, i), t || (e = setTimeout(o, u));
    };
    return e = setTimeout(o, u), () => {
      t = !0, clearTimeout(e);
    };
  }, [N, u, r, i, y]);
  const Z = (t, e, o) => {
    if (o.action === "paginate") {
      const { current: n, pageSize: a } = t;
      K({
        page: n ? String(n) : void 0,
        page_size: a ? String(a) : void 0
      });
    }
    if (o.action === "sort") {
      const { columnKey: n, order: a } = e, c = n && a ? { [String(n)]: a } : {};
      K((l) => ({ ...l, sort: c }));
    }
  }, tt = w(() => C.reduce((t, e) => {
    const o = Number(e.width);
    return isNaN(o) ? t + 200 : t + o;
  }, 0), [C]), et = b(
    ({ active: t, over: e }) => {
      const o = t == null ? void 0 : t.id, n = e == null ? void 0 : e.id, a = T, c = (l) => T.findIndex((g) => g.id == l);
      if (o && n && o != n) {
        const l = c(o), g = c(n), q = ut(T, l, g);
        I(q), F(
          r,
          i,
          q.map((st) => st.id),
          [o, n]
        ).catch(() => I(a));
      }
    },
    [T, i, F, r]
  ), k = (E = s == null ? void 0 : s.table) == null ? void 0 : E.autoRefreshButton, ot = w(() => {
    const t = {}, e = typeof d == "object", o = !!m, n = !!u, a = n ? N ? it : ct : null;
    return e || n ? (t.rowSelection = e ? {
      selectedRowKeys: _,
      onChange: D
    } : void 0, t.title = (c) => {
      const l = m == null ? void 0 : m(c), g = e ? d.render({ selectedRowKeys: _, selectedRows: A, refresh: f }) : null;
      return /* @__PURE__ */ z("header", { className: $.table__header, children: [
        /* @__PURE__ */ z("div", { children: [
          l,
          g || /* @__PURE__ */ p(B, {})
        ] }),
        a ? /* @__PURE__ */ z("div", { className: $.table__header_autoupdate, children: [
          /* @__PURE__ */ p("p", { children: k }),
          /* @__PURE__ */ p(
            bt,
            {
              onClick: U,
              view: "clear",
              size: "S",
              iconRight: /* @__PURE__ */ p(a, {})
            }
          )
        ] }) : /* @__PURE__ */ p(B, {})
      ] });
    }) : o && (t.title = m), t;
  }, [
    d,
    m,
    _,
    A,
    D,
    N,
    u,
    k,
    f,
    U
  ]), {
    total: nt = (t) => `Total ${t}`,
    ...at
  } = (s == null ? void 0 : s.pagination) ?? {}, rt = w(() => ({ refresh: f }), [f]);
  return /* @__PURE__ */ p(dt, { value: rt, children: /* @__PURE__ */ p(
    Tt,
    {
      ...G,
      ...ot,
      dataSource: T,
      rowKey: "id",
      columns: C,
      sorter: Y,
      scroll: {
        x: tt
      },
      sticky: !0,
      pagination: !!S && S > (Number(i.page_size) || 10) && {
        current: Number(i.page) || 1,
        pageSize: Number(i.page_size) || 10,
        total: S,
        showTotal: nt,
        showSizeChanger: !!S && S > 10,
        locale: at
      },
      loading: Q,
      onChange: Z,
      onDragEnd: et,
      locale: s == null ? void 0 : s.table
    }
  ) });
}
const St = () => {
  const r = pt().state;
  return w(() => {
    var s;
    return ((s = r == null ? void 0 : r.update) == null ? void 0 : s.dataTable) ?? !1;
  }, [r]);
};
export {
  Pt as DataTable
};
