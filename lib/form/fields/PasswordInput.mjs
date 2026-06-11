import { jsx as p } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as I } from "../FormContext.mjs";
import { Form as P } from "../Form.mjs";
import x from "../../ui/Input/Password.mjs";
const F = function({
  name: r,
  label: m,
  required: a,
  columnSpan: l,
  onChange: t,
  ...c
}) {
  var u;
  const { values: i, errors: d, setValues: o } = I(), f = i[r], s = (u = d[r]) == null ? void 0 : u[0], w = v(
    (e) => {
      o((n) => ({ ...n, [r]: e.target.value })), t == null || t(e.target.value);
    },
    [r, t, o]
  );
  return /* @__PURE__ */ p(P.Item, { label: m, required: a, error: s, columnSpan: l, children: /* @__PURE__ */ p(
    x,
    {
      autoComplete: "new-password",
      ...c,
      name: r,
      value: f,
      onChange: w,
      alert: !!s
    }
  ) });
};
F.inputName = "PasswordInput";
export {
  F as PasswordInput
};
