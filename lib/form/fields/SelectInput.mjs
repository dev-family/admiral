import { jsx as l, Fragment as k } from "react/jsx-runtime";
import { useCallback as m, useMemo as C } from "react";
import { useForm as H } from "../FormContext.mjs";
import { Form as L } from "../Form.mjs";
import { usePopupContainer as M } from "../../crud/PopupContainerContext.mjs";
import { Select as f } from "../../ui/Select/Select.mjs";
const { OptGroup: N, Option: R } = f, I = function({
  name: e,
  label: d,
  required: O = !1,
  columnSpan: v,
  children: r,
  onChange: n,
  ...S
}) {
  var a;
  const b = M(), { values: A, errors: F, options: g, setValues: x, locale: y } = H(), G = y.fields.select, i = A[e], c = (a = F[e]) == null ? void 0 : a[0], t = g[e], P = m(
    (o) => {
      x((s) => ({ ...s, [e]: o })), n == null || n(o);
    },
    [e, n]
  ), p = m(() => r || ((t == null ? void 0 : t.length) > 0 ? /* @__PURE__ */ l(k, { children: t.map(({ value: o, label: s }) => /* @__PURE__ */ l(u.Option, { value: o, children: s }, o)) }) : []), [r, t]), V = C(() => p(), [p]), h = r ? Array.isArray(r) ? r.length > 0 : !!r : (t == null ? void 0 : t.length) > 0, j = !!i && !h;
  return /* @__PURE__ */ l(L.Item, { label: d, required: O, error: c, columnSpan: v, children: /* @__PURE__ */ l(
    f,
    {
      getPopupContainer: b,
      ...S,
      locale: G,
      value: j ? void 0 : i,
      onChange: P,
      alert: !!c,
      children: V
    }
  ) });
};
I.inputName = "SelectInput";
const u = I;
u.Option = R;
u.OptGroup = N;
export {
  u as SelectInput
};
