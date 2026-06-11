import { useRef as n, useMemo as s, useEffect as a } from "react";
import m from "./useLatest.mjs";
const l = (o, c) => {
  const r = m(o), e = n(void 0), t = s(
    () => Object.assign(
      (...u) => {
        clearTimeout(e.current), e.current = setTimeout(() => r.current(...u), c);
      },
      {
        cancel: () => clearTimeout(e.current)
      }
    ),
    [c, r]
  );
  return a(() => () => t.cancel(), [t]), t;
};
export {
  l as default
};
