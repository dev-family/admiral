import { jsxs as g, jsx as t, Fragment as P } from "react/jsx-runtime";
import { createContext as T, useContext as W, useEffect as b } from "react";
import { Routes as C, Route as s, Navigate as R, useLocation as A, useParams as v } from "react-router-dom";
import { useAuthProvider as B } from "../auth/AuthContext.mjs";
import S from "../auth/useAuthState.mjs";
import { LoginLayout as j, Login as w } from "../auth/components/Login.mjs";
import x from "./useTypedLocation.mjs";
import { OAuthLoginCallback as $ } from "../auth/components/OAuthLoginCallback.mjs";
import { Layout as q } from "../ui/Layout/Layout.mjs";
function F({ Component: o }) {
  const e = v();
  return /* @__PURE__ */ t(o, { ...e });
}
function L({ Component: o }) {
  const e = v();
  return /* @__PURE__ */ t(q, { children: /* @__PURE__ */ t(o, { ...e }) }, "layout");
}
function N({ children: o }) {
  const e = A(), { authenticated: i, loading: m } = S(), { isDefault: l } = B(), p = !l;
  return m && p ? /* @__PURE__ */ t("div", {}, "loading") : !i && p ? /* @__PURE__ */ t(R, { to: "/login", state: { nextPathname: e.pathname }, replace: !0 }) : /* @__PURE__ */ t(P, { children: o });
}
function Q(o, e) {
  const i = (e == null ? void 0 : e.withAuth) ?? !0, m = {
    path: "/login",
    Component: w
  }, l = {
    path: "/oauth/:provider",
    element: /* @__PURE__ */ t($, {})
  }, p = Object.keys(o).reduce((n, r) => {
    const a = r.match(/\.\/pages\/(.*)\.tsx$/);
    if (!a)
      return n;
    const u = a[1];
    return u === "login" ? (m.Component = o[r].default, n) : (n.push({
      name: u,
      path: `/${u}`.replace("index", "/").replace("//", "/").replace(/\[([^/]+)\]/gi, ":$1"),
      Component: o[r].default
    }), n);
  }, []).reverse().sort((n, r) => {
    const a = n.name.toUpperCase(), u = r.name.toUpperCase();
    return a < u ? -1 : a > u ? 1 : 0;
  }), { path: d, Component: y } = m;
  return () => {
    const n = x(), { state: r } = n, a = r && r.background, u = r && r.routeWithBackground, h = p.find((c) => c.path === u);
    return /* @__PURE__ */ g(U, { value: n, children: [
      /* @__PURE__ */ t(O, {}),
      /* @__PURE__ */ g(C, { location: a || n, children: [
        /* @__PURE__ */ t(
          s,
          {
            path: l.path,
            element: l.element
          },
          l.path
        ),
        i && /* @__PURE__ */ t(
          s,
          {
            path: d,
            element: /* @__PURE__ */ t(j, { children: /* @__PURE__ */ t(y, {}) }, "login-layout")
          },
          d
        ),
        p.map(
          ({ path: c, Component: f }) => i ? /* @__PURE__ */ t(
            s,
            {
              path: c,
              element: /* @__PURE__ */ t(N, { children: /* @__PURE__ */ t(L, { Component: f }) })
            },
            c
          ) : /* @__PURE__ */ t(
            s,
            {
              path: c,
              element: /* @__PURE__ */ t(L, { Component: f })
            },
            c
          )
        ),
        /* @__PURE__ */ t(s, { path: "*", element: /* @__PURE__ */ t(R, { to: "/", replace: !0 }) })
      ] }),
      a && h && /* @__PURE__ */ t(C, { children: /* @__PURE__ */ t(
        s,
        {
          path: h.path,
          element: /* @__PURE__ */ t(F, { Component: h.Component })
        },
        "routeWithBackground"
      ) })
    ] });
  };
}
function O() {
  const { pathname: o, state: e } = x(), i = (e && e.scrollTop) ?? !0;
  return b(() => {
    i && window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [o]), null;
}
const k = T(
  null
);
function U({
  value: o,
  children: e
}) {
  return /* @__PURE__ */ t(k.Provider, { value: o, children: e });
}
function V() {
  return W(k);
}
export {
  k as TopLocationContext,
  U as TopLocationContextProvider,
  Q as createRoutesFrom,
  V as useTopLocation
};
