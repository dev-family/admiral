import { jsxs as p, jsx as e } from "react/jsx-runtime";
import o from "../Layout.module.scss.mjs";
import { useNav as d } from "../../../navigation/NavContext.mjs";
import { useTheme as f } from "../../../theme/ThemeContext.mjs";
import { FiArrowLeft as u, FiX as _, FiMenu as h } from "react-icons/fi";
import { NavLink as v } from "react-router-dom";
import N from "../../../assets/icons/index.mjs";
import t from "classnames";
function j({ logo: l = C }) {
  const { themeName: r } = f(), { close: i, collapsed: a, toggleCollapsed: n, toggle: c, visible: m } = d(), s = typeof l == "function" ? l : null;
  return /* @__PURE__ */ p(
    "header",
    {
      className: t(o.panel_Header, { [o.panel_Header__Collapsed]: a }),
      children: [
        /* @__PURE__ */ e(
          v,
          {
            to: "/",
            className: ({ isActive: g }) => t(o.logo, { [o.logo__Active]: g }),
            end: !0,
            onClick: i,
            children: s ? /* @__PURE__ */ e(s, { themeName: r }) : /* @__PURE__ */ e("img", { src: l, alt: "logo" })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: t(o.collapseToggle, o.collapseToggle__Desktop, {
              [o.collapseToggle__Collapsed]: a
            }),
            onClick: n,
            children: /* @__PURE__ */ e(u, {})
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: t(o.collapseToggle, o.collapseToggle__Mobile),
            onClick: c,
            children: m ? /* @__PURE__ */ e(_, {}) : /* @__PURE__ */ e(h, {})
          }
        )
      ]
    }
  );
}
const C = ({ themeName: l }) => /* @__PURE__ */ e(
  N,
  {
    name: l === "light" ? "dev-family-logo" : "dev-family-logo-inversion",
    width: 84
  }
);
export {
  j as default
};
