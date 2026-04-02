import { jsx as i } from "react/jsx-runtime";
import { useState as d, useRef as S, useEffect as z, useCallback as B, useMemo as E } from "react";
import { useForm as L } from "../FormContext.mjs";
import { Form as M } from "../Form.mjs";
import { usePopupContainer as T } from "../../crud/PopupContainerContext.mjs";
import { useCrudIndex as V } from "../../crud/CrudIndexPageContext.mjs";
import { Select as _ } from "../../ui/Select/Select.mjs";
import { Spin as q } from "../../ui/Spin/Spin.mjs";
const D = function({
  name: t,
  label: x,
  required: h = !1,
  columnSpan: A,
  fetchOptions: C,
  fetchTimeout: c = 500,
  onChange: r,
  ...I
}) {
  var m;
  const j = T(), { filter: y } = V(), [F, u] = d([]), [p, f] = d(!1), s = S(!1), { values: O, errors: g, options: R, setValues: v } = L(), w = O[t], l = (m = g[t]) == null ? void 0 : m[0], n = R[t];
  z(() => {
    Array.isArray(n) && !s.current && u(n);
  }, [n]);
  const N = B(
    (o) => {
      v((e) => ({ ...e, [t]: o })), r && r(o);
    },
    [t, r]
  ), P = async (o = "") => {
    f(!0);
    const e = await C(t, o);
    s.current || (s.current = !0), u(e), y.setFilterOptions((k) => ({ ...k, [t]: e })), f(!1);
  }, a = S(void 0), b = E(
    () => (o) => {
      clearTimeout(a.current), a.current = setTimeout(() => P(o), c);
    },
    [c]
  );
  return /* @__PURE__ */ i(M.Item, { label: x, required: h, error: l, columnSpan: A, children: /* @__PURE__ */ i(
    _,
    {
      getPopupContainer: j,
      showSearch: !0,
      onSearch: b,
      loading: p,
      ...I,
      value: w,
      onChange: N,
      alert: !!l,
      filterOption: !1,
      options: F,
      notFoundContent: p ? /* @__PURE__ */ i(q, { size: "small" }) : null
    }
  ) });
};
D.inputName = "AjaxSelectInput";
export {
  D as AjaxSelectInput
};
