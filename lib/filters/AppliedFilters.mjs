import { jsx as c, Fragment as A } from "react/jsx-runtime";
import { useCallback as M } from "react";
import { useCrudIndex as P } from "../crud/CrudIndexPageContext.mjs";
import { FiX as R } from "react-icons/fi";
import S from "./Filters.module.scss.mjs";
import { format as m, parseISO as f } from "date-fns";
import j from "../ui/Button/Button.mjs";
function z() {
  const {
    setUrlState: $,
    urlState: { filter: d },
    filter: { fields: p, options: u }
  } = P(), k = M(
    (e, n, t, r, y) => {
      var I;
      if (typeof t > "u" || t === null) return null;
      switch (n) {
        case "BooleanInput":
          return `${r || e}: ${t}`;
        case "TextInput":
        case "SlugInput":
          return r ? `${r}: ${t}` : t;
        case "SelectInput":
        case "AjaxSelectInput": {
          const i = Array.isArray(t), o = u[e];
          if (i) {
            const s = o ? t.map((x) => {
              var F;
              return ((F = o.find((N) => N.value == x)) == null ? void 0 : F.label) ?? x;
            }) : [t.length], h = s.length > 1 ? s.length : s[0];
            return r ? `${r}: ${h}` : h;
          }
          const g = o ? ((I = o.find((s) => s.value == t)) == null ? void 0 : I.label) ?? t : t;
          return r ? `${r}: ${g}` : g;
        }
        case "TimePickerInput": {
          const { format: i } = y.timePicker, o = m(f(t), i);
          return r ? `${r}: ${o}` : o;
        }
        case "DatePickerInput": {
          const i = m(f(t), "dd.MM.yyyy");
          return r ? `${r}: ${i}` : i;
        }
        case "DateRangePickerInput": {
          const i = [
            m(f(t[0]), "dd.MM.yyyy"),
            m(f(t[1]), "dd.MM.yyyy")
          ];
          return r ? `${r}: ${i[0]} - ${i[1]}` : `${i[0]} - ${i[1]}`;
        }
        default:
          return typeof t == "string" || typeof t == "number" ? r ? `${r}: ${t}` : t : r ?? e;
      }
    },
    [u]
  ), a = Object.entries(d).filter(([e]) => p.some((n) => n.name === e)).filter(([, e]) => e != null && e !== "").map(([e, n]) => {
    const t = p.find((r) => r.name === e);
    return {
      name: e,
      label: t.label,
      type: t.type,
      value: n,
      extra: t.extra
    };
  }).sort(
    (e, n) => p.findIndex((t) => t.name === e.name) - p.findIndex((t) => t.name === n.name)
  ), l = M(
    (e) => () => {
      $((n) => ({
        ...n,
        page: "1",
        filter: { ...d, [e]: void 0 }
      }));
    },
    [$, d]
  );
  return a.length ? /* @__PURE__ */ c("div", { className: S.appliedFilters, children: a.map(({ name: e, label: n, type: t, value: r, extra: y }) => /* @__PURE__ */ c(
    j,
    {
      type: "button",
      iconRight: /* @__PURE__ */ c(
        R,
        {
          className: S.appliedFilters_Remove,
          onClick: l(e)
        }
      ),
      size: "XS",
      view: "ghost",
      children: k(e, t, r, n, y)
    },
    e
  )) }) : /* @__PURE__ */ c(A, {});
}
export {
  z as AppliedFilters
};
