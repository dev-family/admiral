import { jsx as e } from "react/jsx-runtime";
import { useContext as n, createContext as i } from "react";
const r = i({});
function x({
  value: t,
  children: o
}) {
  return /* @__PURE__ */ e(r.Provider, { value: t, children: o });
}
function d() {
  return n(r);
}
export {
  r as DataProviderContext,
  x as DataProviderContextProvider,
  d as useDataProvider
};
