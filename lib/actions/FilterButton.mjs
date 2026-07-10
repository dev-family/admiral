import { jsx as t } from "react/jsx-runtime";
import { useCallback as i } from "react";
import { FiFilter as m } from "react-icons/fi";
import { useCrudIndex as n } from "../crud/CrudIndexPageContext.mjs";
import s from "../ui/Button/Button.mjs";
const a = ({ children: r }) => {
  const { setFilterDrawer: o } = n(), e = i(() => {
    o(!0);
  }, []);
  return /* @__PURE__ */ t(s, { type: "button", iconLeft: /* @__PURE__ */ t(m, {}), onClick: e, children: r });
};
export {
  a as FilterButton
};
