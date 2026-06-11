import { jsx as p } from "react/jsx-runtime";
import { useContext as v, useState as C, useCallback as o, useEffect as g, useMemo as b, createContext as x } from "react";
import y from "../utils/hooks/useLocalStorageState.mjs";
const a = x({}), S = "df_admin_menu_collapsed";
function P({ menu: l, children: r }) {
  const [n, c] = y(S, {
    defaultValue: !1
  }), [e, t] = C(!1), u = o(() => {
    c((s) => !s);
  }, []), d = o(() => {
    t((s) => !s);
  }, []), f = o(() => {
    t(!0);
  }, []), i = o(() => {
    t(!1);
  }, []);
  g(() => (document.body.style.overflow = e ? "hidden" : "", () => {
    document.body.style.overflow = "";
  }), [e]);
  const m = b(
    () => ({ visible: e, toggle: d, open: f, close: i, collapsed: n, toggleCollapsed: u, menu: l }),
    [e, n, l]
  );
  return /* @__PURE__ */ p(a.Provider, { value: m, children: r });
}
function V() {
  return v(a);
}
export {
  P as NavProvider,
  S as menuCollapsedStorageKey,
  V as useNav
};
