import { jsxs as n, Fragment as a, jsx as o } from "react/jsx-runtime";
import { useState as c } from "react";
import { useNav as m } from "../../../navigation/NavContext.mjs";
import l from "classnames";
import { UserCard as d } from "../../../auth/components/User.mjs";
import u from "../../../auth/useLogout.mjs";
import { FiLogOut as f } from "react-icons/fi";
import e from "../Layout.module.scss.mjs";
import { ThemeSwitch as p } from "../../ThemeSwitch/ThemeSwitch.mjs";
import h from "../../Button/Button.mjs";
function w({
  user: r,
  children: i
}) {
  const { visible: s, menu: t } = m();
  return /* @__PURE__ */ n(a, { children: [
    /* @__PURE__ */ n("div", { className: l(e.panel_Content), children: [
      /* @__PURE__ */ o(t, {}),
      i
    ] }),
    /* @__PURE__ */ o("div", { className: l(e.modal, { [e.modal__Visible]: s }), children: /* @__PURE__ */ o("div", { className: e.modal_Layout, children: /* @__PURE__ */ n("div", { className: e.modal_Inner, children: [
      r && /* @__PURE__ */ o("div", { className: e.modal_User, children: /* @__PURE__ */ o(d, { ...r, children: /* @__PURE__ */ n("div", { className: e.modal_UserControls, children: [
        /* @__PURE__ */ o(p, {}),
        /* @__PURE__ */ o(v, {})
      ] }) }) }),
      /* @__PURE__ */ o("div", { className: e.modal_Menu, children: /* @__PURE__ */ o(t, {}) }),
      i
    ] }) }) })
  ] });
}
function v() {
  const { toggle: r } = m(), i = u(), [s, t] = c(!1);
  return /* @__PURE__ */ o(
    h,
    {
      type: "button",
      view: "secondary",
      iconLeft: /* @__PURE__ */ o(f, {}),
      loading: s,
      onClick: () => (t(!0), i().finally(() => {
        t(!1), r();
      }))
    }
  );
}
export {
  w as default
};
