import { jsx as i } from "react/jsx-runtime";
import { useCallback as B } from "react";
import { useForm as E } from "../FormContext.mjs";
import { Form as b } from "../Form.mjs";
import { Upload as j } from "../../ui/Upload/index.mjs";
import { FiUpload as k } from "react-icons/fi";
import { withFieldRules as w } from "../fieldRules.mjs";
import z from "../../ui/Button/Button.mjs";
const D = [], m = function({
  name: o,
  label: f,
  required: h,
  columnSpan: F,
  children: p,
  disabled: s,
  maxCount: n,
  ...t
}) {
  var c;
  const { values: V, errors: A, setValues: L, locale: y } = E(), e = y.fields.upload, r = V[o], I = Array.isArray(r) ? r : !!r ? [r] : D, U = (c = A[o]) == null ? void 0 : c[0], g = B(
    (l) => {
      var u;
      const { fileList: a } = l, C = a[0] ?? null, d = n === 1 ? C : a;
      L((v) => ({ ...v, [o]: d })), (u = t.onChange) == null || u.call(t, l);
    },
    [n, t.onChange]
  );
  return /* @__PURE__ */ i(b.Item, { label: f, required: h, error: U, columnSpan: F, children: /* @__PURE__ */ i(
    j,
    {
      ...t,
      locale: e,
      fileList: I,
      onChange: g,
      maxCount: n,
      disabled: s,
      children: /* @__PURE__ */ i(z, { type: "button", disabled: s, iconLeft: /* @__PURE__ */ i(k, {}), children: p || (e == null ? void 0 : e.pictureCardUpload) })
    }
  ) });
};
m.inputName = "FilePictureInput";
const O = w(m, { dispatchesChange: !1 });
export {
  O as FilePictureInput
};
