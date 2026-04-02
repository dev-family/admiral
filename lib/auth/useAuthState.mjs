import { useState as s, useEffect as o } from "react";
import c from "./useCheckAuth.mjs";
const d = {}, r = (e = d) => {
  const [u, t] = s({
    loading: !0,
    loaded: !1,
    authenticated: !0
    // optimistic
  }), a = c();
  return o(() => {
    a(e, !1).then(() => {
      t({ loading: !1, loaded: !0, authenticated: !0 });
    }).catch(() => t({ loading: !1, loaded: !0, authenticated: !1 }));
  }, [a, e, t]), u;
};
export {
  r as default
};
