import { useMemo as e } from "react";
import l from "../../../utils/hooks/useSize.mjs";
function a(o) {
  const t = l(o);
  return e(() => ({ width: (t == null ? void 0 : t.width) ?? 0 }), [t == null ? void 0 : t.width]);
}
export {
  a as default
};
