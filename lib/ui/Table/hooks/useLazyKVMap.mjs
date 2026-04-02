import { useRef as i } from "react";
function m(r, t) {
  const e = i({});
  function u(o) {
    if (!e.current || e.current.data !== r || e.current.getRowKey !== t) {
      let f = function(a) {
        a.forEach((c, p) => {
          const s = t(c, p);
          n.set(s, c);
        });
      };
      const n = /* @__PURE__ */ new Map();
      f(r), e.current = {
        data: r,
        kvMap: n,
        getRowKey: t
      };
    }
    return e.current.kvMap.get(o);
  }
  return [u];
}
export {
  m as default
};
