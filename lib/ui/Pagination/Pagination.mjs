import { jsx as n, jsxs as s } from "react/jsx-runtime";
import m from "rc-pagination";
import t from "./Pagination.module.scss.mjs";
import { FiChevronLeft as p, FiChevronRight as u, FiChevronsLeft as d, FiChevronsRight as f } from "react-icons/fi";
import h from "classnames";
import { createSizeChangerRender as b } from "./PaginationSelect.mjs";
import { enUS as g } from "./locales/enUS.mjs";
const x = (r, e, a) => {
  const o = /* @__PURE__ */ n("span", { className: t.control_Ellipsis, children: "•••" });
  return e === "page" ? /* @__PURE__ */ n("button", { className: t.page, type: "button", tabIndex: -1, children: r }) : e === "prev" ? /* @__PURE__ */ n("button", { className: t.control, type: "button", tabIndex: -1, children: /* @__PURE__ */ n(p, {}) }) : e === "next" ? /* @__PURE__ */ n("button", { className: t.control, type: "button", tabIndex: -1, children: /* @__PURE__ */ n(u, {}) }) : e === "jump-prev" ? /* @__PURE__ */ s("button", { type: "button", tabIndex: -1, className: t.control, children: [
    /* @__PURE__ */ n("span", { className: t.control_Icon, children: /* @__PURE__ */ n(d, {}) }),
    o
  ] }) : e === "jump-next" ? /* @__PURE__ */ s("button", { type: "button", tabIndex: -1, className: t.control, children: [
    /* @__PURE__ */ n("span", { className: t.control_Icon, children: /* @__PURE__ */ n(f, {}) }),
    o
  ] }) : a;
}, N = g, F = ({ size: r, className: e, locale: a, ...o }) => {
  const l = { ...N, ...a }, i = r === "small", c = h(
    t.pagination,
    {
      [t.pagination__Small]: i
    },
    e
  );
  return /* @__PURE__ */ n(
    m,
    {
      ...o,
      prefixCls: "pagination",
      className: c,
      locale: l,
      itemRender: x,
      sizeChangerRender: b(i ? "XS" : "S")
    }
  );
};
export {
  F as Pagination
};
