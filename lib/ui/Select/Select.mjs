import { jsx as k } from "react/jsx-runtime";
import { useMemo as A, useCallback as B } from "react";
import R from "rc-util/lib/omit";
import m from "classnames";
import U, { Option as q, OptGroup as v } from "rc-select";
import D from "./utils/getIcons.mjs";
/* empty css             */
import { getPopupContainer as E } from "../../utils/helpers/getPopupContainer.mjs";
import { enUS as J } from "./locales/enUS.mjs";
const o = "select", K = J, Q = ({
  mode: r,
  borderless: a = !1,
  alert: f = !1,
  className: S,
  dropdownClassName: d,
  listHeight: _ = 254,
  size: e = "M",
  notFoundContent: I,
  style: g,
  virtual: $ = !0,
  dropdownMatchSelectWidth: L = !0,
  maxTagCount: i,
  getPopupContainer: C,
  loading: b,
  locale: N,
  onChange: c,
  ref: X,
  ...w
}) => {
  const x = { ...K, ...N }, p = r === "multiple" || r === "tags", y = /* @__PURE__ */ (function() {
    return e === "L" ? 48 : e === "S" ? 32 : e === "XS" ? 24 : 40;
  })(), M = I || x.notFound, { suffixIcon: O, itemIcon: P, removeIcon: F, clearIcon: h } = D({
    loading: b,
    multiple: p,
    prefixCls: o
  }), l = R(w, ["itemIcon"]), G = m(
    {
      [`${o}__SizeL`]: e === "L",
      [`${o}__SizeS`]: e === "S",
      [`${o}__SizeXS`]: e === "XS",
      [`${o}__Alert`]: f,
      [`${o}__Borderless`]: a,
      [`${o}__MaxTag`]: typeof i < "u"
    },
    S
  ), n = l.value, s = (t) => t || t === 0 || typeof t == "boolean" ? typeof t != "boolean" && Number.isInteger(+t) ? +t : t : void 0, H = A(
    () => n || typeof n == "boolean" ? p ? n.map(s) : s(n) : void 0,
    [n]
  ), V = B((t, j) => {
    c && c(t ?? null, j);
  }, [c]);
  return /* @__PURE__ */ k(
    U,
    {
      ref: X,
      virtual: $,
      style: g,
      dropdownMatchSelectWidth: L,
      maxTagCount: i,
      onChange: V,
      ...l,
      value: H,
      className: G,
      animation: "slide-up",
      listHeight: _,
      listItemHeight: y,
      mode: r,
      prefixCls: o,
      suffixIcon: O,
      menuItemSelectedIcon: P,
      removeIcon: F,
      clearIcon: h,
      notFoundContent: M,
      getPopupContainer: C || E,
      dropdownClassName: m(
        {
          [`${o}-dropdown__SizeL`]: e === "L",
          [`${o}-dropdown__SizeS`]: e === "S",
          [`${o}-dropdown__SizeXS`]: e === "XS"
        },
        d
      )
    }
  );
}, u = Q;
u.Option = q;
u.OptGroup = v;
export {
  u as Select
};
