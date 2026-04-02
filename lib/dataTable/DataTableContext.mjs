import { jsx as o } from "react/jsx-runtime";
import { useContext as n, createContext as a } from "react";
const t = a({ refresh: () => {
} });
function x({
  value: e,
  children: r
}) {
  return /* @__PURE__ */ o(t.Provider, { value: e, children: r });
}
function f() {
  return n(t);
}
export {
  t as DataTableContext,
  x as DataTableContextProvider,
  f as useDataTable
};
