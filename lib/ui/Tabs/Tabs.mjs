import { jsx as t } from "react/jsx-runtime";
import n from "rc-tabs";
import { FiMoreHorizontal as p } from "react-icons/fi";
import _ from "classnames";
import o from "./Tabs.module.scss.mjs";
import { getPopupContainer as b } from "../../utils/helpers/getPopupContainer.mjs";
function d({ type: a, className: m, size: r, centered: s, columnSpan: e = 1, ...i }) {
  return /* @__PURE__ */ t(
    n,
    {
      ...i,
      className: _(
        o.tabs,
        {
          [o.tabs__Card]: a === "card",
          [o.tabs__Centered]: s,
          [o.tabs__SizeS]: r === "S",
          [o.tabs__SizeL]: r === "L",
          [o.tabs__ColumnSpanTwo]: e === 2
        },
        m
      ),
      more: { icon: /* @__PURE__ */ t(p, {}) },
      prefixCls: "tabs",
      getPopupContainer: b
    }
  );
}
export {
  d as Tabs
};
