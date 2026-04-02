import { jsx as s } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as T } from "../FormContext.mjs";
import { Form as F } from "../Form.mjs";
import b from "../../ui/Input/Input.mjs";
const d = function({
  name: t,
  label: p,
  required: m,
  columnSpan: l,
  onChange: r,
  ...c
}) {
  var u;
  const { values: i, errors: f, setValues: x } = T(), I = i[t], o = (u = f[t]) == null ? void 0 : u[0], a = v(
    (e) => {
      x((n) => ({ ...n, [t]: e.target.value })), r == null || r(e.target.value);
    },
    [t, r]
  );
  return /* @__PURE__ */ s(F.Item, { label: p, required: m, error: o, columnSpan: l, children: /* @__PURE__ */ s(
    b,
    {
      ...c,
      name: t,
      value: I,
      onChange: a,
      alert: !!o
    }
  ) });
};
d.inputName = "TextInput";
export {
  d as TextInput
};
