import { jsx as u } from "react/jsx-runtime";
import { useState as l } from "react";
import { useNav as i } from "../../navigation/NavContext.mjs";
import { useLocaleProvider as m } from "../../locale/LocaleContext.mjs";
import a from "../useLogout.mjs";
import c from "./Logout.module.scss.mjs";
import f from "../../ui/Button/Button.mjs";
function b() {
  const { toggle: t } = i(), r = a(), [e, o] = l(!1), { auth: s } = m(), n = () => (o(!0), r().finally(() => {
    o(!1), t();
  }));
  return /* @__PURE__ */ u(
    f,
    {
      className: c.logout_button,
      type: "button",
      view: "ghost",
      loading: e,
      onClick: n,
      children: s.logout
    }
  );
}
export {
  b as Logout
};
