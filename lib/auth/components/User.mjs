import { jsxs as a, jsx as i } from "react/jsx-runtime";
import p from "classnames";
import r from "./User.module.scss.mjs";
function v({
  fullName: s,
  email: n,
  avatar: c,
  collapsed: e = !1,
  children: t
}) {
  const o = s == null ? void 0 : s.split(" ").map((d) => d.trim().charAt(0)).splice(0, 2).join("");
  return /* @__PURE__ */ a(
    "div",
    {
      className: p(r.container, {
        [r.container__Collapsed]: e,
        [r.container__Children]: !!t
      }),
      children: [
        /* @__PURE__ */ i("div", { className: r.avatar, children: c ? /* @__PURE__ */ i("img", { src: c, alt: "" }) : o }),
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ i("div", { className: r.name, title: s, children: /* @__PURE__ */ i("span", { children: s }) }),
          n && /* @__PURE__ */ i("a", { href: `mailto:${n}`, className: r.email, children: /* @__PURE__ */ i("span", { children: n }) })
        ] }),
        !!t && /* @__PURE__ */ i("div", { children: t })
      ]
    }
  );
}
export {
  v as UserCard
};
