import { jsx as i } from "react/jsx-runtime";
import m from "react";
import l from "rc-tabs";
import { FiMoreHorizontal as f } from "react-icons/fi";
import u from "classnames";
import t from "./Tabs.module.scss.mjs";
import { getPopupContainer as _ } from "../../utils/helpers/getPopupContainer.mjs";
function d(o) {
  return null;
}
function C(o) {
  const e = [];
  return m.Children.forEach(o, (r) => {
    if (!m.isValidElement(r)) return;
    const {
      tab: a,
      children: s,
      ...n
    } = r.props;
    e.push({
      key: r.key ?? "",
      label: a,
      children: s,
      ...n
    });
  }), e;
}
function T({
  type: o,
  className: e,
  size: r,
  centered: a,
  columnSpan: s = 1,
  children: n,
  items: p,
  ...b
}) {
  const c = p ?? (n ? C(n) : void 0);
  return /* @__PURE__ */ i(
    l,
    {
      ...b,
      items: c,
      className: u(
        t.tabs,
        {
          [t.tabs__Card]: o === "card",
          [t.tabs__Centered]: a,
          [t.tabs__SizeS]: r === "S",
          [t.tabs__SizeL]: r === "L",
          [t.tabs__ColumnSpanTwo]: s === 2
        },
        e
      ),
      more: { icon: /* @__PURE__ */ i(f, {}) },
      prefixCls: "tabs",
      getPopupContainer: _
    }
  );
}
const S = T;
S.TabPane = d;
export {
  S as Tabs
};
