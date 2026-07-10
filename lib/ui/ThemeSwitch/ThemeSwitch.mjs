import { jsx as t } from "react/jsx-runtime";
import { useTheme as m } from "../../theme/ThemeContext.mjs";
import { FiMoon as r, FiSun as h } from "react-icons/fi";
import o from "./ThemeSwitch.module.scss.mjs";
function p() {
  const { themeName: e, setTheme: n } = m(), i = () => n(e === "light" ? "dark" : "light");
  return /* @__PURE__ */ t("button", { className: o.button, type: "button", onClick: i, children: /* @__PURE__ */ t("span", { className: o.icon, children: e === "light" ? /* @__PURE__ */ t(r, {}) : /* @__PURE__ */ t(h, {}) }) });
}
export {
  p as ThemeSwitch
};
