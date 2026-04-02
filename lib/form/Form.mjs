import { jsx as i, jsxs as q } from "react/jsx-runtime";
import { useState as g, useImperativeHandle as z, useEffect as A, useMemo as T } from "react";
import { useNavigate as G, useLocation as J } from "react-router-dom";
import { FormProvider as B, useForm as K } from "./FormContext.mjs";
import S from "./Form.module.scss.mjs";
import Q from "./Item.mjs";
import H from "./Error.mjs";
import v from "classnames";
import { getNavigationFrom as R, clearNavigationFrom as W } from "../utils/helpers/navigationState.mjs";
import { isObject as L } from "../utils/helpers/isObject.mjs";
import { Notification as O } from "../ui/Notification/Notification.mjs";
import { enUS as X } from "./locale/enUS.mjs";
import Y from "../ui/Button/Button.mjs";
function Z({
  locale: t = X,
  className: r,
  fetchInitialData: o,
  submitData: s,
  redirect: m,
  children: F,
  ref: h
}) {
  var j;
  const [n, f] = g({}), [l, p] = g({}), [d, c] = g({}), [E, x] = g(!1), [C, I] = g(!0), y = G(), P = J();
  async function U() {
    try {
      const e = await o();
      L(e.data) && f({ ...e.data }), L(e.values) && p({ ...e.values });
    } catch {
      c((e) => ({ ...e, _global: ["Fetch initial data error"] }));
    } finally {
      I(!1);
    }
  }
  z(
    h,
    () => ({
      values: n,
      handleSubmit: b
    }),
    [n, b]
  ), A(() => {
    typeof o == "function" ? U() : I(!1);
  }, [o]);
  async function b(e) {
    var M, V, w;
    e == null || e.preventDefault(), x(!0);
    try {
      if (await (s == null ? void 0 : s(n)), O({
        message: t.successMessage,
        type: "success"
      }), m === !0) {
        const { state: a } = P, N = R(a == null ? void 0 : a.from);
        N ? (W(), y(
          { pathname: N.pathname, search: N.search },
          { state: { update: { dataTable: !0 } } }
        )) : y(-1);
      } else if (m) {
        y(
          { pathname: m },
          // update table when drawer saved and closed
          { state: { update: { dataTable: !0 } } }
        );
        return;
      }
      c({});
    } catch (a) {
      c(((M = a.response) == null ? void 0 : M.status) === 422 ? a.response.data.errors : {}), O({
        message: ((w = (V = a.response) == null ? void 0 : V.data) == null ? void 0 : w.message) ?? t.serverErrorMessage,
        type: "error"
      });
    } finally {
      x(!1);
    }
  }
  const k = T(
    () => ({
      locale: t,
      values: n,
      setValues: f,
      options: l,
      setOptions: p,
      errors: d,
      setErrors: c,
      isSubmitting: E,
      isFetching: C
    }),
    [t, n, l, d, E, C]
  ), _ = (j = d._global) == null ? void 0 : j[0];
  return /* @__PURE__ */ i(B, { value: k, children: /* @__PURE__ */ q("form", { onSubmit: b, className: v(r), children: [
    _ && /* @__PURE__ */ i(H, { error: _ }),
    F
  ] }) });
}
function $({
  as: t = "div",
  className: r,
  values: o,
  setValues: s,
  options: m,
  setOptions: F,
  errors: h,
  setErrors: n,
  isFetching: f,
  isSubmitting: l,
  locale: p,
  children: d
}) {
  const c = T(
    () => ({
      values: o,
      setValues: s,
      options: m,
      setOptions: F,
      errors: h,
      setErrors: n,
      isSubmitting: l,
      isFetching: f,
      locale: p
    }),
    [o, m, h, l, f, p]
  );
  return /* @__PURE__ */ i(B, { value: c, children: /* @__PURE__ */ i(t, { className: v(r), children: d }) });
}
function D({
  children: t,
  singleColumn: r = !1
}) {
  return /* @__PURE__ */ i("div", { className: v(S.items, { [S.items__Column]: r }), children: t });
}
function tt({ className: t, children: r }) {
  return /* @__PURE__ */ i("div", { className: v(S.footer, t), children: r });
}
function et({ className: t, children: r }) {
  const { isSubmitting: o, isFetching: s } = K();
  return /* @__PURE__ */ i(
    Y,
    {
      className: t,
      type: "submit",
      disabled: s || o,
      loading: o,
      children: r
    }
  );
}
const u = Z;
u.Error = H;
u.Fields = D;
u.Item = Q;
u.Footer = tt;
u.Submit = et;
u.ChildForm = $;
export {
  u as Form
};
