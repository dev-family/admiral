import { useRef as c, useMemo as f, useEffect as l } from "react";
import m from "./useLatest.mjs";
const p = (a, o) => {
  const t = m(a), e = c(void 0), r = c(0), u = c(void 0), n = f(
    () => Object.assign(
      (...s) => {
        u.current = s;
        const i = o - (Date.now() - r.current);
        i <= 0 ? (r.current = Date.now(), t.current(...s)) : e.current || (e.current = setTimeout(() => {
          r.current = Date.now(), e.current = void 0, t.current(...u.current);
        }, i));
      },
      {
        cancel: () => {
          e.current && (clearTimeout(e.current), e.current = void 0);
        }
      }
    ),
    [o, t]
  );
  return l(() => () => n.cancel(), [n]), n;
};
export {
  p as default
};
