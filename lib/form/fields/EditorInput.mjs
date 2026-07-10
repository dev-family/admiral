import { jsx as e } from "react/jsx-runtime";
import { useCallback as b } from "react";
import { useForm as j } from "../FormContext.mjs";
import { Form as k } from "../Form.mjs";
import { Editor as v } from "../../ui/Editor/index.mjs";
import { withFieldRules as w } from "../fieldRules.mjs";
const l = function({
  name: o,
  label: m,
  required: c,
  columnSpan: p,
  onChange: r,
  ...u
}) {
  var i;
  const { values: d, errors: f, setValues: n, locale: E } = j(), I = E.fields.editor, a = d[o], t = (i = f[o]) == null ? void 0 : i[0], F = b(
    (s) => {
      n((x) => ({ ...x, [o]: s })), r == null || r(s);
    },
    [o, r]
  );
  return /* @__PURE__ */ e(k.Item, { label: m, required: c, error: t, columnSpan: p, children: /* @__PURE__ */ e(
    v,
    {
      ...u,
      value: a,
      locale: I,
      onChange: F,
      alert: !!t
    }
  ) });
};
l.inputName = "EditorInput";
const y = w(l);
export {
  y as EditorInput
};
