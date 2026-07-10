import { jsx as r, jsxs as Z } from "react/jsx-runtime";
import G, { useMemo as w, useState as Ce, useCallback as U, useRef as be } from "react";
import V from "rc-table";
import N from "classnames";
import { convertChildrenToColumns as _e } from "rc-table/es/hooks/useColumns";
import we, { getSortData as De } from "./hooks/useSorter.mjs";
import Pe, { getPaginationParam as ve, DEFAULT_PAGE_SIZE as xe } from "./hooks/usePagination.mjs";
import Te from "./hooks/useSelection.mjs";
import ze from "./hooks/useLazyKVMap.mjs";
import o from "./Table.module.scss.mjs";
import { IoFileTrayOutline as Ne } from "react-icons/io5";
import { useSensors as Re, useSensor as Y, PointerSensor as Ie, KeyboardSensor as Ke, DndContext as Me, closestCenter as Ee, DragOverlay as Le } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as Oe } from "@dnd-kit/sortable";
import { useMergeRefs as We } from "@floating-ui/react";
import Ae from "./hooks/useTableSize.mjs";
import { enUS as ke } from "./locales/enUS.mjs";
import { DragHandle as He } from "../DragHandle/DragHandle.mjs";
import { Spin as je } from "../Spin/Spin.mjs";
import { DraggableRow as Fe } from "./components/DraggableRow.mjs";
import { DraggableWrapper as Be } from "./components/DraggableWrapper.mjs";
import { Pagination as Ge } from "../Pagination/Pagination.mjs";
const Ue = ke, Ve = [];
function Ye(i) {
  return null;
}
function Ze({
  ref: i,
  ...D
}) {
  const {
    className: q,
    style: R,
    dataSource: J,
    columns: I,
    size: d = "large",
    bordered: Q = !1,
    sortDirections: X,
    sorter: $,
    pagination: g,
    onChange: K,
    rowKey: u = "key",
    rowSelection: ee,
    expandable: te,
    loading: S,
    dndRows: c = !1,
    onDragEnd: y,
    children: M,
    locale: oe,
    showSorterTooltip: re = !0,
    title: E,
    footer: L,
    ...O
  } = D, P = J || Ve, h = { ...Ue, ...oe }, p = w(() => typeof u == "function" ? u : (e) => e == null ? void 0 : e[u], [u]), [ne] = ze(P, p);
  let v;
  typeof S == "boolean" ? v = {
    spinning: S
  } : typeof S == "object" && (v = {
    spinning: !0,
    ...S
  });
  const ae = w(() => I || _e(M), [M, I]), m = {}, W = (e, n) => {
    const t = {
      ...m,
      ...e
    };
    K && K(t.pagination, t.sorter, { action: n });
  }, se = (e) => {
    W(
      {
        sorter: e
      },
      "sort"
    );
  }, [ie, A, le] = we({
    mergedColumns: ae,
    onSorterChange: se,
    sortDirections: X || ["asc", "desc"],
    controlledSorter: $,
    tableLocale: h,
    showSorterTooltip: re
  });
  m.sorter = le();
  const s = G.useMemo(() => De(P, A), [P, A]), ce = (e, n) => {
    W({ pagination: { ...m.pagination, current: e, pageSize: n } }, "paginate");
  }, [a, pe] = Pe(
    s.length,
    g,
    ce
  );
  m.pagination = ve(a), m.resetPagination = pe;
  const C = G.useMemo(() => {
    if (g === !1 || !a.pageSize)
      return s;
    const { current: e = 1, total: n, pageSize: t = xe } = a;
    return s.length < n ? s.length > t ? s.slice((e - 1) * t, e * t) : s : s.slice((e - 1) * t, e * t);
  }, [!!g, s, a]), [me] = Te(ee, {
    prefixCls: "admiral-table",
    pageData: C,
    getRowKey: p,
    getRecordByKey: ne
  }), x = me(ie);
  let k, b;
  if (g !== !1 && (a != null && a.total)) {
    const e = (l, f) => /* @__PURE__ */ r(
      "div",
      {
        className: N(o.pagination, {
          [o.pagination__PosLeft]: l === "left",
          [o.pagination__PosCenter]: l === "center",
          [o.pagination__SizeSmall]: f
        }),
        children: /* @__PURE__ */ r(Ge, { ...a })
      }
    ), n = "right", { position: t, size: he } = a, _ = he === "small";
    if (Array.isArray(t)) {
      const l = t.find((z) => z.indexOf("top") !== -1), f = t.find((z) => z.indexOf("bottom") !== -1);
      !l && !f && (b = e(n, _)), l && (k = e(
        l.toLowerCase().replace("top", ""),
        _
      )), f && (b = e(
        f.toLowerCase().replace("bottom", ""),
        _
      ));
    } else
      b = e(n, _);
  }
  const [T, H] = Ce(null), fe = U((e) => {
    const { active: n } = e;
    H(String(n.id));
  }, []), de = U(
    (e) => {
      H(null), y == null || y(e);
    },
    [y]
  ), j = w(
    () => c ? [
      {
        key: "dragHandle",
        dataIndex: "dragHandle",
        width: d === "large" ? 64 : 48,
        render: () => /* @__PURE__ */ r(He, {})
      },
      ...x
    ] : x,
    [x, c, d]
  ), ge = Re(
    Y(Ie),
    Y(Ke, { coordinateGetter: Oe })
  ), F = be(null), ue = We([i ?? null, F]), Se = Ae(F), ye = w(() => c ? C.filter((e) => p(e) == T) : [], [c, C, T]), B = N(o.wrapper, q, {
    [o.wrapper__SizeMiddle]: d === "middle",
    [o.wrapper__SizeSmall]: d === "small",
    [o.wrapper__Bordered]: Q,
    [o.wrapper__WithTitle]: !!E,
    [o.wrapper__WithFooter]: !!L
  });
  return /* @__PURE__ */ r(
    Me,
    {
      sensors: ge,
      collisionDetection: Ee,
      onDragEnd: de,
      onDragStart: fe,
      children: /* @__PURE__ */ r("div", { ref: ue, className: B, style: R, children: /* @__PURE__ */ Z(je, { spinning: !1, ...v, children: [
        k,
        /* @__PURE__ */ r(
          V,
          {
            ...O,
            title: E,
            footer: L,
            expandable: te ?? {},
            prefixCls: "admiral-table",
            columns: j,
            data: C,
            rowKey: p,
            emptyText: /* @__PURE__ */ r(qe, { emptyText: h == null ? void 0 : h.emptyText }),
            ...c && {
              components: {
                body: {
                  wrapper: Be,
                  row: Fe
                }
              }
            }
          }
        ),
        /* @__PURE__ */ r(Le, { children: T ? /* @__PURE__ */ r(
          "div",
          {
            className: N(B, o.wrapper__DndOverlay),
            style: R,
            children: /* @__PURE__ */ r(
              V,
              {
                scroll: O.scroll,
                prefixCls: "admiral-table",
                data: ye,
                rowKey: p,
                columns: j,
                style: Se,
                showHeader: !1,
                sticky: !0
              }
            )
          }
        ) : null }),
        b
      ] }) })
    }
  );
}
function qe({ emptyText: i }) {
  const D = typeof i == "function" ? i() : i;
  return /* @__PURE__ */ Z("div", { className: o.empty, children: [
    /* @__PURE__ */ r(Ne, {}),
    /* @__PURE__ */ r("div", { children: D })
  ] });
}
const Je = Ze;
Je.Column = Ye;
export {
  Je as Table
};
