import { jsx as s } from "react/jsx-runtime";
import { useCallback as c } from "react";
import { useForm as x } from "../FormContext.mjs";
import { Form as j } from "../Form.mjs";
import { usePopupContainer as w } from "../../crud/PopupContainerContext.mjs";
import { withFieldRules as B } from "../fieldRules.mjs";
import D from "../../ui/ColorPicker/ColorPicker.mjs";
const n = function({
  name: r,
  label: m,
  required: l,
  columnSpan: u,
  showError: f,
  outputValue: e = "rgbString",
  onChange: o,
  ...k
}) {
  var p;
  const P = w(), { values: C, errors: I, setValues: a } = x(), b = C[r], i = (p = I[r]) == null ? void 0 : p[0], d = c(
    (t) => {
      a((v) => ({ ...v, [r]: t[e] })), o == null || o(t[e]);
    },
    [r, e, o]
  ), F = c((t) => {
    t.preventDefault();
  }, []);
  return /* @__PURE__ */ s(
    j.Item,
    {
      label: m,
      required: l,
      error: i,
      showError: f,
      columnSpan: u,
      onLabelClick: F,
      children: /* @__PURE__ */ s(
        D,
        {
          appendTo: P,
          ...k,
          value: b,
          onChange: d,
          alert: !!i
        }
      )
    }
  );
};
n.inputName = "ColorPickerInput";
const y = B(n);
export {
  y as ColorPickerInput
};
