import { jsx as t } from "react/jsx-runtime";
import { useTransition as o, animated as s } from "@react-spring/web";
import a from "./Form.module.scss.mjs";
function c({ show: r, children: i }) {
  return o(r, {
    from: { opacity: 0, translateY: 4 },
    enter: { opacity: 1, translateY: 0 },
    reverse: r,
    config: { tension: 90, friction: 10, precision: 0.1, duration: 160 }
  })(
    (n, e) => e && /* @__PURE__ */ t(s.div, { style: n, children: i })
  );
}
function p({ error: r }) {
  return /* @__PURE__ */ t(c, { show: !!r, children: /* @__PURE__ */ t("div", { className: a.item_Error, children: r }) });
}
export {
  p as default
};
