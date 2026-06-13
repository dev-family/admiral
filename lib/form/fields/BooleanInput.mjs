import { jsx as e } from "react/jsx-runtime";
import { useCallback as d } from "react";
import { useForm as w } from "../FormContext.mjs";
import { Form as x } from "../Form.mjs";
import { withFieldRules as b } from "../fieldRules.mjs";
import { Switch as j } from "../../ui/Switch/Switch.mjs";
const m = function({
  name: o,
  label: i,
  required: p,
  columnSpan: u,
  onChange: r,
  ...l
}) {
  var t;
  const { values: c, errors: n, setValues: f } = w(), B = c[o], I = (t = n[o]) == null ? void 0 : t[0], a = d(
    (s) => {
      f((F) => ({ ...F, [o]: s })), r == null || r(s);
    },
    [o, r]
  );
  return /* @__PURE__ */ e(x.Item, { label: i, required: p, error: I, columnSpan: u, children: /* @__PURE__ */ e(j, { ...l, checked: B, onChange: a }) });
};
m.inputName = "BooleanInput";
const h = b(m);
export {
  h as BooleanInput
};
