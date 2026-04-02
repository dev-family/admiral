import { jsx as u } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as I } from "../FormContext.mjs";
import { Form as P } from "../Form.mjs";
import x from "../../ui/Input/Password.mjs";
const F = function({
  name: r,
  label: m,
  required: p,
  columnSpan: a,
  onChange: t,
  ...l
}) {
  var s;
  const { values: c, errors: i, setValues: d } = I(), f = c[r], o = (s = i[r]) == null ? void 0 : s[0], w = v(
    (e) => {
      d((n) => ({ ...n, [r]: e.target.value })), t == null || t(e.target.value);
    },
    [t]
  );
  return /* @__PURE__ */ u(P.Item, { label: m, required: p, error: o, columnSpan: a, children: /* @__PURE__ */ u(
    x,
    {
      autoComplete: "new-password",
      ...l,
      name: r,
      value: f,
      onChange: w,
      alert: !!o
    }
  ) });
};
F.inputName = "PasswordInput";
export {
  F as PasswordInput
};
