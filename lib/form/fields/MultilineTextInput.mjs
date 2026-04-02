import { jsx as l } from "react/jsx-runtime";
import { useCallback as I } from "react";
import { useForm as T } from "../FormContext.mjs";
import { Form as M } from "../Form.mjs";
import F from "../../ui/Textarea/Textarea.mjs";
const b = function({
  name: t,
  label: i,
  required: s,
  columnSpan: m,
  onChange: r,
  ...p
}) {
  var o;
  const { values: c, errors: a, setValues: n } = T(), f = c[t], e = (o = a[t]) == null ? void 0 : o[0], x = I(
    (u) => {
      n((v) => ({ ...v, [t]: u.target.value })), r == null || r(u.target.value);
    },
    [r]
  );
  return /* @__PURE__ */ l(M.Item, { label: i, required: s, error: e, columnSpan: m, children: /* @__PURE__ */ l(
    F,
    {
      ...p,
      name: t,
      value: f,
      onChange: x,
      alert: !!e
    }
  ) });
};
b.inputName = "MultilineTextInput";
export {
  b as MultilineTextInput
};
