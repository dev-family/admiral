import { jsx as c, Fragment as A } from "react/jsx-runtime";
import O, { useCallback as F } from "react";
import { useCrudIndex as P } from "../crud/CrudIndexPageContext.mjs";
import { FiX as C } from "react-icons/fi";
import k from "./Filters.module.scss.mjs";
import { format as m, parseISO as d } from "date-fns";
import w from "../ui/Button/Button.mjs";
function _() {
  var l;
  const {
    setUrlState: u,
    urlState: { filter: y },
    filter: { fields: p, options: f }
  } = P(), M = (l = Object.keys(f)) == null ? void 0 : l.length, S = F(
    (r, n, t, e, a) => {
      var $;
      if (typeof t > "u" || t === null) return null;
      switch (n) {
        case "BooleanInput":
          return `${e || r}: ${t}`;
        case "TextInput":
        case "SlugInput":
          return e ? `${e}: ${t}` : t;
        case "SelectInput":
        case "AjaxSelectInput": {
          const i = Array.isArray(t), o = f[r];
          if (i) {
            const s = o ? t.map((h) => {
              var x;
              return ((x = o.find((j) => j.value == h)) == null ? void 0 : x.label) ?? h;
            }) : [t.length], g = s.length > 1 ? s.length : s[0];
            return e ? `${e}: ${g}` : g;
          }
          const I = o ? (($ = o.find((s) => s.value == t)) == null ? void 0 : $.label) ?? t : t;
          return e ? `${e}: ${I}` : I;
        }
        case "TimePickerInput": {
          const { format: i } = a.timePicker, o = m(d(t), i);
          return e ? `${e}: ${o}` : o;
        }
        case "DatePickerInput": {
          const i = m(d(t), "dd.MM.yyyy");
          return e ? `${e}: ${i}` : i;
        }
        case "DateRangePickerInput": {
          const i = [
            m(d(t[0]), "dd.MM.yyyy"),
            m(d(t[1]), "dd.MM.yyyy")
          ];
          return e ? `${e}: ${i[0]} - ${i[1]}` : `${i[0]} - ${i[1]}`;
        }
        default:
          return null;
      }
    },
    [f]
  ), N = Object.entries(y).filter(([r]) => p.some((n) => n.name === r)).map(([r, n]) => {
    const t = p.find((e) => e.name === r);
    return {
      name: r,
      label: t.label,
      type: t.type,
      value: n,
      extra: t.extra
    };
  }).sort(
    (r, n) => p.findIndex((t) => t.name === r.name) - p.findIndex((t) => t.name === n.name)
  ), R = F(
    (r) => () => {
      u((n) => ({
        ...n,
        page: "1",
        filter: { ...y, [r]: void 0 }
      }));
    },
    [u]
  );
  return M ? /* @__PURE__ */ c("div", { className: k.appliedFilters, children: N.map(({ name: r, label: n, type: t, value: e, extra: a }) => e != null && e !== "" ? /* @__PURE__ */ c(
    w,
    {
      type: "button",
      iconRight: /* @__PURE__ */ c(
        C,
        {
          className: k.appliedFilters_Remove,
          onClick: R(r)
        }
      ),
      size: "XS",
      view: "ghost",
      children: S(r, t, e, n, a)
    },
    r
  ) : /* @__PURE__ */ c(O.Fragment, {}, r)) }) : /* @__PURE__ */ c(A, {});
}
export {
  _ as AppliedFilters
};
