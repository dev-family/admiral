import { useRef as l, useMemo as u } from "react";
import { useLocation as d, useNavigate as p } from "react-router-dom";
import { parse as h, stringify as m } from "qs";
const w = (e, t) => {
  const { navigateMode: c = "push" } = t || {}, r = d(), s = p(), i = l(
    typeof e == "function" ? e() : e || {}
  ), n = u(() => h(r.search.replace(/(^[?])/gi, ""), {
    arrayLimit: 100,
    decoder: y
  }), [r.search]), a = u(
    () => ({
      ...i.current,
      ...n
    }),
    [n]
  );
  return [a, (o) => {
    const f = typeof o == "function" ? o(a) : o;
    s(
      {
        hash: r.hash,
        search: m(
          { ...n, ...f },
          {
            encoder: g
          }
        ) || "?"
      },
      { replace: c === "replace" }
    );
  }];
};
function g(e, t, c, r) {
  return r === "value" ? String(e).replace(/\+/g, "%2B") : String(e);
}
function y(e) {
  const t = {
    true: !0,
    false: !1,
    null: null,
    undefined: void 0
  };
  if (e in t)
    return t[e];
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
export {
  w as default
};
