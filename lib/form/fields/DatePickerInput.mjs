import { jsx as c } from "react/jsx-runtime";
import { useCallback as j } from "react";
import { useForm as v } from "../FormContext.mjs";
import { Form as w } from "../Form.mjs";
import { DatePicker as y } from "../../ui/DatePicker/index.mjs";
import { parseISO as B } from "date-fns";
import { usePopupContainer as L } from "../../crud/PopupContainerContext.mjs";
import { getTransformedDate as N } from "../../utils/helpers/getTransformedDate.mjs";
import { withFieldRules as O } from "../fieldRules.mjs";
const p = function({
  name: r,
  label: a,
  required: l,
  columnSpan: n,
  onChange: t,
  dateOutputFormat: u = "iso",
  ...f
}) {
  var i;
  const P = L(), { values: o, errors: d, setValues: k, locale: D } = v(), I = D.fields.datePicker, F = o[r] ? B(o[r]) : null, e = (i = d[r]) == null ? void 0 : i[0], x = j(
    (s) => {
      const m = s ? N({ date: s, type: u }) : null;
      k((b) => ({ ...b, [r]: m })), t == null || t(m);
    },
    [t]
  );
  return /* @__PURE__ */ c(w.Item, { label: a, required: l, error: e, columnSpan: n, children: /* @__PURE__ */ c(
    y,
    {
      getPopupContainer: P,
      locale: I,
      ...f,
      value: F,
      onChange: x,
      alert: !!e
    }
  ) });
};
p.inputName = "DatePickerInput";
const G = O(p);
export {
  G as DatePickerInput
};
