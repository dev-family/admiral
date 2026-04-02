import { jsx as d } from "react/jsx-runtime";
import f, { createElement as N } from "react";
import O from "classnames";
import p from "./Badge.module.scss.mjs";
function b({ value: n, current: o, offset: r = 0 }) {
  let e;
  return r && (e = {
    position: "absolute",
    top: `${r}00%`,
    left: 0
  }), /* @__PURE__ */ d(
    "span",
    {
      style: e,
      className: O(p.scrollNumber_OnlyUnit, {
        current: o
      }),
      children: n
    }
  );
}
function U(n, o, r) {
  let e = n, s = 0;
  for (; (e + 10) % 10 !== o; )
    e += r, s += r;
  return s;
}
function P(n) {
  const { count: o, value: r } = n, e = Number(r), s = Math.abs(o), [u, v] = f.useState(e), [y, g] = f.useState(s), h = () => {
    v(e), g(s);
  };
  let l, i;
  if (u === e || Number.isNaN(e) || Number.isNaN(u))
    l = [/* @__PURE__ */ N(b, { ...n, key: e, current: !0 })], i = {
      transition: "none"
    };
  else {
    const x = e + 10, a = [];
    for (let t = e; t <= x; t += 1)
      a.push(t);
    const c = a.findIndex((t) => t % 10 === u);
    l = a.map((t, m) => {
      const C = t % 10;
      return /* @__PURE__ */ N(
        b,
        {
          ...n,
          key: t,
          value: C,
          offset: m - c,
          current: m === c
        }
      );
    });
    const S = y < s ? 1 : -1;
    i = {
      transform: `translateY(${-U(u, e, S)}00%)`
    };
  }
  return /* @__PURE__ */ d(
    "span",
    {
      className: p.scrollNumber_Only,
      style: i,
      onTransitionEnd: h,
      children: l
    }
  );
}
export {
  P as default
};
