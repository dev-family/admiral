import { useEffect as s } from "react";
import { useAuthProvider as n } from "./AuthContext.mjs";
import { useUserContext as a } from "./UserContext.mjs";
const y = () => {
  const { user: e, setUser: r } = a(), i = n();
  return s(() => {
    const o = async () => {
      try {
        const t = await i.getIdentity();
        r({
          loading: !1,
          loaded: !0,
          identity: t || null
        });
      } catch (t) {
        r({
          loading: !1,
          loaded: !0,
          identity: null,
          error: t
        });
      }
    };
    !!e.identity || o();
  }, [i]), e;
};
export {
  y as default
};
