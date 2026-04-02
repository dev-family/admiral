import { jsxs as $, jsx as t } from "react/jsx-runtime";
import C, { useRef as y, useEffect as F } from "react";
import u from "classnames";
import { useNotification as g } from "rc-notification";
import { createRoot as v } from "react-dom/client";
import { FiAlertCircle as x, FiXCircle as R, FiInfo as b, FiCheckCircle as I, FiX as p } from "react-icons/fi";
import n from "./Notification.module.scss.mjs";
import { getMotion as k, getPlacementStyle as w } from "./util.mjs";
import { ThemeProvider as h } from "../../theme/ThemeContext.mjs";
const o = "notification", A = "topLeft", E = 24, H = 24, P = {
  success: I,
  info: b,
  error: R,
  warning: x
};
function T({
  icon: e,
  type: i,
  message: c,
  description: r,
  closable: s
}) {
  let l = null;
  return e ? l = /* @__PURE__ */ t("span", { className: n[`${o}-icon`], children: e }) : i && (l = C.createElement(P[i] || null, {
    className: u(n[`${o}-icon`], n[`${o}-icon-${i}`])
  })), /* @__PURE__ */ $(
    "div",
    {
      className: u(n[`${o}-content`], {
        [n[`${o}-with-icon`]]: l,
        [n[`${o}-closable`]]: s
      }),
      children: [
        l,
        /* @__PURE__ */ t("div", { className: n[`${o}-message`], children: c }),
        r && /* @__PURE__ */ t("div", { className: n[`${o}-description`], children: r })
      ]
    }
  );
}
let f = null, a = null, j = 0;
function X() {
  const [e, i] = g({
    prefixCls: o,
    closable: !0,
    closeIcon: /* @__PURE__ */ t(p, {}),
    style: (r) => w(r, E, H),
    motion: k(o)
  }), c = y(e);
  return c.current = e, F(() => {
    f = c.current;
  }, []), i;
}
function q() {
  if (a) return;
  const e = document.createElement("div");
  e.id = "notification-holder", document.body.appendChild(e), a = v(e), a.render(
    /* @__PURE__ */ t(h, { children: /* @__PURE__ */ t(X, {}) })
  );
}
const O = (e) => {
  q();
  const {
    icon: i,
    type: c,
    description: r,
    message: s,
    duration: l,
    closable: m = !0,
    placement: N = A
  } = e, d = () => {
    f ? f.open({
      key: `notification-${++j}`,
      placement: N,
      content: /* @__PURE__ */ t(h, { children: /* @__PURE__ */ t(
        T,
        {
          icon: i,
          type: c,
          message: s,
          description: r,
          closable: m
        }
      ) }),
      duration: l ?? 4.5,
      closable: m,
      closeIcon: /* @__PURE__ */ t(p, {})
    }) : requestAnimationFrame(d);
  };
  d();
};
export {
  O as Notification,
  T as NotificationContent
};
