import { jsxs as b, jsx as l } from "react/jsx-runtime";
import I, { useEffect as k } from "react";
import u from "classnames";
import { useNotification as v } from "rc-notification";
import { FiAlertCircle as A, FiXCircle as E, FiInfo as P, FiCheckCircle as T, FiX as p } from "react-icons/fi";
import e from "./Notification.module.scss.mjs";
import { getMotion as j, getPlacementStyle as w } from "./util.mjs";
import { getPopupContainer as B } from "../../utils/helpers/getPopupContainer.mjs";
const o = "notification", H = "topLeft", d = 24, N = 24, X = 4.5, q = {
  success: T,
  info: P,
  error: E,
  warning: A
};
function D({
  icon: t,
  type: n,
  message: i,
  description: c,
  closable: a
}) {
  let r = null;
  return t ? r = /* @__PURE__ */ l("span", { className: e[`${o}-icon`], children: t }) : n && (r = I.createElement(q[n] || null, {
    className: u(e[`${o}-icon`], e[`${o}-icon-${n}`])
  })), /* @__PURE__ */ b(
    "div",
    {
      className: u(e[`${o}-content`], {
        [e[`${o}-with-icon`]]: r,
        [e[`${o}-closable`]]: a
      }),
      children: [
        r,
        /* @__PURE__ */ l("div", { className: e[`${o}-message`], children: i }),
        c && /* @__PURE__ */ l("div", { className: e[`${o}-description`], children: c })
      ]
    }
  );
}
let s = null, f = [], L = 0, $ = d, C = N;
function g(t, n) {
  const {
    icon: i,
    type: c,
    description: a,
    message: r,
    duration: h = X,
    closable: m = !0,
    placement: x = H,
    top: y = d,
    bottom: F = N
  } = n;
  $ = y, C = F, t.open({
    key: `notification-${++L}`,
    placement: x,
    content: /* @__PURE__ */ l(
      D,
      {
        icon: i,
        type: c,
        message: r,
        description: a,
        closable: m
      }
    ),
    duration: h,
    closable: m,
    closeIcon: /* @__PURE__ */ l(p, {})
  });
}
function Q() {
  const [t, n] = v({
    prefixCls: o,
    closable: !0,
    closeIcon: /* @__PURE__ */ l(p, {}),
    getContainer: B,
    style: (i) => w(i, $, C),
    motion: j(o)
  });
  return k(() => {
    s = t;
    const i = f;
    return f = [], i.forEach((c) => g(t, c)), () => {
      s === t && (s = null);
    };
  }, [t]), n;
}
const U = (t) => {
  s ? g(s, t) : f.push(t);
};
export {
  U as Notification,
  D as NotificationContent,
  Q as NotificationHost
};
