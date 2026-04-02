import { jsxs as d, jsx as r } from "react/jsx-runtime";
import { useState as _, useEffect as v } from "react";
import t from "./Spin.module.scss.mjs";
import o from "classnames";
import x from "../../assets/icons/index.mjs";
function S(s, e) {
  return !!s && !!e && !isNaN(Number(e));
}
function T({
  className: s,
  spinning: e = !0,
  style: f,
  size: a = "default",
  tip: m,
  delay: c = 0,
  wrapperClassName: p,
  children: l
}) {
  const N = S(e, c), [n, h] = _({
    spinning: e && !N
  });
  v(() => {
    let i;
    return n.spinning !== e && (i = setTimeout(() => h({ spinning: e }), e ? c : 0)), () => {
      i && clearTimeout(i);
    };
  }, [e]);
  const u = /* @__PURE__ */ d(
    "div",
    {
      style: f,
      className: o(
        t.spin,
        {
          [t.spin__Small]: a === "small",
          [t.spin__Large]: a === "large"
        },
        s
      ),
      children: [
        /* @__PURE__ */ r("span", { className: t.indicator, children: /* @__PURE__ */ r(x, { name: "spinner" }) }),
        !!m && /* @__PURE__ */ r("div", { className: t.text, children: m })
      ]
    }
  );
  return l ? /* @__PURE__ */ d("div", { className: o(t.wrapper, p), children: [
    n.spinning && /* @__PURE__ */ r("div", { children: u }, "loading"),
    /* @__PURE__ */ r(
      "div",
      {
        className: o(t.content, {
          [t.content__Blur]: n.spinning
        }),
        children: l
      },
      "container"
    )
  ] }) : u;
}
export {
  T as Spin
};
