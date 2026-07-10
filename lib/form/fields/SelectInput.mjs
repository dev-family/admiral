import { jsx as l, Fragment as w } from "react/jsx-runtime";
import { useCallback as m, useMemo as C } from "react";
import { useForm as H } from "../FormContext.mjs";
import { Form as L } from "../Form.mjs";
import { usePopupContainer as M } from "../../crud/PopupContainerContext.mjs";
import { withFieldRules as N } from "../fieldRules.mjs";
import { Select as f } from "../../ui/Select/Select.mjs";
const { OptGroup: T, Option: d } = f, I = function({
  name: e,
  label: O,
  required: S = !1,
  columnSpan: F,
  children: r,
  onChange: n,
  ...i
}) {
  var a;
  const b = M(), { values: g, errors: h, options: A, setValues: x, locale: y } = H(), G = y.fields.select, s = g[e], p = (a = h[e]) == null ? void 0 : a[0], t = A[e], R = m(
    (o) => {
      x((u) => ({ ...u, [e]: o })), n == null || n(o);
    },
    [e, n]
  ), c = m(() => r || ((t == null ? void 0 : t.length) > 0 ? /* @__PURE__ */ l(w, { children: t.map(({ value: o, label: u }) => /* @__PURE__ */ l(d, { value: o, children: u }, o)) }) : []), [r, t]), V = C(() => c(), [c]), j = r ? Array.isArray(r) ? r.length > 0 : !!r : i.options && i.options.length > 0 ? !0 : (t == null ? void 0 : t.length) > 0, k = !!s && !j;
  return /* @__PURE__ */ l(L.Item, { label: O, required: S, error: p, columnSpan: F, children: /* @__PURE__ */ l(
    f,
    {
      getPopupContainer: b,
      ...i,
      locale: G,
      value: k ? void 0 : s,
      onChange: R,
      alert: !!p,
      children: V
    }
  ) });
};
I.inputName = "SelectInput";
const v = N(I);
v.Option = d;
v.OptGroup = T;
export {
  v as SelectInput
};
