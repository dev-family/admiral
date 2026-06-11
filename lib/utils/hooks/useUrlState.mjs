import { useRef as f, useMemo as u } from "react";
import { useLocation as p, useNavigate as g } from "react-router-dom";
import { parse as d, stringify as h } from "qs";
const w = (e, r) => {
  const { navigateMode: c = "push" } = r || {}, t = p(), s = g(), i = f(
    typeof e == "function" ? e() : e || {}
  ), n = u(() => d(t.search.replace(/(^[?])/gi, ""), {
    arrayLimit: 100,
    decoder: y
  }), [t.search]), a = u(
    () => ({
      ...i.current,
      ...n
    }),
    [n]
  );
  return [a, (o) => {
    const l = typeof o == "function" ? o(a) : o;
    s(
      {
        hash: t.hash,
        search: h(
          { ...n, ...l },
          {
            encoder: m
          }
        ) || "?"
      },
      { replace: c === "replace" }
    );
  }];
};
function m(e, r, c, t) {
  return t === "value" ? String(e).replace(/%/g, "%25").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/=/g, "%3D").replace(/#/g, "%23").replace(/\?/g, "%3F") : String(e);
}
function y(e) {
  const r = {
    true: !0,
    false: !1,
    null: null,
    undefined: void 0
  };
  if (e in r)
    return r[e];
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
export {
  w as default
};
