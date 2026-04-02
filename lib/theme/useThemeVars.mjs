import { useMemo as c } from "react";
import { useThemeVars as l } from "@consta/uikit/useThemeVars";
const f = () => {
  const r = l(), o = c(() => {
    const {
      color: { primary: e },
      control: s,
      font: t,
      shadow: n,
      size: a,
      space: i
    } = r;
    return Object.entries({
      ...e,
      ...s,
      ...t,
      ...n,
      ...a,
      ...i
    }).map((m) => m.join(": ")).join("; ");
  }, [r]);
  return { vars: r, varsInline: o };
};
export {
  f as default
};
