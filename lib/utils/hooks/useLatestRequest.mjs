import { useRef as r, useEffect as s, useCallback as u } from "react";
const n = () => {
  const e = r(0);
  return s(
    () => () => {
      e.current += 1;
    },
    []
  ), u(() => {
    const t = ++e.current;
    return () => t === e.current;
  }, []);
};
export {
  n as default
};
