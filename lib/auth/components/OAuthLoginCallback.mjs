import { jsx as l, Fragment as m } from "react/jsx-runtime";
import { useCallback as h, useEffect as f } from "react";
import { useAuthProvider as g, defaultAuthParams as e } from "../AuthContext.mjs";
import { useNavigate as d, useParams as p, useLocation as P } from "react-router-dom";
function C() {
  const r = g(), t = d(), { provider: a } = p(), o = new URLSearchParams(P().search).toString(), n = h(
    (c, i) => !!r.oauthCallback && r.oauthCallback(c, i).then((s) => {
      const u = e.afterLoginUrl;
      return t(u), s;
    }).catch(() => (t(e.loginUrl), Promise.reject())),
    [r, t, a, o]
  );
  return f(() => {
    n(a, o);
  }, []), /* @__PURE__ */ l(m, {});
}
export {
  C as OAuthLoginCallback
};
