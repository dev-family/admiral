import { useRef as s, useEffect as f } from "react";
const c = (t, r) => {
  const e = s(!0);
  f(() => {
    if (e.current)
      e.current = !1;
    else
      return t();
  }, r);
};
export {
  c as default
};
