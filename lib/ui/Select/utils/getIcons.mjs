import { jsx as o } from "react/jsx-runtime";
import { FiLoader as m, FiSearch as l, FiChevronDown as a, FiCheck as u, FiX as I } from "react-icons/fi";
import { AiFillCloseCircle as F } from "react-icons/ai";
function d({
  loading: c,
  multiple: e,
  prefixCls: n
}) {
  const i = /* @__PURE__ */ o(F, {}), s = `${n}-suffix`, r = `${n}-spin`;
  return {
    clearIcon: i,
    suffixIcon: c ? /* @__PURE__ */ o(m, { className: r }) : (({ open: t, showSearch: f }) => t && f ? /* @__PURE__ */ o(l, { className: s }) : /* @__PURE__ */ o(a, { className: s })),
    itemIcon: e ? /* @__PURE__ */ o(u, {}) : null,
    removeIcon: /* @__PURE__ */ o(I, {})
  };
}
export {
  d as default
};
