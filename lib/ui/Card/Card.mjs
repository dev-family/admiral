import { jsx as e } from "react/jsx-runtime";
import { memo as x, useRef as f } from "react";
import { useMergeRefs as L } from "@floating-ui/react";
import a from "./Card.module.scss.mjs";
import X from "classnames";
function u({ ref: o, ...l }) {
  const {
    component: t = "div",
    className: _,
    verticalSpace: r = "3xl",
    horizontalSpace: c = "3xl",
    form: n = "round",
    shadow: d = !0,
    children: i,
    ...p
  } = l, S = f(null), s = L([S, o ?? null]), m = /* @__PURE__ */ e("div", { className: a.content, children: i });
  return /* @__PURE__ */ e(
    t,
    {
      ref: s,
      className: X(
        a.card,
        {
          [a.card__FormSquare]: n === "square",
          [a.card__NoShadow]: !d,
          [a.card__SpaceVerticalXS]: r === "xs",
          [a.card__SpaceVerticalS]: r === "s",
          [a.card__SpaceVerticalM]: r === "m",
          [a.card__SpaceVerticalL]: r === "l",
          [a.card__SpaceVerticalXL]: r === "xl",
          [a.card__SpaceVertical2XL]: r === "2xl",
          [a.card__SpaceVertical3XL]: r === "3xl",
          [a.card__SpaceVertical4XL]: r === "4xl",
          [a.card__SpaceVertical5XL]: r === "5xl",
          [a.card__SpaceHorizontalXS]: c === "xs",
          [a.card__SpaceHorizontalS]: c === "s",
          [a.card__SpaceHorizontalM]: c === "m",
          [a.card__SpaceHorizontalL]: c === "l",
          [a.card__SpaceHorizontalXL]: c === "xl",
          [a.card__SpaceHorizontal2XL]: c === "2xl",
          [a.card__SpaceHorizontal3XL]: c === "3xl",
          [a.card__SpaceHorizontal4XL]: c === "4xl",
          [a.card__SpaceHorizontal5XL]: c === "5xl"
        },
        _
      ),
      ...p,
      children: m
    }
  );
}
const R = x(u);
export {
  R as default
};
