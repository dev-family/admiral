import { jsx as e } from "react/jsx-runtime";
import { useRef as w, useImperativeHandle as F } from "react";
import m from "classnames";
import { FiChevronsRight as I, FiChevronsLeft as x, FiChevronRight as N, FiChevronLeft as $, FiClock as b, FiCalendar as B } from "react-icons/fi";
import { AiFillCloseCircle as A } from "react-icons/ai";
import { RangePicker as D } from "rc-picker";
import { getRangeTimeProps as f } from "./getRangeTimeProps.mjs";
import T from "../PickerButton.mjs";
import { enUS as X } from "../locales/enUS.mjs";
import { getPopupContainer as j } from "../../../utils/helpers/getPopupContainer.mjs";
import i from "../../Button/Button.mjs";
const y = X;
function ee(u) {
  function P(H, O) {
    function d({
      ref: g,
      ...r
    }) {
      const c = w(null);
      F(g, () => ({
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
        getPopupContainer: k,
        className: C,
        size: a,
        borderless: S = !1,
        alert: v,
        locale: h,
        separator: L = "",
        ..._
      } = r, z = { ...y, ...h }, { format: l, showTime: p } = r, o = m("admiral-picker"), R = {
        showNow: !0
      };
      let s = {};
      const n = r.picker;
      return s = {
        ...s,
        ...p ? f({ format: l, picker: n, ...p }) : {},
        ...n === "time" ? f({ format: l, ...r, picker: n }) : {}
      }, /* @__PURE__ */ e(
        D,
        {
          ref: c,
          placeholder: r.placeholder || ["from", "to"],
          suffixIcon: n === "time" ? /* @__PURE__ */ e(b, {}) : /* @__PURE__ */ e(B, {}),
          separator: L,
          prevIcon: /* @__PURE__ */ e(
            i,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e($, {})
            }
          ),
          nextIcon: /* @__PURE__ */ e(
            i,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e(N, {})
            }
          ),
          superPrevIcon: /* @__PURE__ */ e(
            i,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e(x, {})
            }
          ),
          superNextIcon: /* @__PURE__ */ e(
            i,
            {
              component: "span",
              view: "clear",
              size: "S",
              iconLeft: /* @__PURE__ */ e(I, {})
            }
          ),
          allowClear: { clearIcon: /* @__PURE__ */ e(A, {}) },
          ...R,
          ..._,
          ...s,
          locale: z.lang,
          className: m(
            {
              [`${o}__SizeL`]: a === "L",
              [`${o}__SizeS`]: a === "S",
              [`${o}__SizeXS`]: a === "XS",
              [`${o}__Alert`]: v,
              [`${o}__Borderless`]: S
            },
            C
          ),
          prefixCls: o,
          getPopupContainer: k || j,
          generateConfig: u,
          components: { button: T }
        }
      );
    }
    return d;
  }
  return { DateRangePicker: P() };
}
export {
  ee as default
};
