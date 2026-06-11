import { jsx as c } from "react/jsx-runtime";
import { useCallback as F } from "react";
import { useForm as b } from "../FormContext.mjs";
import { Form as j } from "../Form.mjs";
import { Editor as k } from "../../ui/Editor/index.mjs";
const v = function({
  name: r,
  label: e,
  required: l,
  columnSpan: m,
  onChange: o,
  ...p
}) {
  var i;
  const { values: u, errors: f, setValues: d, locale: n } = b(), E = n.fields.editor, I = u[r], t = (i = f[r]) == null ? void 0 : i[0], a = F(
    (s) => {
      d((x) => ({ ...x, [r]: s })), o == null || o(s);
    },
    [r, o]
  );
  return /* @__PURE__ */ c(j.Item, { label: e, required: l, error: t, columnSpan: m, children: /* @__PURE__ */ c(
    k,
    {
      ...p,
      value: I,
      locale: E,
      onChange: a,
      alert: !!t
    }
  ) });
};
v.inputName = "EditorInput";
export {
  v as EditorInput
};
