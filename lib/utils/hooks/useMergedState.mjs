import { useState as p, useRef as a, useCallback as v, useEffect as C } from "react";
function h(o, d) {
  const { defaultValue: t, value: e, onChange: f, postState: i } = d || {}, [l, c] = p(() => e !== void 0 ? e : t !== void 0 ? typeof t == "function" ? t() : t : typeof o == "function" ? o() : o);
  let r = e !== void 0 ? e : l;
  i && (r = i(r));
  const n = a(f);
  n.current = f;
  const g = v(
    (u) => {
      c(u), r !== u && n.current && n.current(u, r);
    },
    [r, n]
  ), s = a(!0);
  return C(() => {
    if (s.current) {
      s.current = !1;
      return;
    }
    e === void 0 && c(e);
  }, [e]), [r, g];
}
export {
  h as default
};
