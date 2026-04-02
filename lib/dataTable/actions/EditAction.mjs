import { jsx as r } from "react/jsx-runtime";
import { useLocation as c, Link as a } from "react-router-dom";
import { FiEdit3 as l } from "react-icons/fi";
import { saveNavigationFrom as u } from "../../utils/helpers/navigationState.mjs";
import d from "../../ui/Button/Button.mjs";
function h({
  buttonProps: e,
  pathname: n,
  behavior: t = "default",
  mainRoutePath: i
}) {
  const o = c();
  return t === "backgroundRoute" && !i && console.error('Please provide "mainRoutePath" for "backgroundRoute" behavior'), /* @__PURE__ */ r(
    a,
    {
      to: n,
      state: t === "backgroundRoute" ? {
        background: o,
        routeWithBackground: i,
        scrollTop: !1
      } : {
        from: o
      },
      onClick: () => {
        u(o);
      },
      children: /* @__PURE__ */ r(d, { view: "clear", size: "S", iconRight: /* @__PURE__ */ r(l, {}), ...e })
    }
  );
}
export {
  h as EditAction
};
