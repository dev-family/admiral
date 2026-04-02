import { jsx as o } from "react/jsx-runtime";
import { useCallback as E } from "react";
import { useForm as b } from "../FormContext.mjs";
import { Form as d } from "../Form.mjs";
import { Upload as j } from "../../ui/Upload/index.mjs";
import { FiUpload as k } from "react-icons/fi";
import z from "../../ui/Button/Button.mjs";
const B = [], D = function({
  name: i,
  label: u,
  required: f,
  columnSpan: h,
  children: F,
  disabled: c,
  maxCount: n,
  ...t
}) {
  var s;
  const { values: V, errors: A, setValues: L, locale: p } = b(), r = p.fields.upload, e = V[i], y = Array.isArray(e) ? e : !!e ? [e] : B, U = (s = A[i]) == null ? void 0 : s[0], I = E(
    (l) => {
      var m;
      const { fileList: a } = l, g = a[0] ?? null, v = n === 1 ? g : a;
      L((C) => ({ ...C, [i]: v })), (m = t.onChange) == null || m.call(t, l);
    },
    [n, t.onChange]
  );
  return /* @__PURE__ */ o(d.Item, { label: u, required: f, error: U, columnSpan: h, children: /* @__PURE__ */ o(
    j,
    {
      ...t,
      locale: r,
      fileList: y,
      onChange: I,
      maxCount: n,
      disabled: c,
      children: /* @__PURE__ */ o(z, { type: "button", disabled: c, iconLeft: /* @__PURE__ */ o(k, {}), children: F || (r == null ? void 0 : r.pictureCardUpload) })
    }
  ) });
};
D.inputName = "FilePictureInput";
export {
  D as FilePictureInput
};
