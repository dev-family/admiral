import { jsx as p } from "react/jsx-runtime";
import { useCallback as T } from "react";
import { useForm as F } from "../FormContext.mjs";
import { Form as d } from "../Form.mjs";
import { withFieldRules as b } from "../fieldRules.mjs";
import j from "../../ui/Input/Input.mjs";
const m = function({
  name: t,
  label: i,
  required: l,
  columnSpan: c,
  onChange: r,
  ...f
}) {
  var u;
  const { values: n, errors: x, setValues: o } = F(), I = n[t], e = (u = x[t]) == null ? void 0 : u[0], a = T(
    (s) => {
      o((v) => ({ ...v, [t]: s.target.value })), r == null || r(s.target.value);
    },
    [t, r, o]
  );
  return /* @__PURE__ */ p(d.Item, { label: i, required: l, error: e, columnSpan: c, children: /* @__PURE__ */ p(
    j,
    {
      ...f,
      name: t,
      value: I,
      onChange: a,
      alert: !!e
    }
  ) });
};
m.inputName = "TextInput";
const q = b(m);
export {
  q as TextInput
};
