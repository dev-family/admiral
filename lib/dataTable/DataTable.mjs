import { jsxs as v, jsx as l, Fragment as k } from "react/jsx-runtime";
import { useState as h, useRef as B, useCallback as z, useMemo as w, useEffect as F } from "react";
import { FaPause as it, FaPlay as dt } from "react-icons/fa";
import { DataTableContextProvider as ct } from "./DataTableContext.mjs";
import { arrayMove as ut } from "@dnd-kit/sortable";
import { useCrudIndex as lt } from "../crud/CrudIndexPageContext.mjs";
import { useTopLocation as pt } from "../router/index.mjs";
import E from "./DataTable.module.scss.mjs";
import { Table as ft } from "../ui/Table/Table.mjs";
import { useDataProvider as gt } from "../dataProvider/DataProviderContext.mjs";
import ht from "../ui/Button/Button.mjs";
function Rt({
  resource: r,
  columns: y,
  locale: i,
  config: c,
  autoupdateTime: C
}) {
  const { getList: M, reorderList: $ } = gt(), [m, I] = h([]), [S, V] = h(!!(c != null && c.autoupdateTime)), { rowSelection: d, title: p, ...X } = c || {}, [D, q] = h([]), [K, G] = h([]), H = B(!0), N = z(
    (t, e) => {
      var n;
      q(t), G(e), d && ((n = d.onSelectionChange) == null || n.call(d, t, e));
    },
    [d]
  ), [J, P] = h(!1), [T, Q] = h(), { urlState: a, setUrlState: j } = lt(), L = mt(), W = () => {
    V((t) => !t);
  }, Y = w(() => {
    const t = Object.entries(a.sort);
    return t.length > 0 ? {
      columnKey: t[0][0],
      order: t[0][1]
    } : null;
  }, [a]);
  async function x(t, e) {
    P(!0);
    try {
      const [n, o] = Object.entries(e.sort)[0] || [], s = await M(t, {
        pagination: { perPage: +e.page_size, page: +e.page },
        ...n && o && { sort: { field: n, order: o } },
        filter: e.filter
      });
      I(s.items), Q(s.meta.total);
    } catch (n) {
      console.error(`[Admiral] Failed to fetch "${t}":`, n);
    }
    P(!1);
  }
  async function O(t, e, n, o) {
    await $(t, {
      data: {
        pagination: {
          perPage: e.page_size,
          page: e.page
        },
        ids: n,
        replaces: o
      }
    });
  }
  const _ = z(() => {
    x(r, a);
  }, [r, a, x]);
  F(() => {
    C && S && H.current || x(r, a);
  }, [r, a]), F(() => {
    L && _();
  }, [L]);
  const R = B(void 0), U = () => {
    R.current && clearTimeout(R.current);
  }, A = z(async () => {
    await x(r, a), U(), R.current = setTimeout(A, C);
  }, [r, a, C]);
  F(() => (C && S && A(), () => {
    U();
  }), [S, A]);
  const Z = (t, e, n) => {
    if (n.action === "paginate") {
      const { current: o, pageSize: s } = t;
      j({
        page: o ? String(o) : void 0,
        page_size: s ? String(s) : void 0
      });
    }
    if (n.action === "sort") {
      const { columnKey: o, order: s } = e, f = o && s ? { sort: { [String(o)]: s } } : { sort: {} };
      j((u) => ({ ...u, sort: f }));
    }
  }, tt = w(() => y.reduce((t, e) => {
    const n = Number(e.width);
    return isNaN(n) ? t + 200 : t + n;
  }, 0), [y]), et = z(
    ({ active: t, over: e }) => {
      const n = t == null ? void 0 : t.id, o = e == null ? void 0 : e.id, s = m, f = (u) => m.findIndex((g) => g.id == u);
      if (n && o && n != o) {
        const u = f(n), g = f(o), b = ut(m, u, g);
        I(b), O(
          r,
          a,
          b.map((st) => st.id),
          [n, o]
        ).catch(() => I(s));
      }
    },
    [m, a, O, r]
  ), nt = w(() => {
    const t = {}, e = typeof d == "object", n = !!p, o = !!(c != null && c.autoupdateTime), s = o ? S ? it : dt : null;
    return e || o ? (t.rowSelection = e ? {
      selectedRowKeys: D,
      onChange: N
    } : void 0, t.title = (f) => {
      var b;
      const u = p == null ? void 0 : p(f), g = e ? d.render({ selectedRowKeys: D, selectedRows: K, refresh: _ }) : null;
      return /* @__PURE__ */ v("header", { className: E.table__header, children: [
        /* @__PURE__ */ v("div", { children: [
          u,
          g || /* @__PURE__ */ l(k, {})
        ] }),
        s ? /* @__PURE__ */ v("div", { className: E.table__header_autoupdate, children: [
          /* @__PURE__ */ l("p", { children: (b = i == null ? void 0 : i.table) == null ? void 0 : b.autoRefreshButton }),
          /* @__PURE__ */ l(
            ht,
            {
              onClick: W,
              view: "clear",
              size: "S",
              iconRight: /* @__PURE__ */ l(s, {})
            }
          )
        ] }) : /* @__PURE__ */ l(k, {})
      ] });
    }) : n && (t.title = p), t;
  }, [d, p, D, K, N, S]), {
    total: ot = (t) => `Total ${t}`,
    ...rt
  } = (i == null ? void 0 : i.pagination) ?? {}, at = w(() => ({ refresh: _ }), [_]);
  return /* @__PURE__ */ l(ct, { value: at, children: /* @__PURE__ */ l(
    ft,
    {
      ...X,
      ...nt,
      dataSource: m,
      rowKey: "id",
      columns: y,
      sorter: Y,
      scroll: {
        x: tt
      },
      sticky: !0,
      pagination: !!T && T > +a.page_size && {
        current: +a.page,
        pageSize: +a.page_size,
        total: T,
        showTotal: ot,
        showSizeChanger: !!T && T > 10,
        locale: rt
      },
      loading: J,
      onChange: Z,
      onDragEnd: et,
      locale: i == null ? void 0 : i.table
    }
  ) });
}
const mt = () => {
  const r = pt().state;
  return w(() => {
    var i;
    return ((i = r == null ? void 0 : r.update) == null ? void 0 : i.dataTable) ?? !1;
  }, [r]);
};
export {
  Rt as DataTable
};
