import { jsx as s } from "react/jsx-runtime";
import { useCallback as e } from "react";
import { useForm as x } from "../FormContext.mjs";
import { Form as F } from "../Form.mjs";
import { usePopupContainer as j } from "../../crud/PopupContainerContext.mjs";
import D from "../../ui/ColorPicker/ColorPicker.mjs";
const L = function({
  name: o,
  label: n,
  required: m,
  columnSpan: l,
  showError: f,
  outputValue: i = "rgbString",
  onChange: t,
  ...u
}) {
  var c;
  const k = j(), { values: P, errors: C, setValues: I } = x(), a = P[o], p = (c = C[o]) == null ? void 0 : c[0], b = e(
    (r) => {
      I((v) => ({ ...v, [o]: r[i] })), t == null || t(r[i]);
    },
    [o, i, t]
  ), d = e((r) => {
    r == null || r.preventDefault();
  }, []);
  return /* @__PURE__ */ s(
    F.Item,
    {
      label: n,
      required: m,
      error: p,
      showError: f,
      columnSpan: l,
      onLabelClick: d,
      children: /* @__PURE__ */ s(
        D,
        {
          appendTo: k,
          ...u,
          value: a,
          onChange: b,
          alert: !!p
        }
      )
    }
  );
};
L.inputName = "ColorPickerInput";
export {
  L as ColorPickerInput
};
