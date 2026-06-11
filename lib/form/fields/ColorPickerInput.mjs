import { jsx as c } from "react/jsx-runtime";
import { useCallback as s } from "react";
import { useForm as x } from "../FormContext.mjs";
import { Form as F } from "../Form.mjs";
import { usePopupContainer as j } from "../../crud/PopupContainerContext.mjs";
import D from "../../ui/ColorPicker/ColorPicker.mjs";
const L = function({
  name: r,
  label: n,
  required: m,
  columnSpan: l,
  showError: f,
  outputValue: e = "rgbString",
  onChange: o,
  ...u
}) {
  var p;
  const k = j(), { values: P, errors: C, setValues: I } = x(), a = P[r], i = (p = C[r]) == null ? void 0 : p[0], b = s(
    (t) => {
      I((v) => ({ ...v, [r]: t[e] })), o == null || o(t[e]);
    },
    [r, e, o]
  ), d = s((t) => {
    t.preventDefault();
  }, []);
  return /* @__PURE__ */ c(
    F.Item,
    {
      label: n,
      required: m,
      error: i,
      showError: f,
      columnSpan: l,
      onLabelClick: d,
      children: /* @__PURE__ */ c(
        D,
        {
          appendTo: k,
          ...u,
          value: a,
          onChange: b,
          alert: !!i
        }
      )
    }
  );
};
L.inputName = "ColorPickerInput";
export {
  L as ColorPickerInput
};
