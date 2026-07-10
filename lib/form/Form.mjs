import { jsx as p, jsxs as oe } from "react/jsx-runtime";
import { useState as N, useMemo as x, useRef as ne, useImperativeHandle as ie, useEffect as ae } from "react";
import { useNavigate as me } from "react-router-dom";
import { FormProvider as Z, useForm as D } from "./FormContext.mjs";
import q from "./Form.module.scss.mjs";
import ce from "./Item.mjs";
import fe from "./FormTabs.mjs";
import le from "./When.mjs";
import ee from "./Error.mjs";
import M from "classnames";
import { matchesField as de } from "./rules.mjs";
import { scanFormChildren as ue, evaluateVisibility as he, omitHiddenValues as pe } from "./rulesScan.mjs";
import ge from "../router/useTypedLocation.mjs";
import { getNavigationFrom as Fe, clearNavigationFrom as be } from "../utils/helpers/navigationState.mjs";
import ye from "../utils/hooks/useLatestRequest.mjs";
import { Notification as J } from "../ui/Notification/Notification.mjs";
import { enUS as K } from "./locale/enUS.mjs";
import { isObject as Q } from "../utils/helpers/isObject.mjs";
import ve from "../ui/Button/Button.mjs";
const X = /* @__PURE__ */ new Set();
function Ee({
  locale: r = K,
  className: a,
  fetchInitialData: m,
  submitData: l,
  redirect: g,
  rules: F,
  children: b,
  ref: j
}) {
  var Y;
  const [n, y] = N({}), [E, S] = N({}), [v, c] = N({}), [C, P] = N(!1), [T, i] = N(!0), w = me(), te = ge(), R = x(() => ue(b, F), [b, F]), d = x(
    () => R.hasRules ? he(R, n) : null,
    [R, n]
  ), A = (d == null ? void 0 : d.hiddenPaths) ?? X, W = (d == null ? void 0 : d.scannedPaths) ?? X, V = ne(null);
  if (!V.current) {
    const t = /* @__PURE__ */ new Map();
    V.current = {
      notify: (e) => {
        var s;
        return (s = t.get(e.path)) == null ? void 0 : s.forEach((o) => o(e));
      },
      subscribe: (e, s) => {
        let o = t.get(e);
        return o || (o = /* @__PURE__ */ new Set(), t.set(e, o)), o.add(s), () => {
          o.delete(s), o.size || t.delete(e);
        };
      }
    };
  }
  const z = V.current;
  ie(j, () => ({
    values: n,
    setValues: y,
    handleSubmit: U
  }));
  const B = ye();
  ae(() => {
    if (typeof m != "function") {
      i(!1);
      return;
    }
    const t = B();
    (async () => {
      i(!0);
      try {
        const s = await m();
        if (!t()) return;
        Q(s.data) && y({ ...s.data }), Q(s.values) && S({ ...s.values });
      } catch {
        t() && c((s) => ({ ...s, _global: ["Fetch initial data error"] }));
      } finally {
        t() && i(!1);
      }
    })();
  }, [m, B]);
  async function U(t) {
    var o, $, G;
    t == null || t.preventDefault();
    const e = d, s = e ? pe(n, e.hiddenPaths, e.keepPaths) : n;
    P(!0);
    try {
      if (await (l == null ? void 0 : l(s)), J({
        message: r.successMessage,
        type: "success"
      }), g === !0) {
        const u = Fe((o = te.state) == null ? void 0 : o.from);
        u ? (be(), w(
          { pathname: u.pathname, search: u.search },
          { state: { update: { dataTable: !0 } } }
        )) : w(-1);
      } else if (g)
        return w(
          { pathname: g },
          // update table when drawer saved and closed
          { state: { update: { dataTable: !0 } } }
        ), !0;
      return c({}), !0;
    } catch (u) {
      const h = u == null ? void 0 : u.response;
      if ((h == null ? void 0 : h.status) === 422) {
        const H = (($ = h.data) == null ? void 0 : $.errors) ?? {};
        if (!e)
          c(H);
        else {
          const re = [...e.hiddenPaths], I = [...H._global ?? []], L = {};
          for (const [_, O] of Object.entries(H)) {
            if (_ === "_global") continue;
            if (re.some((k) => de(_, k))) {
              for (const k of O)
                I.push(
                  (r.hiddenFieldError ?? K.hiddenFieldError)(_, k)
                );
              console.warn(
                `[Admiral] A 422 error targets hidden field "${_}" whose value was omitted from the payload; surfacing it in _global: ` + O.join("; ")
              );
            } else
              L[_] = O;
          }
          I.length && (L._global = I), c(L);
        }
      } else
        c({});
      return J({
        message: ((G = h == null ? void 0 : h.data) == null ? void 0 : G.message) ?? r.serverErrorMessage,
        type: "error"
      }), !1;
    } finally {
      P(!1);
    }
  }
  const se = x(
    () => ({
      locale: r,
      values: n,
      setValues: y,
      options: E,
      setOptions: S,
      errors: v,
      setErrors: c,
      isSubmitting: C,
      isFetching: T,
      rules: F,
      hiddenFields: A,
      scannedFields: W,
      scopePath: "",
      fieldChange: z
    }),
    [
      r,
      n,
      E,
      v,
      C,
      T,
      F,
      A,
      W,
      z
    ]
  );
  return /* @__PURE__ */ p(Z, { value: se, children: /* @__PURE__ */ oe("form", { onSubmit: U, className: M(a), children: [
    (Y = v._global) == null ? void 0 : Y.map((t, e) => /* @__PURE__ */ p(ee, { error: t }, e)),
    b
  ] }) });
}
function Se({
  as: r = "div",
  className: a,
  values: m,
  setValues: l,
  options: g,
  setOptions: F,
  errors: b,
  setErrors: j,
  isFetching: n,
  isSubmitting: y,
  locale: E,
  rules: S,
  hiddenFields: v,
  scannedFields: c,
  scopePath: C,
  fieldChange: P,
  children: T
}) {
  const i = D(), w = x(
    () => ({
      values: m,
      setValues: l,
      options: g,
      setOptions: F,
      errors: b,
      setErrors: j,
      isSubmitting: y,
      isFetching: n,
      locale: E,
      rules: S ?? i.rules,
      hiddenFields: v ?? i.hiddenFields,
      scannedFields: c ?? i.scannedFields,
      scopePath: C ?? i.scopePath,
      fieldChange: P ?? i.fieldChange
    }),
    [
      m,
      g,
      b,
      y,
      n,
      E,
      S,
      v,
      c,
      C,
      P,
      i
    ]
  );
  return /* @__PURE__ */ p(Z, { value: w, children: /* @__PURE__ */ p(r, { className: M(a), children: T }) });
}
function Ce({
  children: r,
  singleColumn: a = !1
}) {
  return /* @__PURE__ */ p("div", { className: M(q.items, { [q.items__Column]: a }), children: r });
}
function Pe({ className: r, children: a }) {
  return /* @__PURE__ */ p("div", { className: M(q.footer, r), children: a });
}
function we({ className: r, children: a }) {
  const { isSubmitting: m, isFetching: l } = D();
  return /* @__PURE__ */ p(
    ve,
    {
      className: r,
      type: "submit",
      disabled: l || m,
      loading: m,
      children: a
    }
  );
}
const f = Ee;
f.Error = ee;
f.Fields = Ce;
f.Item = ce;
f.Tabs = fe;
f.When = le;
f.Footer = Pe;
f.Submit = we;
f.ChildForm = Se;
export {
  f as Form
};
