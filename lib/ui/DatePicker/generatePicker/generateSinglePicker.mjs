import { jsx as i } from "react/jsx-runtime";
import { useRef as D } from "react";
import { FiClock as H, FiCalendar as I } from "react-icons/fi";
import R from "rc-picker";
import { getPlaceholder as j } from "../util.mjs";
import y from "../PickerButton.mjs";
import { getTimeProps as s } from "./getTimeProps.mjs";
import { usePickerImperativeHandle as z, pickerPrefixCls as F, pickerDropdownTransitionName as L, pickerAllowClear as S, pickerNavigationIcons as A, getPickerClassName as B } from "./shared.mjs";
import { enUS as G } from "../locales/enUS.mjs";
import { getPopupContainer as M } from "../../../utils/helpers/getPopupContainer.mjs";
const O = G;
function oe(l) {
  function m(q, E) {
    function p({
      ref: f,
      ...o
    }) {
      const n = D(null);
      z(f, n);
      const {
        getPopupContainer: u,
        className: k,
        size: P,
        borderless: d = !1,
        placeholder: C,
        alert: g,
        locale: w,
        ...h
      } = o, c = { ...O, ...w }, { format: a, showTime: r, showHour: N, showMinute: x, showSecond: T, use12Hours: b } = o, v = {
        showNow: !0
      };
      let t = {};
      const e = o.picker;
      return t = {
        ...t,
        ...r ? s({ format: a, picker: e, ...typeof r == "object" ? r : {} }) : {},
        ...e === "time" ? s({
          format: a,
          picker: e,
          showHour: N,
          showMinute: x,
          showSecond: T,
          use12Hours: b
        }) : {}
      }, /* @__PURE__ */ i(
        R,
        {
          ref: n,
          placeholder: j(e, c, C),
          suffixIcon: e === "time" ? /* @__PURE__ */ i(H, {}) : /* @__PURE__ */ i(I, {}),
          ...A,
          allowClear: S,
          transitionName: L,
          ...v,
          ...h,
          ...t,
          locale: c.lang,
          className: B({ size: P, alert: g, borderless: d, className: k }),
          prefixCls: F,
          getPopupContainer: u || M,
          generateConfig: l,
          components: { button: y }
        }
      );
    }
    return p;
  }
  return { DatePicker: m() };
}
export {
  oe as default
};
