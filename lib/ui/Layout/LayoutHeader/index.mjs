import { jsxs as m, jsx as o } from "react/jsx-runtime";
import e from "../Layout.module.scss.mjs";
import { useNav as p } from "../../../navigation/NavContext.mjs";
import { useTheme as u } from "../../../theme/ThemeContext.mjs";
import { FiArrowLeft as f, FiX as h, FiMenu as _ } from "react-icons/fi";
import { NavLink as v } from "react-router-dom";
import b from "../../../assets/icons/index.mjs";
import a from "classnames";
function j({ logo: l = N }) {
  const { themeName: n } = u(), { close: s, collapsed: t, toggleCollapsed: c, toggle: d, visible: i } = p(), r = typeof l == "function" ? l : null;
  return /* @__PURE__ */ m(
    "header",
    {
      className: a(e.panel_Header, { [e.panel_Header__Collapsed]: t }),
      children: [
        /* @__PURE__ */ o(
          v,
          {
            to: "/",
            className: ({ isActive: g }) => a(e.logo, { [e.logo__Active]: g }),
            end: !0,
            onClick: s,
            children: r ? /* @__PURE__ */ o(r, { themeName: n }) : /* @__PURE__ */ o("img", { src: l, alt: "logo" })
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: a(e.collapseToggle, e.collapseToggle__Desktop, {
              [e.collapseToggle__Collapsed]: t
            }),
            "aria-label": "Toggle sidebar",
            "aria-expanded": !t,
            onClick: c,
            children: /* @__PURE__ */ o(f, { "aria-hidden": !0 })
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: a(e.collapseToggle, e.collapseToggle__Mobile),
            "aria-label": "Toggle navigation",
            "aria-expanded": i,
            onClick: d,
            children: i ? /* @__PURE__ */ o(h, { "aria-hidden": !0 }) : /* @__PURE__ */ o(_, { "aria-hidden": !0 })
          }
        )
      ]
    }
  );
}
const N = ({ themeName: l }) => /* @__PURE__ */ o(
  b,
  {
    name: l === "light" ? "dev-family-logo" : "dev-family-logo-inversion",
    width: 84
  }
);
export {
  j as default
};
