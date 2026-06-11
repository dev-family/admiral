import { jsx as p } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as T } from "../FormContext.mjs";
import { Form as F } from "../Form.mjs";
import b from "../../ui/Input/Input.mjs";
const d = function({
  name: t,
  label: m,
  required: l,
  columnSpan: c,
  onChange: r,
  ...i
}) {
  var e;
  const { values: f, errors: x, setValues: o } = T(), I = f[t], u = (e = x[t]) == null ? void 0 : e[0], a = v(
    (s) => {
      o((n) => ({ ...n, [t]: s.target.value })), r == null || r(s.target.value);
    },
    [t, r, o]
  );
  return /* @__PURE__ */ p(F.Item, { label: m, required: l, error: u, columnSpan: c, children: /* @__PURE__ */ p(
    b,
    {
      ...i,
      name: t,
      value: I,
      onChange: a,
      alert: !!u
    }
  ) });
};
d.inputName = "TextInput";
export {
  d as TextInput
};
