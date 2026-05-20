import { jsx as e, jsxs as c } from "react/jsx-runtime";
import { useState as S } from "react";
import t from "./Popconfirm.module.scss.mjs";
import { Tooltip as _ } from "../Tooltip/Tooltip.mjs";
import s from "../Button/Button.mjs";
import { enUS as g } from "./locale/enUS.mjs";
const k = g, y = ({
  title: l,
  onCancel: i,
  onConfirm: n,
  locale: a,
  initialOpen: m = !1,
  children: f,
  ...p
}) => {
  const r = { ...k, ...a }, [d, o] = S(m), u = (v) => {
    n && n(), o(!1);
  }, h = (v) => {
    o(!1), i && i();
  };
  return /* @__PURE__ */ e(
    _,
    {
      arrow: !0,
      interactive: !0,
      trigger: "click",
      open: d,
      onOpenChange: o,
      content: /* @__PURE__ */ c("div", { className: t.content, children: [
        /* @__PURE__ */ e("div", { className: t.title, children: l }),
        /* @__PURE__ */ c("div", { className: t.buttons, children: [
          /* @__PURE__ */ e(s, { onClick: h, view: "secondary", size: "XS", children: r.cancelTitle }),
          /* @__PURE__ */ e(s, { onClick: u, size: "XS", children: r.confirmTitle })
        ] })
      ] }),
      ...p,
      children: f
    }
  );
};
export {
  y as Popconfirm
};
