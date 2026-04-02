import { jsx as i, Fragment as u, jsxs as h } from "react/jsx-runtime";
import { useCallback as f } from "react";
import { FaJira as g, FaGithub as d, FaGoogle as L } from "react-icons/fa";
import { useAuthProvider as p } from "../AuthContext.mjs";
import { useConfig as A } from "../../config/ConfigContext.mjs";
import { useLocaleProvider as F } from "../../locale/LocaleContext.mjs";
import { OAuthProvidersEnum as e } from "../interfaces.mjs";
import r from "./Login.module.scss.mjs";
import C from "../../ui/Button/Button.mjs";
const w = () => {
  const t = p(), n = A().oauthProviders, { auth: s } = F(), a = {
    [e.Google]: /* @__PURE__ */ i(L, {}),
    [e.Github]: /* @__PURE__ */ i(d, {}),
    [e.Jira]: /* @__PURE__ */ i(g, {})
  }, c = (o) => a[o], l = f(
    (o) => {
      t != null && t.oauthLogin && (t == null || t.oauthLogin(o).then((m) => {
        window.location.href = m.redirect;
      }));
    },
    [t]
  );
  return !n || n.length === 0 ? /* @__PURE__ */ i(u, {}) : /* @__PURE__ */ h("div", { className: r.socialLogin, children: [
    /* @__PURE__ */ i("div", { className: r.socialLoginTitle, children: s.oauth }),
    /* @__PURE__ */ i("div", { className: r.socialLoginButtons, children: n == null ? void 0 : n.map((o) => /* @__PURE__ */ i(
      C,
      {
        onClick: () => l(o),
        className: r.socialLoginButton,
        iconLeft: c(o),
        children: o
      },
      o
    )) })
  ] });
};
export {
  w as default
};
