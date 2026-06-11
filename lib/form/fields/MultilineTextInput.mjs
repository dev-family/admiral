import { jsx as i } from "react/jsx-runtime";
import { useCallback as I } from "react";
import { useForm as T } from "../FormContext.mjs";
import { Form as M } from "../Form.mjs";
import F from "../../ui/Textarea/Textarea.mjs";
const b = function({
  name: t,
  label: s,
  required: m,
  columnSpan: p,
  onChange: r,
  ...c
}) {
  var u;
  const { values: a, errors: f, setValues: e } = T(), n = a[t], o = (u = f[t]) == null ? void 0 : u[0], x = I(
    (l) => {
      e((v) => ({ ...v, [t]: l.target.value })), r == null || r(l.target.value);
    },
    [t, r, e]
  );
  return /* @__PURE__ */ i(M.Item, { label: s, required: m, error: o, columnSpan: p, children: /* @__PURE__ */ i(
    F,
    {
      ...c,
      name: t,
      value: n,
      onChange: x,
      alert: !!o
    }
  ) });
};
b.inputName = "MultilineTextInput";
export {
  b as MultilineTextInput
};
