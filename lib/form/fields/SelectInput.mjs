import { jsx as l, Fragment as k } from "react/jsx-runtime";
import { useCallback as a, useMemo as w } from "react";
import { useForm as C } from "../FormContext.mjs";
import { Form as H } from "../Form.mjs";
import { usePopupContainer as L } from "../../crud/PopupContainerContext.mjs";
import { withFieldRules as M } from "../fieldRules.mjs";
import { Select as m } from "../../ui/Select/Select.mjs";
const { OptGroup: N, Option: f } = m, d = function({
  name: e,
  label: v,
  required: O = !1,
  columnSpan: S,
  children: r,
  onChange: n,
  ...F
}) {
  var p;
  const b = L(), { values: A, errors: g, options: h, setValues: x, locale: y } = C(), G = y.fields.select, i = A[e], u = (p = g[e]) == null ? void 0 : p[0], t = h[e], P = a(
    (o) => {
      x((s) => ({ ...s, [e]: o })), n == null || n(o);
    },
    [e, n]
  ), c = a(() => r || ((t == null ? void 0 : t.length) > 0 ? /* @__PURE__ */ l(k, { children: t.map(({ value: o, label: s }) => /* @__PURE__ */ l(f, { value: o, children: s }, o)) }) : []), [r, t]), R = w(() => c(), [c]), V = r ? Array.isArray(r) ? r.length > 0 : !!r : (t == null ? void 0 : t.length) > 0, j = !!i && !V;
  return /* @__PURE__ */ l(H.Item, { label: v, required: O, error: u, columnSpan: S, children: /* @__PURE__ */ l(
    m,
    {
      getPopupContainer: b,
      ...F,
      locale: G,
      value: j ? void 0 : i,
      onChange: P,
      alert: !!u,
      children: R
    }
  ) });
};
d.inputName = "SelectInput";
const I = M(d);
I.Option = f;
I.OptGroup = N;
export {
  I as SelectInput
};
