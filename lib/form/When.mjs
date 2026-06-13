import { jsx as n, Fragment as t } from "react/jsx-runtime";
import { useForm as i } from "./FormContext.mjs";
import { compileRule as s } from "./rules.mjs";
const e = function({ rule: o, children: r }) {
  const { values: m } = i();
  return s(o)(m) ? /* @__PURE__ */ n(t, { children: r }) : null;
};
e.formNodeType = "when";
e.displayName = "Form.When";
export {
  e as default
};
