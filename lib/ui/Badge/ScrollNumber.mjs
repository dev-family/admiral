import { jsx as s } from "react/jsx-runtime";
import { animated as p } from "react-spring";
import l from "classnames";
import { cloneElement as N } from "./utils.mjs";
import b from "./SingleNumber.mjs";
import o from "./Badge.module.scss.mjs";
function v({
  count: e,
  className: n,
  style: u,
  show: d,
  component: g = "sup",
  children: r,
  ...a
}) {
  const c = {
    ...a,
    style: u,
    className: l(o.scrollNumber, n)
  };
  let t = e;
  if (e && Number(e) % 1 === 0) {
    const m = String(e).split("");
    t = m.map((f, i) => /* @__PURE__ */ s(b, { count: Number(e), value: f }, m.length - i));
  }
  return r ? N(r, (m) => ({
    className: l(o.scrollNumber_Custom, m == null ? void 0 : m.className)
  })) : /* @__PURE__ */ s(p.sup, { ...c, children: t });
}
export {
  v as default
};
