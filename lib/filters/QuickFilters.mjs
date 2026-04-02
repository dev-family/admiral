import { jsx as n, Fragment as _, jsxs as g } from "react/jsx-runtime";
import { useRef as y, useLayoutEffect as f, useCallback as F, useMemo as T } from "react";
import { useCrudIndex as b } from "../crud/CrudIndexPageContext.mjs";
import m from "./Filters.module.scss.mjs";
import { useForm as j } from "../form/FormContext.mjs";
import s from "classnames";
import N from "../utils/hooks/useUpdateEffect.mjs";
import { DateRangePickerInput as w } from "../form/fields/DateRangePickerInput.mjs";
import { DatePickerInput as C } from "../form/fields/DatePickerInput.mjs";
import { TimePickerInput as D } from "../form/fields/TimePickerInput.mjs";
import { AjaxSelectInput as R } from "../form/fields/AjaxSelectInput.mjs";
import { SelectInput as U } from "../form/fields/SelectInput.mjs";
import { BooleanInput as q } from "../form/fields/BooleanInput.mjs";
import { TextInput as B } from "../form/fields/TextInput.mjs";
function Z({ filters: l }) {
  const {
    setUrlState: d,
    urlState: I,
    filter: { fields: r, options: a }
  } = b(), { values: c, setValues: o, setOptions: h } = j(), { filter: u } = I, k = y(!0);
  f(() => {
    h(a);
  }, [a]), N(() => {
    const t = setTimeout(() => {
      d((e) => ({
        ...e,
        filter: c
      }));
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [c]), f(() => {
    JSON.stringify(u) !== JSON.stringify(c) && (k.current = !1, o(u));
  }, [u]);
  const S = F(
    (t, e) => {
      const O = Object.entries({
        name: e == null ? void 0 : e.name,
        type: e == null ? void 0 : e.type,
        placeholder: e == null ? void 0 : e.placeholder,
        size: e == null ? void 0 : e.size,
        fetchOptions: e == null ? void 0 : e.fetchOptions,
        format: e == null ? void 0 : e.format,
        allowClear: e == null ? void 0 : e.allowClear,
        mode: e == null ? void 0 : e.mode,
        locale: e == null ? void 0 : e.locale,
        style: e == null ? void 0 : e.style,
        children: e == null ? void 0 : e.children,
        suffix: e == null ? void 0 : e.suffix
      }).filter(([E, P]) => P), i = Object.fromEntries(O);
      switch (t) {
        case "BooleanInput":
          return /* @__PURE__ */ g("div", { className: m.quickFilters__boolean_filter, children: [
            /* @__PURE__ */ n("span", { children: e.label }),
            /* @__PURE__ */ n(q, { ...i })
          ] });
        case "TextInput":
          return /* @__PURE__ */ n(B, { ...i });
        case "SelectInput":
          return /* @__PURE__ */ n(U, { ...i });
        case "AjaxSelectInput":
          return /* @__PURE__ */ n(R, { ...i });
        case "TimePickerInput":
          return /* @__PURE__ */ n(D, { ...i });
        case "DatePickerInput":
          return /* @__PURE__ */ n(C, { ...i });
        case "DateRangePickerInput":
          return /* @__PURE__ */ n(w, { ...i });
        default:
          return /* @__PURE__ */ n(_, {});
      }
    },
    [a]
  ), x = T(
    () => r.filter((t) => t.props.name && (l == null ? void 0 : l.includes(String(t.props.name)))).map(({ type: t, props: e }) => ({
      type: t,
      props: e
    })),
    [r]
  );
  return /* @__PURE__ */ n("ul", { className: m.quickFilters, children: x.map(({ type: t, props: e }) => /* @__PURE__ */ n(
    "li",
    {
      className: s({
        [m.quickFilters__with_boolean_filter]: t == "BooleanInput"
      }),
      children: S(t, e)
    },
    String(e.name)
  )) });
}
export {
  Z as QuickFilters
};
