import { jsx as t } from "react/jsx-runtime";
import { useRef as H } from "react";
import { FiClock as I, FiCalendar as S } from "react-icons/fi";
import { RangePicker as T } from "rc-picker";
import { getTimeProps as a } from "./getTimeProps.mjs";
import b from "../PickerButton.mjs";
import { usePickerImperativeHandle as z, pickerPrefixCls as F, pickerDropdownTransitionName as L, pickerAllowClear as j, pickerNavigationIcons as y, getPickerClassName as A } from "./shared.mjs";
import { enUS as B } from "../locales/enUS.mjs";
import { getPopupContainer as G } from "../../../utils/helpers/getPopupContainer.mjs";
const M = B;
function _(c) {
  function s(U, q) {
    function l({
      ref: m,
      ...e
    }) {
      const i = H(null);
      z(m, i);
      const {
        getPopupContainer: p,
        className: f,
        size: u,
        borderless: k = !1,
        alert: P,
        locale: d,
        separator: g = "",
        ...C
      } = e, w = { ...M, ...d }, { format: n, showTime: N, showHour: h, showMinute: R, showSecond: x, use12Hours: v } = e, D = {
        showNow: !0
      };
      let r = {};
      const o = e.picker;
      return r = {
        ...r,
        ...N ? a({ format: n, picker: o }) : {},
        ...o === "time" ? a({
          format: n,
          picker: o,
          showHour: h,
          showMinute: R,
          showSecond: x,
          use12Hours: v
        }) : {}
      }, /* @__PURE__ */ t(
        T,
        {
          ref: i,
          placeholder: e.placeholder || ["from", "to"],
          suffixIcon: o === "time" ? /* @__PURE__ */ t(I, {}) : /* @__PURE__ */ t(S, {}),
          separator: g,
          ...y,
          allowClear: j,
          transitionName: L,
          ...D,
          ...C,
          ...r,
          locale: w.lang,
          className: A({ size: u, alert: P, borderless: k, className: f }),
          prefixCls: F,
          getPopupContainer: p || G,
          generateConfig: c,
          components: { button: b }
        }
      );
    }
    return l;
  }
  return { DateRangePicker: s() };
}
export {
  _ as default
};
