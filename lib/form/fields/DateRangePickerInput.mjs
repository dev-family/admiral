import { jsx as m } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as D } from "../FormContext.mjs";
import { Form as x } from "../Form.mjs";
import { RangePicker as F } from "../../ui/DatePicker/index.mjs";
import { parseISO as S } from "date-fns";
import { usePopupContainer as _ } from "../../crud/PopupContainerContext.mjs";
const b = function({
  name: o,
  label: c,
  required: s,
  columnSpan: n,
  onChange: t,
  ...f
}) {
  var p;
  const a = _(), { values: e, errors: u, setValues: l, locale: P } = D(), k = P.fields.datePicker, I = e[o] ? e[o].map(
    (r) => typeof r == "string" ? S(r) : r
  ) : void 0, i = (p = u[o]) == null ? void 0 : p[0], d = v(
    (r, j) => {
      l((R) => ({ ...R, [o]: r })), t == null || t(r);
    },
    [t]
  );
  return /* @__PURE__ */ m(x.Item, { label: c, required: s, error: i, columnSpan: n, children: /* @__PURE__ */ m(
    F,
    {
      getPopupContainer: a,
      locale: k,
      ...f,
      value: I,
      onChange: d,
      alert: !!i
    }
  ) });
};
b.inputName = "DateRangePickerInput";
export {
  b as DateRangePickerInput
};
