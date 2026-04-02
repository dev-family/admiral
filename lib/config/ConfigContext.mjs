import { jsx as e } from "react/jsx-runtime";
import { useContext as r, createContext as i } from "react";
const o = i({});
o.displayName = "ConfigContext";
function x({
  value: t,
  children: n
}) {
  return /* @__PURE__ */ e(o.Provider, { value: t, children: n });
}
function u() {
  return r(o);
}
export {
  o as ConfigContext,
  x as ConfigContextProvider,
  u as useConfig
};
