import { jsx as r } from "react/jsx-runtime";
import { useCallback as t } from "react";
import { useTheme as p } from "../../theme/ThemeContext.mjs";
import { FiX as f } from "react-icons/fi";
import d from "rc-dialog";
import u from "classnames";
import C from "./Dialog.module.scss.mjs";
function D(s) {
  const { visible: i, onClose: e, title: m, children: a, ...n } = s, l = t(() => document.querySelector("body"), []), c = t(() => e == null ? void 0 : e(), []), { themeClassNames: o } = p();
  return /* @__PURE__ */ r(
    d,
    {
      prefixCls: "dialog",
      visible: i,
      title: m,
      onClose: c,
      closeIcon: /* @__PURE__ */ r(f, {}),
      getContainer: l,
      animation: "fade-slide",
      maskAnimation: "fade",
      rootClassName: u(
        o.color.primary,
        o.control,
        o.font,
        o.shadow,
        o.size,
        o.space,
        C.wrapper
      ),
      destroyOnClose: !0,
      ...n,
      children: a
    }
  );
}
export {
  D as Dialog
};
