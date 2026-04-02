import { useCallback as s } from "react";
import { useLocation as h, useNavigate as d } from "react-router-dom";
import { useAuthProvider as P, defaultAuthParams as c } from "./AuthContext.mjs";
const p = () => {
  const o = P(), { state: t } = h(), e = d(), n = t && t.nextPathname, a = t && t.nextSearch, l = [n, a].filter(Boolean).join(""), u = s(
    (i = {}, r) => o.login(i).then((m) => {
      const g = r || l || c.afterLoginUrl;
      return e(g), m;
    }),
    [o, e, n, a]
  ), f = s(
    (i, r) => (e(c.afterLoginUrl), Promise.resolve()),
    [e]
  );
  return o.isDefault ? f : u;
};
export {
  p as default
};
