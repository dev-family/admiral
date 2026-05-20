import { jsx as e } from "react/jsx-runtime";
import { useRef as F, useImperativeHandle as I } from "react";
import f from "classnames";
import { FiChevronsRight as x, FiChevronsLeft as N, FiChevronRight as R, FiChevronLeft as $, FiClock as b, FiCalendar as B } from "react-icons/fi";
import { AiFillCloseCircle as A } from "react-icons/ai";
import D from "rc-picker";
import { getPlaceholder as T } from "../util.mjs";
import X from "../PickerButton.mjs";
import { getTimeProps as u } from "./getTimeProps.mjs";
import { enUS as j } from "../locales/enUS.mjs";
import { getPopupContainer as y } from "../../../utils/helpers/getPopupContainer.mjs";
import n from "../../Button/Button.mjs";
const G = j;
function re(d) {
  function P(O, U) {
    function k({
      ref: C,
      ...i
    }) {
      const c = F(null);
      I(C, () => ({
        focus: () => {
          var t;
          (t = c.current) == null || t.focus();
        },
        blur: () => {
          var t;
          (t = c.current) == null || t.blur();
        }
      }));
      const {
        getPopupContainer: v,
        className: S,
        size: a,
        borderless: g = !1,
        placeholder: h,
        alert: L,
        locale: _,
        ...w
      } = i, s = { ...G, ..._ }, { format: p, showTime: m } = i, o = f("admiral-picker"), z = {
        showNow: !0
      };
      let l = {};
      const r = i.picker;
      return l = {
        ...l,
        ...m ? u({ format: p, picker: r, ...m }) : {},
        ...r === "time" ? u({ format: p, ...i, picker: r }) : {}
      }, /* @__PURE__ */ e(
        D,
        {
          ref: c,
          placeholder: T(r, s, h),
          suffixIcon: r === "time" ? /* @__PURE__ */ e(b, {}) : /* @__PURE__ */ e(B, {}),
          prevIcon: /* @__PURE__ */ e(
            n,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e($, {})
            }
          ),
          nextIcon: /* @__PURE__ */ e(
            n,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e(R, {})
            }
          ),
          superPrevIcon: /* @__PURE__ */ e(
            n,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e(N, {})
            }
          ),
          superNextIcon: /* @__PURE__ */ e(
            n,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e(x, {})
            }
          ),
          allowClear: { clearIcon: /* @__PURE__ */ e(A, {}) },
          transitionName: "admiral-picker-dropdown-slide-up",
          ...z,
          ...w,
          ...l,
          locale: s.lang,
          className: f(
            {
              [`${o}__SizeL`]: a === "L",
              [`${o}__SizeS`]: a === "S",
              [`${o}__SizeXS`]: a === "XS",
              [`${o}__Alert`]: L,
              [`${o}__Borderless`]: g
            },
            S
          ),
          prefixCls: o,
          getPopupContainer: v || y,
          generateConfig: d,
          components: { button: X }
        }
      );
    }
    return k;
  }
  return { DatePicker: P() };
}
export {
  re as default
};
