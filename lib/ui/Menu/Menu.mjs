import { jsx as n, jsxs as C, Fragment as A } from "react/jsx-runtime";
import w, { useState as x, useEffect as S } from "react";
import { NavLink as b, useLocation as B, useParams as D } from "react-router-dom";
import { useNav as T } from "../../navigation/NavContext.mjs";
import { useTheme as M } from "../../theme/ThemeContext.mjs";
import * as I from "react-icons/fi";
import e from "./Menu.module.scss.mjs";
import r from "classnames";
import { Tooltip as j } from "../Tooltip/Tooltip.mjs";
import { Badge as v } from "../Badge/Badge.mjs";
function F({ children: l }) {
  const { themeName: i } = M();
  return /* @__PURE__ */ n(
    "ul",
    {
      className: r(e.menu, {
        [e.menu__Dark]: i === "dark"
      }),
      children: l
    }
  );
}
function L({ children: l }) {
  const { themeName: i } = M();
  return /* @__PURE__ */ n(
    "ul",
    {
      className: r(e.menu, e.menu__Tooltip, {
        [e.menu__Dark]: i === "dark"
      }),
      children: l
    }
  );
}
const q = ({ icon: l, name: i, to: m, badge: t, children: d }) => {
  const { pathname: s } = B(), o = D(), c = Object.values(o), u = w.Children.map(d, (a) => a.props), h = u.some(
    ({ to: a }) => (c.length ? `${a}/${c.join("/")}` : a) === s
  ), k = (c.length ? `${m}/${c.join("/")}` : m) === s, { collapsed: p, visible: _ } = T(), [f, N] = x(h || k);
  return S(() => {
    N(p ? !1 : h || k);
  }, [p]), /* @__PURE__ */ C("li", { className: r(e.item, { [e.item__Active]: h || k }), children: [
    /* @__PURE__ */ n(
      j,
      {
        placement: "right",
        content: /* @__PURE__ */ n(L, { children: u.map((a) => /* @__PURE__ */ n(O, { ...a }, a.name)) }),
        interactive: p,
        disabled: !p || _,
        mode: "custom",
        children: /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: r(e.link, e.link__Toggle, {
              [e.link__Collapsible]: !0,
              [e.link__Collapsed]: p && !_,
              [e.link__ToggleOpen]: f
            }),
            "aria-expanded": f,
            onClick: () => {
              N((a) => !a);
            },
            children: /* @__PURE__ */ n(
              g,
              {
                collapsed: p && !_,
                icon: l,
                name: i,
                badge: t,
                arrow: !0
              }
            )
          }
        )
      }
    ),
    (!p || p && _) && f && /* @__PURE__ */ n(F, { children: d })
  ] });
}, G = ({ icon: l, name: i, to: m, exact: t = !1, badge: d }) => {
  const { close: s, collapsed: o, visible: c } = T();
  return /* @__PURE__ */ n("li", { className: r(e.item), children: /* @__PURE__ */ n(j, { placement: "right", content: i, interactive: !1, disabled: !o, children: /* @__PURE__ */ n(
    b,
    {
      to: m,
      className: ({ isActive: u }) => r(e.link, {
        [e.link__Collapsible]: !0,
        [e.link__Collapsed]: o && !c,
        [e.link__Active]: u
      }),
      end: t,
      onClick: () => {
        s();
      },
      children: /* @__PURE__ */ n(
        g,
        {
          icon: l,
          name: i,
          badge: d,
          collapsed: o && !c
        }
      )
    }
  ) }) });
}, O = ({ icon: l, name: i, to: m, exact: t = !1, badge: d }) => {
  const { close: s } = T();
  return /* @__PURE__ */ n("li", { className: r(e.item), children: /* @__PURE__ */ n(
    b,
    {
      to: m,
      className: ({ isActive: o }) => r(e.link, {
        [e.link__Active]: o
      }),
      end: t,
      onClick: () => {
        s();
      },
      children: /* @__PURE__ */ n(g, { collapsed: !1, icon: l, name: i, badge: d })
    }
  ) });
}, g = ({
  icon: l = "FiFileText",
  name: i,
  arrow: m = !1,
  badge: t,
  collapsed: d
}) => {
  const s = !!t, o = I[l], c = I.FiChevronDown, u = /* @__PURE__ */ n("span", { className: e.link_Title, children: i }), h = /* @__PURE__ */ n(o, { "aria-hidden": !0, className: e.link_Icon });
  return /* @__PURE__ */ C(A, { children: [
    s && d ? /* @__PURE__ */ n(v, { ...t, size: "XS", className: r(e.link_BadgeIconWrapper), children: h }) : h,
    /* @__PURE__ */ n("div", { className: e.link_TitleWrapper, children: s && t.dot ? /* @__PURE__ */ n(v, { ...t, size: "XS", className: e.link_DotBadge, children: u }) : /* @__PURE__ */ C(A, { children: [
      u,
      s && /* @__PURE__ */ n(v, { size: "S", ...t })
    ] }) }),
    m && /* @__PURE__ */ n("div", { className: e.link_Arrow, "aria-hidden": !0, children: /* @__PURE__ */ n(c, {}) })
  ] });
};
export {
  F as Menu,
  G as MenuItemLink,
  q as SubMenu
};
