import { jsx as c } from "react/jsx-runtime";
import { useCallback as b } from "react";
import { useForm as j } from "../FormContext.mjs";
import { Form as v } from "../Form.mjs";
import { DatePicker as y } from "../../ui/DatePicker/index.mjs";
import { parseISO as L } from "date-fns";
import { usePopupContainer as N } from "../../crud/PopupContainerContext.mjs";
import { getTransformedDate as O } from "../../utils/helpers/getTransformedDate.mjs";
const S = function({
  name: r,
  label: p,
  required: a,
  columnSpan: l,
  onChange: t,
  dateOutputFormat: n = "iso",
  ...u
}) {
  var s;
  const f = N(), { values: o, errors: P, setValues: d, locale: k } = j(), D = k.fields.datePicker, I = o[r] ? L(o[r]) : null, e = (s = P[r]) == null ? void 0 : s[0], x = b(
    (i) => {
      const m = i ? O({ date: i, type: n }) : null;
      d((F) => ({ ...F, [r]: m })), t == null || t(m);
    },
    [t]
  );
  return /* @__PURE__ */ c(v.Item, { label: p, required: a, error: e, columnSpan: l, children: /* @__PURE__ */ c(
    y,
    {
      getPopupContainer: f,
      locale: D,
      ...u,
      value: I,
      onChange: x,
      alert: !!e
    }
  ) });
};
S.inputName = "DatePickerInput";
export {
  S as DatePickerInput
};
