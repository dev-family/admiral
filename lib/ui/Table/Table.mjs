import { jsx as r, jsxs as Y } from "react/jsx-runtime";
import U, { useMemo as w, useState as ye, useCallback as G, useRef as he } from "react";
import V from "rc-table";
import N from "classnames";
import { convertChildrenToColumns as Ce } from "rc-table/es/hooks/useColumns";
import _e, { getSortData as we } from "./hooks/useSorter.mjs";
import be, { getPaginationParam as De, DEFAULT_PAGE_SIZE as Pe } from "./hooks/usePagination.mjs";
import ve from "./hooks/useSelection.mjs";
import xe from "./hooks/useLazyKVMap.mjs";
import o from "./Table.module.scss.mjs";
import { IoFileTrayOutline as Te } from "react-icons/io5";
import { useSensors as ze, useSensor as Ne, PointerSensor as Re, DndContext as Ie, closestCenter as Me, DragOverlay as Ee } from "@dnd-kit/core";
import { useMergeRefs as Ke } from "@floating-ui/react";
import Le from "./hooks/useTableSize.mjs";
import { enUS as Oe } from "./locales/enUS.mjs";
import { DragHandle as We } from "../DragHandle/DragHandle.mjs";
import { Spin as Ae } from "../Spin/Spin.mjs";
import { DraggableRow as ke } from "./components/DraggableRow.mjs";
import { DraggableWrapper as He } from "./components/DraggableWrapper.mjs";
import { Pagination as je } from "../Pagination/Pagination.mjs";
const Fe = Oe, Be = [];
function Ue(i) {
  return null;
}
function Ge({
  ref: i,
  ...b
}) {
  const {
    className: Z,
    style: R,
    dataSource: q,
    columns: I,
    size: D = "large",
    bordered: J = !1,
    sortDirections: Q,
    sorter: X,
    pagination: f,
    onChange: M,
    rowKey: d = "key",
    rowSelection: $,
    loading: g,
    dndRows: u = !1,
    onDragEnd: S,
    children: E,
    locale: ee,
    showSorterTooltip: te = !0,
    title: K,
    footer: L,
    ...O
  } = b, P = q || Be, y = { ...Fe, ...ee }, c = w(() => typeof d == "function" ? d : (e) => e == null ? void 0 : e[d], [d]), [oe] = xe(P, c);
  let v;
  typeof g == "boolean" ? v = {
    spinning: g
  } : typeof g == "object" && (v = {
    spinning: !0,
    ...g
  });
  const re = w(() => I || Ce(E), [E, I]), p = {}, W = (e, n) => {
    const t = {
      ...p,
      ...e
    };
    M && M(t.pagination, t.sorter, { action: n });
  }, ne = (e) => {
    W(
      {
        sorter: e
      },
      "sort"
    );
  }, [ae, A, se] = _e({
    mergedColumns: re,
    onSorterChange: ne,
    sortDirections: Q || ["asc", "desc"],
    controlledSorter: X,
    tableLocale: y,
    showSorterTooltip: te
  });
  p.sorter = se();
  const s = U.useMemo(() => we(P, A), [P, A]), ie = (e, n) => {
    W({ pagination: { ...p.pagination, current: e, pageSize: n } }, "paginate");
  }, [a, le] = be(
    s.length,
    f,
    ie
  );
  p.pagination = De(a), p.resetPagination = le;
  const h = U.useMemo(() => {
    if (f === !1 || !a.pageSize)
      return s;
    const { current: e = 1, total: n, pageSize: t = Pe } = a;
    return s.length < n ? s.length > t ? s.slice((e - 1) * t, e * t) : s : s.slice((e - 1) * t, e * t);
  }, [!!f, s, a]), [ce] = ve($, {
    prefixCls: "admiral-table",
    pageData: h,
    getRowKey: c,
    getRecordByKey: oe
  }), x = ce(ae);
  let k, C;
  if (f !== !1 && (a != null && a.total)) {
    const e = (l, m) => /* @__PURE__ */ r(
      "div",
      {
        className: N(o.pagination, {
          [o.pagination__PosLeft]: l === "left",
          [o.pagination__PosCenter]: l === "center",
          [o.pagination__SizeSmall]: m
        }),
        children: /* @__PURE__ */ r(je, { ...a })
      }
    ), n = "right", { position: t, size: Se } = a, _ = Se === "small";
    if (Array.isArray(t)) {
      const l = t.find((z) => z.indexOf("top") !== -1), m = t.find((z) => z.indexOf("bottom") !== -1);
      !l && !m && (C = e(n, _)), l && (k = e(
        l.toLowerCase().replace("top", ""),
        _
      )), m && (C = e(
        m.toLowerCase().replace("bottom", ""),
        _
      ));
    } else
      C = e(n, _);
  }
  const [T, H] = ye(null), pe = G((e) => {
    const { active: n } = e;
    H(String(n.id));
  }, []), me = G(
    (e) => {
      H(null), S == null || S(e);
    },
    [S]
  ), j = w(
    () => u ? [
      {
        key: "dragHandle",
        dataIndex: "dragHandle",
        width: D === "large" ? 64 : 48,
        render: () => /* @__PURE__ */ r(We, {})
      },
      ...x
    ] : x,
    [x]
  ), fe = ze(Ne(Re)), F = he(null), de = Ke([i ?? null, F]), ge = Le(F), ue = w(() => u ? h.filter((e) => c(e) == T) : [], [u, h, T]), B = N(o.wrapper, Z, {
    [o.wrapper__SizeMiddle]: D === "middle",
    [o.wrapper__SizeSmall]: D === "small",
    [o.wrapper__Bordered]: J,
    [o.wrapper__WithTitle]: !!K,
    [o.wrapper__WithFooter]: !!L
  });
  return /* @__PURE__ */ r(
    Ie,
    {
      sensors: fe,
      collisionDetection: Me,
      onDragEnd: me,
      onDragStart: pe,
      children: /* @__PURE__ */ r("div", { ref: de, className: B, style: R, children: /* @__PURE__ */ Y(Ae, { spinning: !1, ...v, children: [
        k,
        /* @__PURE__ */ r(
          V,
          {
            ...O,
            title: K,
            footer: L,
            expandable: {},
            prefixCls: "admiral-table",
            columns: j,
            data: h,
            rowKey: c,
            emptyText: /* @__PURE__ */ r(Ve, { emptyText: y == null ? void 0 : y.emptyText }),
            ...u && {
              components: {
                body: {
                  wrapper: He,
                  row: ke
                }
              }
            }
          }
        ),
        /* @__PURE__ */ r(Ee, { children: T ? /* @__PURE__ */ r(
          "div",
          {
            className: N(B, o.wrapper__DndOverlay),
            style: R,
            children: /* @__PURE__ */ r(
              V,
              {
                scroll: O.scroll,
                prefixCls: "admiral-table",
                data: ue,
                rowKey: c,
                columns: j,
                style: ge,
                showHeader: !1,
                sticky: !0
              }
            )
          }
        ) : null }),
        C
      ] }) })
    }
  );
}
function Ve({ emptyText: i }) {
  const b = typeof i == "function" ? i() : i;
  return /* @__PURE__ */ Y("div", { className: o.empty, children: [
    /* @__PURE__ */ r(Te, {}),
    /* @__PURE__ */ r("div", { children: b })
  ] });
}
const Ye = Ge;
Ye.Column = Ue;
export {
  Ye as Table
};
