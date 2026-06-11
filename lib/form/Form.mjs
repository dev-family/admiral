import { jsx as m, jsxs as U } from "react/jsx-runtime";
import { useState as v, useImperativeHandle as k, useEffect as z, useMemo as O } from "react";
import { useNavigate as A } from "react-router-dom";
import { FormProvider as R, useForm as G } from "./FormContext.mjs";
import E from "./Form.module.scss.mjs";
import J from "./Item.mjs";
import B from "./Error.mjs";
import y from "classnames";
import K from "../router/useTypedLocation.mjs";
import { getNavigationFrom as Q, clearNavigationFrom as W } from "../utils/helpers/navigationState.mjs";
import X from "../utils/hooks/useLatestRequest.mjs";
import { Notification as q } from "../ui/Notification/Notification.mjs";
import { enUS as Y } from "./locale/enUS.mjs";
import { isObject as w } from "../utils/helpers/isObject.mjs";
import Z from "../ui/Button/Button.mjs";
function $({
  locale: t = Y,
  className: e,
  fetchInitialData: r,
  submitData: s,
  redirect: u,
  children: b,
  ref: F
}) {
  var T;
  const [c, f] = v({}), [d, g] = v({}), [h, l] = v({}), [x, I] = v(!1), [_, N] = v(!0), S = A(), H = K();
  k(F, () => ({
    values: c,
    setValues: f,
    handleSubmit: L
  }));
  const j = X();
  z(() => {
    if (typeof r != "function") {
      N(!1);
      return;
    }
    const n = j();
    (async () => {
      N(!0);
      try {
        const o = await r();
        if (!n()) return;
        w(o.data) && f({ ...o.data }), w(o.values) && g({ ...o.values });
      } catch {
        n() && l((o) => ({ ...o, _global: ["Fetch initial data error"] }));
      } finally {
        n() && N(!1);
      }
    })();
  }, [r, j]);
  async function L(n) {
    var C, o, V;
    n == null || n.preventDefault(), I(!0);
    try {
      if (await (s == null ? void 0 : s(c)), q({
        message: t.successMessage,
        type: "success"
      }), u === !0) {
        const a = Q((C = H.state) == null ? void 0 : C.from);
        a ? (W(), S(
          { pathname: a.pathname, search: a.search },
          { state: { update: { dataTable: !0 } } }
        )) : S(-1);
      } else if (u)
        return S(
          { pathname: u },
          // update table when drawer saved and closed
          { state: { update: { dataTable: !0 } } }
        ), !0;
      return l({}), !0;
    } catch (a) {
      const i = a == null ? void 0 : a.response;
      return l(
        (i == null ? void 0 : i.status) === 422 ? ((o = i.data) == null ? void 0 : o.errors) ?? {} : {}
      ), q({
        message: ((V = i == null ? void 0 : i.data) == null ? void 0 : V.message) ?? t.serverErrorMessage,
        type: "error"
      }), !1;
    } finally {
      I(!1);
    }
  }
  const P = O(
    () => ({
      locale: t,
      values: c,
      setValues: f,
      options: d,
      setOptions: g,
      errors: h,
      setErrors: l,
      isSubmitting: x,
      isFetching: _
    }),
    [t, c, d, h, x, _]
  ), M = (T = h._global) == null ? void 0 : T[0];
  return /* @__PURE__ */ m(R, { value: P, children: /* @__PURE__ */ U("form", { onSubmit: L, className: y(e), children: [
    M && /* @__PURE__ */ m(B, { error: M }),
    b
  ] }) });
}
function D({
  as: t = "div",
  className: e,
  values: r,
  setValues: s,
  options: u,
  setOptions: b,
  errors: F,
  setErrors: c,
  isFetching: f,
  isSubmitting: d,
  locale: g,
  children: h
}) {
  const l = O(
    () => ({
      values: r,
      setValues: s,
      options: u,
      setOptions: b,
      errors: F,
      setErrors: c,
      isSubmitting: d,
      isFetching: f,
      locale: g
    }),
    [r, u, F, d, f, g]
  );
  return /* @__PURE__ */ m(R, { value: l, children: /* @__PURE__ */ m(t, { className: y(e), children: h }) });
}
function tt({
  children: t,
  singleColumn: e = !1
}) {
  return /* @__PURE__ */ m("div", { className: y(E.items, { [E.items__Column]: e }), children: t });
}
function et({ className: t, children: e }) {
  return /* @__PURE__ */ m("div", { className: y(E.footer, t), children: e });
}
function rt({ className: t, children: e }) {
  const { isSubmitting: r, isFetching: s } = G();
  return /* @__PURE__ */ m(
    Z,
    {
      className: t,
      type: "submit",
      disabled: s || r,
      loading: r,
      children: e
    }
  );
}
const p = $;
p.Error = B;
p.Fields = tt;
p.Item = J;
p.Footer = et;
p.Submit = rt;
p.ChildForm = D;
export {
  p as Form
};
