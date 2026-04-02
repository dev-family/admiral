import { jsx as n, jsxs as v, Fragment as A } from "react/jsx-runtime";
import S, { useState as b, useEffect as x } from "react";
import { NavLink as M, useLocation as B, useParams as D } from "react-router-dom";
import { useNav as C } from "../../navigation/NavContext.mjs";
import { useTheme as j } from "../../theme/ThemeContext.mjs";
import * as I from "react-icons/fi";
import e from "./Menu.module.scss.mjs";
import r from "classnames";
import { Badge as N } from "../Badge/Badge.mjs";
import { Tooltip as w } from "../Tooltip/Tooltip.mjs";
function F({ children: l }) {
  const { themeName: i } = j();
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
  const { themeName: i } = j();
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
const q = ({ icon: l, name: i, to: m, badge: s, children: d }) => {
  const { pathname: t } = B(), o = D(), c = Object.values(o), u = S.Children.map(d, (a) => a.props), _ = u.some(
    ({ to: a }) => (c.length ? `${a}/${c.join("/")}` : a) === t
  ), k = (c.length ? `${m}/${c.join("/")}` : m) === t, { collapsed: p, visible: h } = C(), [g, f] = b(_ || k);
  return x(() => {
    f(p ? !1 : _ || k);
  }, [p]), /* @__PURE__ */ v("li", { className: r(e.item, { [e.item__Active]: _ || k }), children: [
    /* @__PURE__ */ n(
      w,
      {
        placement: "right",
        content: /* @__PURE__ */ n(L, { children: u.map((a) => /* @__PURE__ */ n(O, { ...a }, a.name)) }),
        interactive: p,
        disabled: !p || h,
        mode: "custom",
        children: /* @__PURE__ */ n(
          "div",
          {
            className: r(e.link, e.link__Toggle, {
              [e.link__Collapsible]: !0,
              [e.link__Collapsed]: p && !h,
              [e.link__ToggleOpen]: g
            }),
            onClick: () => {
              f((a) => !a);
            },
            children: /* @__PURE__ */ n(
              T,
              {
                collapsed: p && !h,
                icon: l,
                name: i,
                badge: s,
                arrow: !0
              }
            )
          }
        )
      }
    ),
    (!p || p && h) && g && /* @__PURE__ */ n(F, { children: d })
  ] });
}, G = ({ icon: l, name: i, to: m, exact: s = !1, badge: d }) => {
  const { close: t, collapsed: o, visible: c } = C();
  return /* @__PURE__ */ n("li", { className: r(e.item), children: /* @__PURE__ */ n(w, { placement: "right", content: i, interactive: !1, disabled: !o, children: /* @__PURE__ */ n(
    M,
    {
      to: m,
      className: ({ isActive: u }) => r(e.link, {
        [e.link__Collapsible]: !0,
        [e.link__Collapsed]: o && !c,
        [e.link__Active]: u
      }),
      end: s,
      onClick: () => {
        t();
      },
      children: /* @__PURE__ */ n(
        T,
        {
          icon: l,
          name: i,
          badge: d,
          collapsed: o && !c
        }
      )
    }
  ) }) });
}, O = ({ icon: l, name: i, to: m, exact: s = !1, badge: d }) => {
  const { close: t } = C();
  return /* @__PURE__ */ n("li", { className: r(e.item), children: /* @__PURE__ */ n(
    M,
    {
      to: m,
      className: ({ isActive: o }) => r(e.link, {
        [e.link__Active]: o
      }),
      end: s,
      onClick: () => {
        t();
      },
      children: /* @__PURE__ */ n(T, { collapsed: !1, icon: l, name: i, badge: d })
    }
  ) });
}, T = ({
  icon: l = "FiFileText",
  name: i,
  arrow: m = !1,
  badge: s,
  collapsed: d
}) => {
  const t = !!s, o = I[l], c = I.FiChevronDown, u = /* @__PURE__ */ n("span", { className: e.link_Title, children: i }), _ = /* @__PURE__ */ n(o, { name: l, className: e.link_Icon });
  return /* @__PURE__ */ v(A, { children: [
    t && d ? /* @__PURE__ */ n(N, { ...s, size: "XS", className: r(e.link_BadgeIconWrapper), children: _ }) : _,
    /* @__PURE__ */ n("div", { className: e.link_TitleWrapper, children: t && s.dot ? /* @__PURE__ */ n(N, { ...s, size: "XS", className: e.link_DotBadge, children: u }) : /* @__PURE__ */ v(A, { children: [
      u,
      t && /* @__PURE__ */ n(N, { size: "S", ...s })
    ] }) }),
    m && /* @__PURE__ */ n("div", { className: e.link_Arrow, children: /* @__PURE__ */ n(c, {}) })
  ] });
};
export {
  F as Menu,
  G as MenuItemLink,
  q as SubMenu
};
