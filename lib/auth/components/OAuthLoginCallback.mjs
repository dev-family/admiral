import { jsx as u, Fragment as c } from "react/jsx-runtime";
import { useRef as s, useEffect as i } from "react";
import { useAuthProvider as f, defaultAuthParams as n } from "../AuthContext.mjs";
import { useNavigate as l, useParams as m, useLocation as h } from "react-router-dom";
function P() {
  const r = f(), t = l(), { provider: a } = m(), e = new URLSearchParams(h().search).toString(), o = s(!1);
  return i(() => {
    o.current || !r.oauthCallback || (o.current = !0, r.oauthCallback(a, e).then(() => t(n.afterLoginUrl)).catch(() => t(n.loginUrl)));
  }, [r, a, e, t]), /* @__PURE__ */ u(c, {});
}
export {
  P as OAuthLoginCallback
};
