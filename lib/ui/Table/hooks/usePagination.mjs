import { useState as S } from "react";
const i = 10, d = {}, T = () => {
};
function _(o) {
  const e = {}, n = o;
  return ["current", "pageSize", "total"].forEach((t) => {
    n[t] !== void 0 && (e[t] = n[t]);
  }), e;
}
function z(...o) {
  const e = {};
  return o.forEach((n) => {
    n && Object.keys(n).forEach((t) => {
      const r = n[t];
      r !== void 0 && (e[t] = r);
    });
  }), e;
}
function m(o, e, n) {
  const { total: t = 0, ...r } = e && typeof e == "object" ? e : {}, [P, E] = S({
    current: (r == null ? void 0 : r.defaultCurrent) ?? 1,
    pageSize: (r == null ? void 0 : r.defaultPageSize) ?? i
  }), c = z(
    P,
    r,
    {
      total: t > 0 ? t : o
    }
  ), a = Math.ceil((t || o) / c.pageSize);
  c.current > a && (c.current = a || 1);
  const u = (s, f) => {
    E({
      current: s ?? 1,
      pageSize: f || c.pageSize
    });
  }, h = (s, f) => {
    var l;
    e && ((l = e.onChange) == null || l.call(e, s, f)), u(s, f), n(s, f || ((c == null ? void 0 : c.pageSize) ?? 10));
  };
  return e === !1 ? [d, T] : [{ ...c, onChange: h }, u];
}
export {
  i as DEFAULT_PAGE_SIZE,
  m as default,
  _ as getPaginationParam
};
