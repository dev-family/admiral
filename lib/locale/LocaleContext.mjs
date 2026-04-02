import { jsx as c } from "react/jsx-runtime";
import { createContext as i, useMemo as u, useContext as m } from "react";
import { enUS as s } from "./locales/enUS.mjs";
const e = s, t = i({ ...e });
function l({
  value: o,
  children: r
}) {
  const n = u(
    () => o ? { ...e, ...o } : { ...e },
    [o]
  );
  return /* @__PURE__ */ c(t.Provider, { value: n, children: r });
}
function d() {
  return m(t);
}
export {
  t as LocaleContext,
  l as LocaleContextProvider,
  e as defaultLocale,
  d as useLocaleProvider
};
