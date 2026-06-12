import { jsx as m, jsxs as U } from "react/jsx-runtime";
import { useState as h, useImperativeHandle as k, useEffect as z, useMemo as O } from "react";
import { useNavigate as A } from "react-router-dom";
import { FormProvider as R, useForm as G } from "./FormContext.mjs";
import E from "./Form.module.scss.mjs";
import J from "./Item.mjs";
import K from "./FormTabs.mjs";
import B from "./Error.mjs";
import b from "classnames";
import Q from "../router/useTypedLocation.mjs";
import { getNavigationFrom as W, clearNavigationFrom as X } from "../utils/helpers/navigationState.mjs";
import Y from "../utils/hooks/useLatestRequest.mjs";
import { Notification as q } from "../ui/Notification/Notification.mjs";
import { enUS as Z } from "./locale/enUS.mjs";
import { isObject as w } from "../utils/helpers/isObject.mjs";
import $ from "../ui/Button/Button.mjs";
function D({
  locale: t = Z,
  className: r,
  fetchInitialData: e,
  submitData: s,
  redirect: c,
  children: y,
  ref: v
}) {
  var M;
  const [f, l] = h({}), [d, g] = h({}), [F, p] = h({}), [x, T] = h(!1), [I, N] = h(!0), S = A(), H = Q();
  k(v, () => ({
    values: f,
    setValues: l,
    handleSubmit: j
  }));
  const _ = Y();
  z(() => {
    if (typeof e != "function") {
      N(!1);
      return;
    }
    const n = _();
    (async () => {
      N(!0);
      try {
        const o = await e();
        if (!n()) return;
        w(o.data) && l({ ...o.data }), w(o.values) && g({ ...o.values });
      } catch {
        n() && p((o) => ({ ...o, _global: ["Fetch initial data error"] }));
      } finally {
        n() && N(!1);
      }
    })();
  }, [e, _]);
  async function j(n) {
    var C, o, V;
    n == null || n.preventDefault(), T(!0);
    try {
      if (await (s == null ? void 0 : s(f)), q({
        message: t.successMessage,
        type: "success"
      }), c === !0) {
        const a = W((C = H.state) == null ? void 0 : C.from);
        a ? (X(), S(
          { pathname: a.pathname, search: a.search },
          { state: { update: { dataTable: !0 } } }
        )) : S(-1);
      } else if (c)
        return S(
          { pathname: c },
          // update table when drawer saved and closed
          { state: { update: { dataTable: !0 } } }
        ), !0;
      return p({}), !0;
    } catch (a) {
      const i = a == null ? void 0 : a.response;
      return p(
        (i == null ? void 0 : i.status) === 422 ? ((o = i.data) == null ? void 0 : o.errors) ?? {} : {}
      ), q({
        message: ((V = i == null ? void 0 : i.data) == null ? void 0 : V.message) ?? t.serverErrorMessage,
        type: "error"
      }), !1;
    } finally {
      T(!1);
    }
  }
  const P = O(
    () => ({
      locale: t,
      values: f,
      setValues: l,
      options: d,
      setOptions: g,
      errors: F,
      setErrors: p,
      isSubmitting: x,
      isFetching: I
    }),
    [t, f, d, F, x, I]
  ), L = (M = F._global) == null ? void 0 : M[0];
  return /* @__PURE__ */ m(R, { value: P, children: /* @__PURE__ */ U("form", { onSubmit: j, className: b(r), children: [
    L && /* @__PURE__ */ m(B, { error: L }),
    y
  ] }) });
}
function tt({
  as: t = "div",
  className: r,
  values: e,
  setValues: s,
  options: c,
  setOptions: y,
  errors: v,
  setErrors: f,
  isFetching: l,
  isSubmitting: d,
  locale: g,
  children: F
}) {
  const p = O(
    () => ({
      values: e,
      setValues: s,
      options: c,
      setOptions: y,
      errors: v,
      setErrors: f,
      isSubmitting: d,
      isFetching: l,
      locale: g
    }),
    [e, c, v, d, l, g]
  );
  return /* @__PURE__ */ m(R, { value: p, children: /* @__PURE__ */ m(t, { className: b(r), children: F }) });
}
function rt({
  children: t,
  singleColumn: r = !1
}) {
  return /* @__PURE__ */ m("div", { className: b(E.items, { [E.items__Column]: r }), children: t });
}
function et({ className: t, children: r }) {
  return /* @__PURE__ */ m("div", { className: b(E.footer, t), children: r });
}
function ot({ className: t, children: r }) {
  const { isSubmitting: e, isFetching: s } = G();
  return /* @__PURE__ */ m(
    $,
    {
      className: t,
      type: "submit",
      disabled: s || e,
      loading: e,
      children: r
    }
  );
}
const u = D;
u.Error = B;
u.Fields = rt;
u.Item = J;
u.Tabs = K;
u.Footer = et;
u.Submit = ot;
u.ChildForm = tt;
export {
  u as Form
};
