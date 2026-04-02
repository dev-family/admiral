import { useCallback as s } from "react";
import { useAuthProvider as i, defaultAuthParams as a } from "./AuthContext.mjs";
import l from "./useLogout.mjs";
const A = () => {
  const o = i(), e = l(), u = s(
    (c = {}, r = !0, h = a.loginUrl) => o.checkAuth(c).catch((t) => {
      throw r && e({}, t && t.redirectTo ? t.redirectTo : h), t;
    }),
    [o]
  );
  return o.isDefault ? m : u;
}, m = () => Promise.resolve();
export {
  A as default
};
