import { jsxs as C, jsx as t, Fragment as y } from "react/jsx-runtime";
import { useEffect as T, createContext as W, useContext as b } from "react";
import { useLocation as d, Routes as R, Route as c, Navigate as v, useParams as x } from "react-router-dom";
import { useAuthProvider as A } from "../auth/AuthContext.mjs";
import B from "../auth/useAuthState.mjs";
import { LoginLayout as S, Login as j } from "../auth/components/Login.mjs";
import { OAuthLoginCallback as w } from "../auth/components/OAuthLoginCallback.mjs";
import { Layout as $ } from "../ui/Layout/Layout.mjs";
function q({ Component: e }) {
  const o = x();
  return /* @__PURE__ */ t(e, { ...o });
}
function L({ Component: e }) {
  const o = x();
  return /* @__PURE__ */ t($, { children: /* @__PURE__ */ t(e, { ...o }) }, "layout");
}
function F({ children: e }) {
  const o = d(), { authenticated: u, loading: l } = B(), { isDefault: s } = A(), p = !s;
  return l && p ? /* @__PURE__ */ t("div", {}, "loading") : !u && p ? /* @__PURE__ */ t(v, { to: "/login", state: { nextPathname: o.pathname }, replace: !0 }) : /* @__PURE__ */ t(y, { children: e });
}
function K(e, o) {
  const u = (o == null ? void 0 : o.withAuth) ?? !0, l = {
    path: "/login",
    Component: j
  }, s = {
    path: "/oauth/:provider",
    Component: /* @__PURE__ */ t(w, {})
  }, p = Object.keys(e).reduce((r, n) => {
    const a = n.match(/\.\/pages\/(.*)\.tsx$/)[1];
    return a === "login" ? (l.Component = e[n].default, r) : (r.push({
      name: a,
      path: `/${a}`.replace("index", "/").replace("//", "/").replace(/\[([^/]+)\]/gi, ":$1"),
      Component: e[n].default
    }), r);
  }, []).reverse().sort((r, n) => {
    const a = r.name.toUpperCase(), m = n.name.toUpperCase();
    return a < m ? -1 : a > m ? 1 : 0;
  }), { path: f, Component: P } = l;
  return () => {
    const r = d(), { state: n } = r, a = n && n.background, m = n && n.routeWithBackground, h = p.find((i) => i.path === m);
    return /* @__PURE__ */ C(O, { value: r, children: [
      /* @__PURE__ */ t(N, {}),
      /* @__PURE__ */ C(R, { location: a || r, children: [
        /* @__PURE__ */ t(
          c,
          {
            path: s.path,
            element: s.Component
          },
          s.path
        ),
        u && /* @__PURE__ */ t(
          c,
          {
            path: f,
            element: /* @__PURE__ */ t(S, { children: /* @__PURE__ */ t(P, {}) }, "login-layout")
          },
          f
        ),
        p.map(
          ({ path: i, Component: g }) => u ? /* @__PURE__ */ t(
            c,
            {
              path: i,
              element: /* @__PURE__ */ t(F, { children: /* @__PURE__ */ t(L, { Component: g }) })
            },
            i
          ) : /* @__PURE__ */ t(
            c,
            {
              path: i,
              element: /* @__PURE__ */ t(L, { Component: g })
            },
            i
          )
        ),
        /* @__PURE__ */ t(c, { path: "*", element: /* @__PURE__ */ t(v, { to: "/", replace: !0 }) })
      ] }),
      a && h && /* @__PURE__ */ t(R, { children: /* @__PURE__ */ t(
        c,
        {
          path: h.path,
          element: /* @__PURE__ */ t(q, { Component: h.Component })
        },
        "routeWithBackground"
      ) })
    ] });
  };
}
function N() {
  const { pathname: e, state: o } = d(), u = (o && o.scrollTop) ?? !0;
  return T(() => {
    u && window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [e]), null;
}
const k = W(null);
function O({
  value: e,
  children: o
}) {
  return /* @__PURE__ */ t(k.Provider, { value: e, children: o });
}
function M() {
  return b(k);
}
export {
  k as TopLocationContext,
  O as TopLocationContextProvider,
  K as createRoutesFrom,
  M as useTopLocation
};
