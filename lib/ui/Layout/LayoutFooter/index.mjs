import { jsx as e, jsxs as s, Fragment as l } from "react/jsx-runtime";
import { useNav as a } from "../../../navigation/NavContext.mjs";
import { FiSettings as m } from "react-icons/fi";
import c from "classnames";
import { UserCard as d } from "../../../auth/components/User.mjs";
import { Logout as n } from "../../../auth/components/Logout.mjs";
import t from "../Layout.module.scss.mjs";
import { Tooltip as p } from "../../Tooltip/Tooltip.mjs";
import { ThemeSwitch as f } from "../../ThemeSwitch/ThemeSwitch.mjs";
function y({ user: r, menuPopupExtraComponents: o }) {
  const { collapsed: i } = a();
  return /* @__PURE__ */ e("footer", { className: t.panel_Footer, children: /* @__PURE__ */ e("div", { className: c(t.user, { [t.user__Collapsed]: i }), children: /* @__PURE__ */ e(
    p,
    {
      placement: "right",
      content: /* @__PURE__ */ s("div", { className: t.userTooltip, children: [
        o ? /* @__PURE__ */ e("div", { className: t.userTooltip__extra, children: o }) : /* @__PURE__ */ e(l, {}),
        /* @__PURE__ */ s("div", { className: t.userTooltip__default, children: [
          r && /* @__PURE__ */ e(n, {}),
          /* @__PURE__ */ e("div", { className: t.themeSwitch, children: /* @__PURE__ */ e(f, {}) })
        ] })
      ] }),
      interactive: !0,
      offset: [0, 34],
      children: r ? /* @__PURE__ */ e("div", { className: t.userCard, children: /* @__PURE__ */ e(d, { ...r, collapsed: i }) }) : /* @__PURE__ */ e("button", { type: "button", className: t.settings, children: /* @__PURE__ */ e(m, {}) })
    }
  ) }) });
}
export {
  y as default
};
