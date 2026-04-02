import { jsx as g, Fragment as d } from "react/jsx-runtime";
import u from "react";
import f from "classnames";
import y from "./Typography.mjs";
import _ from "rc-util/lib/omit";
import o from "./Typography.module.scss.mjs";
function j({
  ref: n,
  className: a,
  style: i,
  type: t,
  children: c,
  component: p,
  title: s,
  ...e
}) {
  const r = _(e, ["mark", "code", "delete", "underline", "strong", "italic"]), m = h(e, /* @__PURE__ */ g(d, { children: c }));
  return /* @__PURE__ */ g(
    y,
    {
      className: f(
        {
          [o.typography__Danger]: t === "danger",
          [o.typography__Secondary]: t === "secondary",
          [o.typography__Success]: t === "success",
          [o.typography__Warning]: t === "warning"
        },
        a
      ),
      style: i,
      component: p,
      ref: n,
      ...r,
      children: m
    }
  );
}
function h({ mark: n, code: a, underline: i, delete: t, strong: c, italic: p }, s) {
  let e = s;
  function r(m, l) {
    m && (e = u.createElement(l, {}, e));
  }
  return r(c, "strong"), r(i, "u"), r(t, "del"), r(a, "code"), r(n, "mark"), r(p, "i"), e;
}
export {
  j as default
};
