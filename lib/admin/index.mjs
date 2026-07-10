import { jsx as r, jsxs as n } from "react/jsx-runtime";
/* empty css                    */
import { useMemo as u } from "react";
import { BrowserRouter as x } from "react-router-dom";
import { ThemeProvider as P } from "../theme/ThemeContext.mjs";
import { NavProvider as w } from "../navigation/NavContext.mjs";
import { AuthContextProvider as C } from "../auth/AuthContext.mjs";
import { UserContextProvider as b } from "../auth/UserContext.mjs";
import { ConfigContextProvider as g } from "../config/ConfigContext.mjs";
import { LocaleContextProvider as y } from "../locale/LocaleContext.mjs";
import { ErrorBoundary as j } from "../ui/ErrorBoundary/ErrorBoundary.mjs";
import { DataProviderContextProvider as k } from "../dataProvider/DataProviderContext.mjs";
import { NotificationHost as A } from "../ui/Notification/Notification.mjs";
const B = (e) => /* @__PURE__ */ n("div", { role: "alert", style: { padding: "24px" }, children: [
  /* @__PURE__ */ r("h1", { children: "Something went wrong" }),
  /* @__PURE__ */ r("pre", { style: { whiteSpace: "pre-wrap" }, children: e.message })
] });
function G({
  logo: e,
  loginLogo: o,
  asideContent: i,
  menu: l,
  menuPopupExtraComponents: t,
  dataProvider: d,
  authProvider: a,
  themePresets: c,
  locale: f,
  children: p,
  oauthProviders: m,
  baseAppUrl: h = "",
  errorFallback: s = B
}) {
  const v = u(
    () => ({ logo: e, loginLogo: o, asideContent: i, oauthProviders: m, menuPopupExtraComponents: t }),
    [e, o, i, m, t]
  );
  return /* @__PURE__ */ r(j, { fallback: s, children: /* @__PURE__ */ r(C, { value: a, children: /* @__PURE__ */ r(k, { value: d, children: /* @__PURE__ */ r(g, { value: v, children: /* @__PURE__ */ r(y, { value: f, children: /* @__PURE__ */ r(b, { children: /* @__PURE__ */ r(x, { basename: h, children: /* @__PURE__ */ n(P, { presets: c, children: [
    /* @__PURE__ */ r(w, { menu: l, children: p }),
    /* @__PURE__ */ r(A, {})
  ] }) }) }) }) }) }) }) });
}
export {
  G as Admin
};
