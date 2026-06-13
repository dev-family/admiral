import { jsx as m } from "react/jsx-runtime";
import { useCallback as v } from "react";
import { useForm as F } from "../FormContext.mjs";
import { Form as g } from "../Form.mjs";
import { RangePicker as x } from "../../ui/DatePicker/index.mjs";
import { parseISO as S } from "date-fns";
import { usePopupContainer as _ } from "../../crud/PopupContainerContext.mjs";
import { withFieldRules as b } from "../fieldRules.mjs";
const s = function({
  name: t,
  label: c,
  required: n,
  columnSpan: a,
  onChange: o,
  ...f
}) {
  var p;
  const u = _(), { values: e, errors: l, setValues: P, locale: k } = F(), I = k.fields.datePicker, R = e[t] ? e[t].map(
    (r) => typeof r == "string" ? S(r) : r
  ) : void 0, i = (p = l[t]) == null ? void 0 : p[0], d = v(
    (r, w) => {
      P((D) => ({ ...D, [t]: r })), o == null || o(r);
    },
    [o]
  );
  return /* @__PURE__ */ m(g.Item, { label: c, required: n, error: i, columnSpan: a, children: /* @__PURE__ */ m(
    x,
    {
      getPopupContainer: u,
      locale: I,
      ...f,
      value: R,
      onChange: d,
      alert: !!i
    }
  ) });
};
s.inputName = "DateRangePickerInput";
const C = b(s);
export {
  C as DateRangePickerInput
};
