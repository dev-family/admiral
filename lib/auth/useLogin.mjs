import { useCallback as s } from "react";
import { useNavigate as g } from "react-router-dom";
import { useAuthProvider as h, defaultAuthParams as c } from "./AuthContext.mjs";
import P from "../router/useTypedLocation.mjs";
const S = () => {
  const o = h(), { state: t } = P(), e = g(), n = t && t.nextPathname, a = t && t.nextSearch, l = [n, a].filter(Boolean).join(""), u = s(
    (i = {}, r) => o.login(i).then((f) => {
      const d = r || l || c.afterLoginUrl;
      return e(d), f;
    }),
    [o, e, n, a]
  ), m = s(
    (i, r) => (e(c.afterLoginUrl), Promise.resolve()),
    [e]
  );
  return o.isDefault ? m : u;
};
export {
  S as default
};
