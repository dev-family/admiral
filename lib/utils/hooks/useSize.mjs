import { useState as u, useEffect as d } from "react";
function l(t) {
  const [c, i] = u(() => {
    const e = t.current;
    return e ? { width: e.clientWidth, height: e.clientHeight } : void 0;
  });
  return d(() => {
    const e = t.current;
    if (!e) return;
    i({ width: e.clientWidth, height: e.clientHeight });
    const n = new ResizeObserver((s) => {
      const r = s[0];
      if (r) {
        const { width: o, height: h } = r.contentRect;
        i({ width: o, height: h });
      }
    });
    return n.observe(e), () => n.disconnect();
  }, [t]), c;
}
export {
  l as default
};
