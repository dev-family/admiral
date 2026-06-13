import { jsx as n } from "react/jsx-runtime";
import { createContext as e, useContext as p } from "react";
import { getPopupContainer as i } from "../utils/helpers/getPopupContainer.mjs";
const o = e(i);
function x({
  value: t,
  children: r
}) {
  return /* @__PURE__ */ n(o.Provider, { value: t, children: r });
}
function P() {
  return p(o);
}
export {
  o as PopupContainerContext,
  x as PopupContainerContextProvider,
  P as usePopupContainer
};
