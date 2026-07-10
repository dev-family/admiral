import { jsxs as s, jsx as o } from "react/jsx-runtime";
import { useMemo as c } from "react";
import t from "./Layout.module.scss.mjs";
import d from "./LayoutHeader/index.mjs";
import u from "./LayoutAside/index.mjs";
import f from "./LayoutFooter/index.mjs";
import { useNav as y } from "../../navigation/NavContext.mjs";
import { useConfig as x } from "../../config/ConfigContext.mjs";
import C from "../../auth/useGetIdentity.mjs";
import L from "classnames";
function G({ children: n }) {
  const { collapsed: i } = y(), { logo: a, asideContent: p, menuPopupExtraComponents: l } = x(), { loaded: r, identity: e } = C(), m = c(() => r ? e : null, [r, e]);
  return /* @__PURE__ */ s(
    "div",
    {
      className: L(t.wrap, {
        [t.wrap__Collapsed]: i
      }),
      children: [
        /* @__PURE__ */ s("div", { className: t.panel, children: [
          /* @__PURE__ */ o(d, { logo: a }),
          /* @__PURE__ */ o(u, { user: m, children: p }),
          /* @__PURE__ */ o(f, { user: m, menuPopupExtraComponents: l })
        ] }),
        /* @__PURE__ */ o("main", { className: t.content, children: n })
      ]
    }
  );
}
export {
  G as Layout
};
