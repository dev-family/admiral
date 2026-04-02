import { jsx as i } from "react/jsx-runtime";
import { useCallback as x } from "react";
import { useForm as F } from "../FormContext.mjs";
import { Form as b } from "../Form.mjs";
import j from "../../ui/Radio/RadioGroup.mjs";
const k = function({
  name: o,
  label: p,
  required: u,
  columnSpan: c,
  onChange: t,
  ...m
}) {
  var r;
  const { values: e, errors: l, options: a, setValues: f } = F(), d = e[o], n = (r = l[o]) == null ? void 0 : r[0], v = a[o], I = x(
    (s) => {
      f((R) => ({ ...R, [o]: s.target.value })), t == null || t(s.target.value);
    },
    [o, t]
  );
  return /* @__PURE__ */ i(b.Item, { label: p, required: u, error: n, columnSpan: c, children: /* @__PURE__ */ i(
    j,
    {
      options: v,
      ...m,
      name: o,
      value: d,
      onChange: I
    }
  ) });
};
k.inputName = "RadioInput";
export {
  k as RadioInput
};
