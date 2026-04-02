import { jsx as a } from "react/jsx-runtime";
import { useContext as u, useCallback as d, useMemo as n, createContext as g } from "react";
import { generateThemeClassNames as p, Theme as T } from "@consta/uikit/Theme";
import C from "./presets/themeLight.mjs";
import k from "./presets/themeDark.mjs";
import x from "../utils/hooks/useMedia.mjs";
import N from "../utils/hooks/useLocalStorageState.mjs";
function v(o, m) {
  const e = m || {
    light: C,
    dark: k
  };
  return e[o] || e.light;
}
const h = g({}), M = "df_admin_theme";
function D({
  children: o,
  presetName: m,
  presets: e
}) {
  const i = x(["(prefers-color-scheme: dark)"], ["dark"], "light"), [t, c] = N(M, {
    defaultValue: m || i || "light"
  }), f = d((s) => {
    s && c(s);
  }, []), r = n(() => v(t, e), [t, e]), l = n(
    () => ({
      theme: r,
      themeClassNames: p(r),
      themeName: t,
      setTheme: f
    }),
    [r, t]
  );
  return /* @__PURE__ */ a(T, { preset: r, children: /* @__PURE__ */ a(h.Provider, { value: l, children: o }) });
}
function K() {
  return u(h);
}
export {
  D as ThemeProvider,
  M as themeStorageKey,
  K as useTheme
};
