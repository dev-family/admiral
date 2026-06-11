import { jsx as i } from "react/jsx-runtime";
import { useContext as n, createContext as a } from "react";
const t = {}, o = a(t);
function u({
  value: r,
  children: e
}) {
  return /* @__PURE__ */ i(o.Provider, { value: r, children: e });
}
function v() {
  const r = n(o);
  if (r === t)
    throw new Error(
      "[Admiral] useDataProvider must be used within <Admin> — no dataProvider found in context"
    );
  return r;
}
export {
  o as DataProviderContext,
  u as DataProviderContextProvider,
  v as useDataProvider
};
