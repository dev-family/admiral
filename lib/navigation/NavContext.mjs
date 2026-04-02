import { jsx as p } from "react/jsx-runtime";
import { useContext as v, useState as y, useCallback as o, useMemo as C, createContext as b } from "react";
import g from "../utils/hooks/useLocalStorageState.mjs";
const a = b({}), x = "df_admin_menu_collapsed";
function _({ menu: s, children: r }) {
  const [l, c] = g(x, {
    defaultValue: !1
  }), [n, t] = y(!1), d = o(() => {
    c((e) => !e);
  }, []), u = o(() => {
    t((e) => (document.body.style.overflow = e ? "" : "hidden", !e));
  }, []), i = o(() => {
    t(!0), document.body.style.overflow = "hidden";
  }, []), f = o(() => {
    t(!1), document.body.style.overflow = "";
  }, []), m = C(
    () => ({ visible: n, toggle: u, open: i, close: f, collapsed: l, toggleCollapsed: d, menu: s }),
    [n, l, s]
  );
  return /* @__PURE__ */ p(a.Provider, { value: m, children: r });
}
function h() {
  return v(a);
}
export {
  _ as NavProvider,
  x as menuCollapsedStorageKey,
  h as useNav
};
