import { jsx as o, jsxs as n } from "react/jsx-runtime";
import { useEffect as d, useCallback as h } from "react";
import g from "../useCheckAuth.mjs";
import v from "../useLogin.mjs";
import { useNavigate as L } from "react-router-dom";
import { Form as a } from "../../form/Form.mjs";
import r from "./Login.module.scss.mjs";
import { useConfig as C } from "../../config/ConfigContext.mjs";
import { useTheme as w } from "../../theme/ThemeContext.mjs";
import N from "../../assets/icons/index.mjs";
import { useLocaleProvider as b } from "../../locale/LocaleContext.mjs";
import x from "./OAuthLogin.mjs";
import y from "../../ui/Card/Card.mjs";
import { TextInput as k } from "../../form/fields/TextInput.mjs";
import { PasswordInput as A } from "../../form/fields/PasswordInput.mjs";
function K({ children: t }) {
  return /* @__PURE__ */ o("div", { className: r.wrap, children: t });
}
function Q() {
  const { themeName: t } = w(), { auth: e, form: u } = b(), s = g(), m = L(), { loginLogo: i = I } = C(), l = typeof i == "function" ? i : null;
  d(() => {
    s({}, !1).then(() => {
      m("/");
    }).catch(() => {
    });
  }, [s, m]);
  const c = v(), p = h(
    (f) => c(f),
    [c]
  );
  return /* @__PURE__ */ o("div", { className: r.content, children: /* @__PURE__ */ n(y, { className: r.card, verticalSpace: "xl", horizontalSpace: "xl", children: [
    /* @__PURE__ */ o("div", { className: r.logo, children: l ? /* @__PURE__ */ o(l, { themeName: t }) : /* @__PURE__ */ o("img", { src: i, alt: "logo" }) }),
    /* @__PURE__ */ n(
      a,
      {
        submitData: p,
        locale: {
          ...u,
          successMessage: e.notification.success,
          serverErrorMessage: e.notification.error
        },
        children: [
          /* @__PURE__ */ n(a.Fields, { singleColumn: !0, children: [
            /* @__PURE__ */ o(
              k,
              {
                autoComplete: "on",
                label: e.email,
                name: "email",
                inputMode: "email",
                placeholder: e.email
              }
            ),
            /* @__PURE__ */ o(
              A,
              {
                autoComplete: "on",
                label: e.password,
                name: "password",
                placeholder: e.password,
                type: "password"
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: r.footer, children: /* @__PURE__ */ o(a.Submit, { children: e.login }) })
        ]
      }
    ),
    /* @__PURE__ */ o(x, {})
  ] }) });
}
const I = ({ themeName: t }) => /* @__PURE__ */ o(N, { name: t === "light" ? "logo-auth" : "logo-auth-inversion", width: 140 });
export {
  Q as Login,
  K as LoginLayout
};
