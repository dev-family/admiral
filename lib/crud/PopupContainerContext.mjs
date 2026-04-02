import { jsx as n } from "react/jsx-runtime";
import { useContext as e, createContext as p } from "react";
import { getPopupContainer as i } from "../utils/helpers/getPopupContainer.mjs";
const o = p(i);
function x({
  value: t,
  children: r
}) {
  return /* @__PURE__ */ n(o.Provider, { value: t, children: r });
}
function P() {
  return e(o);
}
export {
  o as PopupContainerContext,
  x as PopupContainerContextProvider,
  P as usePopupContainer
};
