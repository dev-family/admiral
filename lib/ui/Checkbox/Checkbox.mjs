import { jsxs as n, jsx as t } from "react/jsx-runtime";
import { memo as i } from "react";
import k from "classnames";
import o from "./Checkbox.module.scss.mjs";
import f from "../Choice/Choice.mjs";
function l({
  className: m,
  children: c,
  style: r,
  onMouseEnter: p,
  onMouseLeave: s,
  size: x,
  align: e = "top",
  ref: b,
  ..._
}) {
  const h = { ..._ };
  return /* @__PURE__ */ n(
    "label",
    {
      className: k(
        o.checkbox,
        {
          [o.checkbox__Large]: x === "l",
          [o.checkbox__AlignTop]: e === "top",
          [o.checkbox__AlignCenter]: e === "center",
          [o.checkbox__AlignBottom]: e === "bottom",
          [o.checkbox__Empty]: !c
        },
        m
      ),
      style: r,
      onMouseEnter: p,
      onMouseLeave: s,
      children: [
        /* @__PURE__ */ t(f, { ...h, ref: b }),
        c && /* @__PURE__ */ t("span", { children: c })
      ]
    }
  );
}
const j = i(l);
export {
  j as default
};
