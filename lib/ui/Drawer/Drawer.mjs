import { jsx as o, jsxs as u } from "react/jsx-runtime";
import { useRef as F, useImperativeHandle as H } from "react";
import { useTheme as q } from "../../theme/ThemeContext.mjs";
import { FiX as z } from "react-icons/fi";
import E from "rc-drawer";
import I from "classnames";
import r from "./Drawer.module.scss.mjs";
function G({
  ref: h,
  visible: y,
  onClose: n,
  resetScrollPositionOnClose: f = !0,
  getContainer: N,
  bodyWrapperStyle: w,
  bodyStyle: v,
  headerStyle: b,
  footer: d,
  footerStyle: k,
  closable: c = !0,
  title: a,
  width: x,
  height: C,
  placement: t = "right",
  showMask: l = !0,
  maskClosable: g = !0,
  keyboard: R = !0,
  afterVisibleChange: i,
  children: T,
  ..._
}) {
  const { themeClassNames: e } = q(), m = F(null), j = () => document.querySelector("body");
  H(
    h,
    () => ({
      bodyElement: () => m.current
    }),
    []
  );
  const A = !!a || c, D = !!d;
  return /* @__PURE__ */ o(
    E,
    {
      prefixCls: "drawer",
      placement: t,
      open: y,
      onClose: n,
      getContainer: N || j,
      rootClassName: I(
        e.color.primary,
        e.control,
        e.font,
        e.shadow,
        e.size,
        e.space,
        r.wrapper,
        { [r.wrapper__NoMask]: !l }
      ),
      width: t === "left" || t === "right" ? x ?? 400 : void 0,
      height: t === "top" || t === "bottom" ? C ?? 400 : void 0,
      mask: l,
      maskMotion: {
        motionAppear: !0,
        motionName: "drawer-mask"
      },
      motion: (s) => ({
        motionAppear: !0,
        motionName: `drawer-panel-${s}`
      }),
      afterOpenChange: (s) => {
        var p;
        !s && f && ((p = m.current) == null || p.scrollTo(0, 0)), i == null || i(s);
      },
      keyboard: R,
      maskClosable: g,
      ..._,
      children: /* @__PURE__ */ u("div", { className: r.bodyWrapper, style: w, children: [
        A && /* @__PURE__ */ u("div", { className: r.header, style: b, children: [
          !!a && /* @__PURE__ */ o("div", { className: r.header_Title, children: a }),
          c && /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              onClick: n,
              "aria-label": "Close",
              className: r.close,
              children: /* @__PURE__ */ o(z, {})
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: r.body, style: v, ref: m, children: T }),
        D && /* @__PURE__ */ o("div", { className: r.footer, style: k, children: d })
      ] })
    }
  );
}
export {
  G as Drawer
};
