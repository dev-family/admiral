import { useState as l, useCallback as s } from "react";
function S(e, a) {
  const [c, n] = l(() => {
    try {
      const t = localStorage.getItem(e);
      return t !== null ? JSON.parse(t) : a.defaultValue;
    } catch {
      return a.defaultValue;
    }
  }), o = s(
    (t) => {
      n((u) => {
        const r = typeof t == "function" ? t(u) : t;
        try {
          localStorage.setItem(e, JSON.stringify(r));
        } catch {
        }
        return r;
      });
    },
    [e]
  );
  return [c, o];
}
export {
  S as default
};
