import { jsx as c } from "react/jsx-runtime";
import { useLocation as h, Link as k } from "react-router-dom";
import { getNavigationFrom as s, clearNavigationFrom as f } from "../utils/helpers/navigationState.mjs";
import p from "../ui/Button/Button.mjs";
const L = ({ basePath: i, children: e, ...o }) => {
  var n;
  const m = h(), a = s((n = m.state) == null ? void 0 : n.from), r = a ? {
    pathname: a.pathname,
    search: a.search
  } : i;
  return /* @__PURE__ */ c(k, { to: r, onClick: (l) => {
    var t;
    (t = o.onClick) == null || t.call(o, l), f();
  }, children: /* @__PURE__ */ c(p, { type: "button", component: "span", view: "secondary", ...o, children: e }) });
};
export {
  L as BackButton
};
