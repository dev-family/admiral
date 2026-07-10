import { jsx as u } from "react/jsx-runtime";
import { useCallback as x } from "react";
import { useForm as y } from "../FormContext.mjs";
import { Form as H } from "../Form.mjs";
import { TimePicker as b } from "../../ui/DatePicker/index.mjs";
import { parseISO as j, parse as B, isValid as a } from "date-fns";
import { usePopupContainer as L } from "../../crud/PopupContainerContext.mjs";
import { getTransformedDate as N } from "../../utils/helpers/getTransformedDate.mjs";
import { withFieldRules as R } from "../fieldRules.mjs";
const f = function({
  name: r,
  label: t,
  required: e,
  columnSpan: d,
  onChange: o,
  format: s = "HH:mm:ss",
  dateOutputFormat: I = "utc",
  ...P
}) {
  var c;
  const k = L(), { values: m, errors: T, setValues: O, locale: D } = y(), F = D.fields.datePicker, S = m[r] ? _(m[r], s) : null, n = (c = T[r]) == null ? void 0 : c[0], V = x(
    (l) => {
      const p = l ? N({ date: l, type: I }) : null;
      O((w) => ({ ...w, [r]: p })), o == null || o(p);
    },
    [o]
  );
  return /* @__PURE__ */ u(H.Item, { label: t, required: e, error: n, columnSpan: d, children: /* @__PURE__ */ u(
    b,
    {
      getPopupContainer: k,
      ...P,
      format: s,
      locale: F,
      value: S,
      onChange: V,
      alert: !!n
    }
  ) });
};
f.inputName = "TimePickerInput";
const M = R(f), _ = (i, r) => {
  const t = j(i), e = B(i, r, /* @__PURE__ */ new Date());
  return a(t) ? t : a(e) ? e : null;
};
export {
  M as TimePickerInput,
  _ as parseValue
};
