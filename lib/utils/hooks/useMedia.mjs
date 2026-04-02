import { useState as i, useEffect as u } from "react";
function h(o, a, s) {
  const n = o.map((e) => window.matchMedia(e)), r = () => {
    const e = n.findIndex((t) => t.matches);
    return typeof a[e] < "u" ? a[e] : s;
  }, [c, d] = i(r);
  return u(
    () => {
      const e = () => d(r);
      return n.forEach((t) => t.addEventListener("change", e)), () => n.forEach((t) => t.removeEventListener("change", e));
    },
    []
    // Empty array ensures effect is only run on mount and unmount
  ), c;
}
export {
  h as default
};
