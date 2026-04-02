import { jsx as r } from "react/jsx-runtime";
/* empty css                    */
import { useMemo as h } from "react";
import { BrowserRouter as u } from "react-router-dom";
import { ThemeProvider as x } from "../theme/ThemeContext.mjs";
import { NavProvider as P } from "../navigation/NavContext.mjs";
import { AuthContextProvider as s } from "../auth/AuthContext.mjs";
import { UserContextProvider as C } from "../auth/UserContext.mjs";
import { ConfigContextProvider as A } from "../config/ConfigContext.mjs";
import { LocaleContextProvider as b } from "../locale/LocaleContext.mjs";
import { DataProviderContextProvider as j } from "../dataProvider/DataProviderContext.mjs";
function y({
  logo: e,
  loginLogo: o,
  asideContent: i,
  menu: d,
  menuPopupExtraComponents: t,
  dataProvider: n,
  authProvider: f,
  themePresets: v,
  locale: c,
  children: l,
  oauthProviders: m,
  baseAppUrl: p = ""
}) {
  const a = h(
    () => ({ logo: e, loginLogo: o, asideContent: i, oauthProviders: m, menuPopupExtraComponents: t }),
    [e, o, i, m, t]
  );
  return /* @__PURE__ */ r(s, { value: f, children: /* @__PURE__ */ r(j, { value: n, children: /* @__PURE__ */ r(A, { value: a, children: /* @__PURE__ */ r(b, { value: c, children: /* @__PURE__ */ r(C, { children: /* @__PURE__ */ r(u, { basename: p, children: /* @__PURE__ */ r(x, { presets: v, children: /* @__PURE__ */ r(P, { menu: d, children: l }) }) }) }) }) }) }) });
}
export {
  y as Admin
};
