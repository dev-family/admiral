import { jsx as m } from "react/jsx-runtime";
import { useCallback as x } from "react";
import { useForm as F } from "../FormContext.mjs";
import { Form as b } from "../Form.mjs";
import { Switch as d } from "../../ui/Switch/Switch.mjs";
const j = function({
  name: o,
  label: p,
  required: u,
  columnSpan: c,
  onChange: r,
  ...e
}) {
  var t;
  const { values: i, errors: l, setValues: n } = F(), f = i[o], I = (t = l[o]) == null ? void 0 : t[0], B = x(
    (s) => {
      n((a) => ({ ...a, [o]: s })), r == null || r(s);
    },
    [o, r]
  );
  return /* @__PURE__ */ m(b.Item, { label: p, required: u, error: I, columnSpan: c, children: /* @__PURE__ */ m(d, { ...e, checked: f, onChange: B }) });
};
j.inputName = "BooleanInput";
export {
  j as BooleanInput
};
