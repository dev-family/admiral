import { jsx as n } from "react/jsx-runtime";
import { useCallback as m } from "react";
import { useForm as B } from "../FormContext.mjs";
import { Form as D } from "../Form.mjs";
import { Upload as E } from "../../ui/Upload/index.mjs";
import { FiUpload as j } from "react-icons/fi";
import { withFieldRules as w } from "../fieldRules.mjs";
import z from "../../ui/Button/Button.mjs";
const N = [], f = function({
  name: o,
  label: h,
  required: p,
  columnSpan: F,
  children: L,
  disabled: s,
  maxCount: c,
  ...t
}) {
  var l;
  const { values: V, errors: A, setValues: y, locale: C } = B(), e = C.fields.upload, r = V[o], I = Array.isArray(r) ? r : !!r ? [r] : N, U = (l = A[o]) == null ? void 0 : l[0], g = m(
    (i) => {
      var u;
      const { fileList: a } = i, d = a[0] ?? null, b = c === 1 ? d : a;
      y((k) => ({ ...k, [o]: b })), (u = t.onChange) == null || u.call(t, i);
    },
    [c, t.onChange]
  ), v = m((i) => {
    i.preventDefault();
  }, []);
  return /* @__PURE__ */ n(
    D.Item,
    {
      label: h,
      onLabelClick: v,
      required: p,
      error: U,
      columnSpan: F,
      children: /* @__PURE__ */ n(
        E,
        {
          ...t,
          locale: e,
          fileList: I,
          onChange: g,
          maxCount: c,
          disabled: s,
          children: /* @__PURE__ */ n(z, { type: "button", disabled: s, iconLeft: /* @__PURE__ */ n(j, {}), children: L || (e == null ? void 0 : e.pictureCardUpload) })
        }
      )
    }
  );
};
f.inputName = "FilePictureInput";
const Q = w(f, { dispatchesChange: !1 });
export {
  Q as FilePictureInput
};
