import { jsx as p } from "react/jsx-runtime";
import { useCallback as P } from "react";
import { useForm as v } from "../FormContext.mjs";
import { Form as F } from "../Form.mjs";
import { withFieldRules as x } from "../fieldRules.mjs";
import b from "../../ui/Input/Password.mjs";
const m = function({
  name: r,
  label: a,
  required: l,
  columnSpan: i,
  onChange: t,
  ...c
}) {
  var e;
  const { values: d, errors: w, setValues: o } = v(), f = d[r], s = (e = w[r]) == null ? void 0 : e[0], n = P(
    (u) => {
      o((I) => ({ ...I, [r]: u.target.value })), t == null || t(u.target.value);
    },
    [r, t, o]
  );
  return /* @__PURE__ */ p(F.Item, { label: a, required: l, error: s, columnSpan: i, children: /* @__PURE__ */ p(
    b,
    {
      autoComplete: "new-password",
      ...c,
      name: r,
      value: f,
      onChange: n,
      alert: !!s
    }
  ) });
};
m.inputName = "PasswordInput";
const q = x(m);
export {
  q as PasswordInput
};
