import { useCallback as u } from "react";
import { useAuthProvider as g, defaultAuthParams as l } from "./AuthContext.mjs";
import { useNavigate as P, useLocation as d } from "react-router-dom";
const A = () => {
  const e = g(), a = P(), t = d(), i = u(
    (s = {}, c = l.loginUrl, m = !0) => e.logout(s).then((o) => {
      if (o === !1)
        return;
      const n = (o || c).split("?"), p = n[0];
      let r;
      m && t && t.pathname && (r = {
        nextPathname: t.pathname,
        nextSearch: t.search
      });
      const f = n[1] ? n[1] : void 0;
      return a({ pathname: p, search: f }, { state: r }), window.location.reload(), o;
    }),
    [e, a, t]
  ), h = u(
    (s) => (a(
      { pathname: l.loginUrl },
      {
        state: {
          nextPathname: t && t.pathname
        }
      }
    ), Promise.resolve()),
    [a, t]
  );
  return e.isDefault ? h : i;
};
export {
  A as default
};
