import { jsx as r } from "react/jsx-runtime";
import { useTransition as a, animated as c } from "react-spring";
import m from "./Form.module.scss.mjs";
function f({ show: t, children: i }) {
  const n = a(t, {
    from: { opacity: 0, translateY: 4 },
    enter: { opacity: 1, translateY: 0 },
    reverse: t,
    config: { tension: 90, friction: 10, precision: 0.1, duration: 160 }
  }), e = c.div;
  return n(
    (o, s) => s && /* @__PURE__ */ r(e, { style: o, children: i })
  );
}
function u({ error: t }) {
  return /* @__PURE__ */ r(f, { show: !!t, children: /* @__PURE__ */ r("div", { className: m.item_Error, children: t }) });
}
export {
  u as default
};
