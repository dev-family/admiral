import { jsx as p } from "react/jsx-runtime";
import { useCallback as x } from "react";
import { useForm as b } from "../FormContext.mjs";
import { Form as j } from "../Form.mjs";
import { withFieldRules as k } from "../fieldRules.mjs";
import w from "../../ui/Radio/RadioGroup.mjs";
const u = function({
  name: o,
  label: e,
  required: m,
  columnSpan: c,
  onChange: t,
  ...l
}) {
  var s;
  const { values: a, errors: d, options: f, setValues: r } = b(), n = a[o], R = (s = d[o]) == null ? void 0 : s[0], I = f[o], v = x(
    (i) => {
      r((F) => ({ ...F, [o]: i.target.value })), t == null || t(i.target.value);
    },
    [o, t, r]
  );
  return /* @__PURE__ */ p(j.Item, { label: e, required: m, error: R, columnSpan: c, children: /* @__PURE__ */ p(
    w,
    {
      options: I,
      ...l,
      name: o,
      value: n,
      onChange: v
    }
  ) });
};
u.inputName = "RadioInput";
const z = k(u);
export {
  z as RadioInput
};
