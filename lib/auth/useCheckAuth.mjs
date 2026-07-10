import { useCallback as i } from "react";
import { useAuthProvider as a, defaultAuthParams as l } from "./AuthContext.mjs";
import m from "./useLogout.mjs";
import f from "../utils/hooks/useLatest.mjs";
const P = () => {
  const o = a(), u = m(), e = f(u), r = i(
    (c = {}, s = !0, h = l.loginUrl) => o.checkAuth(c).catch((t) => {
      throw s && e.current({}, t && t.redirectTo ? t.redirectTo : h), t;
    }),
    [o, e]
  );
  return o.isDefault ? n : r;
}, n = () => Promise.resolve();
export {
  P as default
};
