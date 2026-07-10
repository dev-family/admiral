import { jsx as c } from "react/jsx-runtime";
import { Link as h } from "react-router-dom";
import f from "../router/useTypedLocation.mjs";
import { getNavigationFrom as k, clearNavigationFrom as p } from "../utils/helpers/navigationState.mjs";
import s from "../ui/Button/Button.mjs";
const L = ({ basePath: i, children: e, ...o }) => {
  var t;
  const m = f(), a = k((t = m.state) == null ? void 0 : t.from), r = a ? {
    pathname: a.pathname,
    search: a.search
  } : i;
  return /* @__PURE__ */ c(h, { to: r, onClick: (l) => {
    var n;
    (n = o.onClick) == null || n.call(o, l), p();
  }, children: /* @__PURE__ */ c(s, { type: "button", component: "span", view: "secondary", ...o, children: e }) });
};
export {
  L as BackButton
};
