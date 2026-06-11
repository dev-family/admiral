import { jsx as p } from "react/jsx-runtime";
import { useCallback as x } from "react";
import { useForm as F } from "../FormContext.mjs";
import { Form as b } from "../Form.mjs";
import j from "../../ui/Radio/RadioGroup.mjs";
const k = function({
  name: o,
  label: u,
  required: c,
  columnSpan: m,
  onChange: t,
  ...e
}) {
  var s;
  const { values: l, errors: a, options: f, setValues: r } = F(), d = l[o], n = (s = a[o]) == null ? void 0 : s[0], v = f[o], I = x(
    (i) => {
      r((R) => ({ ...R, [o]: i.target.value })), t == null || t(i.target.value);
    },
    [o, t, r]
  );
  return /* @__PURE__ */ p(b.Item, { label: u, required: c, error: n, columnSpan: m, children: /* @__PURE__ */ p(
    j,
    {
      options: v,
      ...e,
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
