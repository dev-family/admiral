import { jsx as u } from "react/jsx-runtime";
import { useCallback as y } from "react";
import { useForm as F } from "../FormContext.mjs";
import { Form as H } from "../Form.mjs";
import { TimePicker as b } from "../../ui/DatePicker/index.mjs";
import { parseISO as j, parse as w, isValid as a } from "date-fns";
import { usePopupContainer as L } from "../../crud/PopupContainerContext.mjs";
import { getTransformedDate as N } from "../../utils/helpers/getTransformedDate.mjs";
const _ = function({
  name: r,
  label: t,
  required: e,
  columnSpan: f,
  onChange: o,
  format: s = "HH:mm:ss",
  dateOutputFormat: d = "utc",
  ...I
}) {
  var c;
  const P = L(), { values: m, errors: k, setValues: T, locale: O } = F(), D = O.fields.datePicker, S = m[r] ? q(m[r], s) : null, n = (c = k[r]) == null ? void 0 : c[0], V = y(
    (l) => {
      const p = l ? N({ date: l, type: d }) : null;
      T((x) => ({ ...x, [r]: p })), o == null || o(p);
    },
    [o]
  );
  return /* @__PURE__ */ u(H.Item, { label: t, required: e, error: n, columnSpan: f, children: /* @__PURE__ */ u(
    b,
    {
      getPopupContainer: P,
      ...I,
      format: s,
      locale: D,
      value: S,
      onChange: V,
      alert: !!n
    }
  ) });
};
_.inputName = "TimePickerInput";
const q = (i, r) => {
  const t = j(i), e = w(i, r, /* @__PURE__ */ new Date());
  return a(t) ? t : a(e) ? e : null;
};
export {
  _ as TimePickerInput,
  q as parseValue
};
