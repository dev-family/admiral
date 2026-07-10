import { jsx as u } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as M } from "../FormContext.mjs";
import { Form as F } from "../Form.mjs";
import { withFieldRules as d } from "../fieldRules.mjs";
import b from "../../ui/Textarea/Textarea.mjs";
const s = function({
  name: t,
  label: m,
  required: p,
  columnSpan: c,
  onChange: r,
  ...n
}) {
  var i;
  const { values: a, errors: f, setValues: e } = M(), x = a[t], o = (i = f[t]) == null ? void 0 : i[0], I = v(
    (l) => {
      e((T) => ({ ...T, [t]: l.target.value })), r == null || r(l.target.value);
    },
    [t, r, e]
  );
  return /* @__PURE__ */ u(F.Item, { label: m, required: p, error: o, columnSpan: c, children: /* @__PURE__ */ u(
    b,
    {
      ...n,
      name: t,
      value: x,
      onChange: I,
      alert: !!o
    }
  ) });
};
s.inputName = "MultilineTextInput";
const _ = d(s);
export {
  _ as MultilineTextInput
};
