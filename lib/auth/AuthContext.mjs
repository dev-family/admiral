import { jsx as s } from "react/jsx-runtime";
import { useMemo as u, useContext as n, createContext as l } from "react";
const m = {
  loginUrl: "/login",
  afterLoginUrl: "/"
}, r = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  getIdentity: () => Promise.reject(),
  oauthLogin: (e) => Promise.resolve({ redirect: e }),
  oauthCallback: (e, o) => Promise.resolve()
}, t = l({
  ...r,
  isDefault: !0
});
t.displayName = "AuthContext";
function d({
  value: e,
  children: o
}) {
  const i = u(
    () => e ? { ...e, isDefault: !1 } : { ...r, isDefault: !0 },
    [e]
  );
  return /* @__PURE__ */ s(t.Provider, { value: i, children: o });
}
function f() {
  return n(t);
}
export {
  t as AuthContext,
  d as AuthContextProvider,
  m as defaultAuthParams,
  f as useAuthProvider
};
