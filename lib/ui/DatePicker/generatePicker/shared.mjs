import { jsx as o } from "react/jsx-runtime";
import { useImperativeHandle as l } from "react";
import a from "classnames";
import { AiFillCloseCircle as p } from "react-icons/ai";
import { FiChevronsRight as m, FiChevronsLeft as u, FiChevronRight as f, FiChevronLeft as v } from "react-icons/fi";
import d from "../../Button/Button.mjs";
const n = "admiral-picker", x = "admiral-picker-dropdown-slide-up", z = { clearIcon: /* @__PURE__ */ o(p, {}) }, t = (i) => /* @__PURE__ */ o(d, { component: "span", view: "clear", size: "S", iconLeft: i }), F = {
  prevIcon: t(/* @__PURE__ */ o(v, {})),
  nextIcon: t(/* @__PURE__ */ o(f, {})),
  superPrevIcon: t(/* @__PURE__ */ o(u, {})),
  superNextIcon: t(/* @__PURE__ */ o(m, {}))
};
function L(i) {
  const { size: r, alert: e, borderless: c, className: s } = i;
  return a(
    {
      [`${n}__SizeL`]: r === "L",
      [`${n}__SizeS`]: r === "S",
      [`${n}__SizeXS`]: r === "XS",
      [`${n}__Alert`]: e,
      [`${n}__Borderless`]: c
    },
    s
  );
}
function N(i, r) {
  l(i, () => ({
    focus: () => {
      var e;
      (e = r.current) == null || e.focus();
    },
    blur: () => {
      var e;
      (e = r.current) == null || e.blur();
    }
  }));
}
export {
  L as getPickerClassName,
  z as pickerAllowClear,
  x as pickerDropdownTransitionName,
  F as pickerNavigationIcons,
  n as pickerPrefixCls,
  N as usePickerImperativeHandle
};
