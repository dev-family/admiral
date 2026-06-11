import { jsx as n, jsxs as N } from "react/jsx-runtime";
import { useRef as P, useLayoutEffect as I, useCallback as _, useMemo as s } from "react";
import { useCrudIndex as F } from "../crud/CrudIndexPageContext.mjs";
import m from "./Filters.module.scss.mjs";
import { useForm as j } from "../form/FormContext.mjs";
import T from "classnames";
import C from "../utils/hooks/useDebouncedCallback.mjs";
import D from "../utils/hooks/useUpdateEffect.mjs";
import { DateRangePickerInput as U } from "../form/fields/DateRangePickerInput.mjs";
import { DatePickerInput as w } from "../form/fields/DatePickerInput.mjs";
import { TimePickerInput as J } from "../form/fields/TimePickerInput.mjs";
import { AjaxSelectInput as R } from "../form/fields/AjaxSelectInput.mjs";
import { SelectInput as q } from "../form/fields/SelectInput.mjs";
import { BooleanInput as v } from "../form/fields/BooleanInput.mjs";
import { TextInput as B } from "../form/fields/TextInput.mjs";
function ee({ filters: a }) {
  const {
    setUrlState: h,
    urlState: S,
    filter: { fields: f, options: d }
  } = F(), { values: u, setValues: k, setOptions: x } = j(), { filter: c } = S, r = P(!0);
  I(() => {
    x(d);
  }, [d]);
  const o = C((t) => {
    h((e) => ({
      ...e,
      filter: t,
      page: void 0
    }));
  }, 500);
  D(() => {
    if (!r.current) {
      r.current = !0;
      return;
    }
    if (JSON.stringify(c) !== JSON.stringify(u))
      return o(u), o.cancel;
  }, [u]), I(() => {
    JSON.stringify(c) !== JSON.stringify(u) && (r.current = !1, k(c));
  }, [c]);
  const O = _(
    (t, e, l) => {
      const y = Object.entries({
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
      }).filter(([E, b]) => b), i = Object.fromEntries(y);
      switch (t) {
        case "BooleanInput":
          return /* @__PURE__ */ N("div", { className: m.quickFilters__boolean_filter, children: [
            /* @__PURE__ */ n("span", { children: e.label }),
            /* @__PURE__ */ n(v, { ...i })
          ] });
        case "TextInput":
          return /* @__PURE__ */ n(B, { ...i });
        case "SelectInput":
          return /* @__PURE__ */ n(q, { ...i });
        case "AjaxSelectInput":
          return /* @__PURE__ */ n(R, { ...i });
        case "TimePickerInput":
          return /* @__PURE__ */ n(J, { ...i });
        case "DatePickerInput":
          return /* @__PURE__ */ n(w, { ...i });
        case "DateRangePickerInput":
          return /* @__PURE__ */ n(U, { ...i });
        default:
          return /* @__PURE__ */ n(l, { ...e });
      }
    },
    []
  ), g = s(
    () => f.filter((t) => t.props.name && (a == null ? void 0 : a.includes(String(t.props.name)))).map(({ type: t, component: e, props: l }) => ({
      type: t,
      component: e,
      props: l
    })),
    [f, a]
  );
  return /* @__PURE__ */ n("ul", { className: m.quickFilters, children: g.map(({ type: t, component: e, props: l }) => /* @__PURE__ */ n(
    "li",
    {
      className: T({
        [m.quickFilters__with_boolean_filter]: t == "BooleanInput"
      }),
      children: O(t, l, e)
    },
    String(l.name)
  )) });
}
export {
  ee as QuickFilters
};
