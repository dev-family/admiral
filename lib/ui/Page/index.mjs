import { jsx as r, jsxs as t } from "react/jsx-runtime";
import { Typography as c } from "../Typography/index.mjs";
import e from "./Page.module.scss.mjs";
import m from "../Card/Card.mjs";
const { Title: l } = c;
function h({
  children: i,
  title: s,
  actions: a,
  topContent: o
}) {
  return /* @__PURE__ */ r("div", { className: e.page, children: /* @__PURE__ */ t(m, { className: e.card, children: [
    /* @__PURE__ */ r(l, { className: e.title, children: s }),
    o,
    /* @__PURE__ */ r("div", { className: e.actions, children: a }),
    /* @__PURE__ */ r("div", { children: i })
  ] }) });
}
export {
  h as Page
};
