import { jsx as s } from "react/jsx-runtime";
import { useState as u, useMemo as l, useContext as i, createContext as a } from "react";
const d = {
  user: {
    loading: !0,
    loaded: !1,
    identity: null
  },
  setUser: () => {
  }
}, t = a(d);
function x({ children: o }) {
  const [e, r] = u({
    loading: !0,
    loaded: !1,
    identity: null
  }), n = l(() => ({ user: e, setUser: r }), [e]);
  return /* @__PURE__ */ s(t.Provider, { value: n, children: o });
}
function m() {
  return i(t);
}
export {
  t as UserContext,
  x as UserContextProvider,
  m as useUserContext
};
