import { jsx as S } from "react/jsx-runtime";
import { useState as E, useRef as W, useEffect as L, useCallback as V } from "react";
import { useForm as X } from "../FormContext.mjs";
import { Form as Y } from "../Form.mjs";
import { usePopupContainer as Z } from "../../crud/PopupContainerContext.mjs";
import { useCrudIndex as C } from "../../crud/CrudIndexPageContext.mjs";
import { withFieldRules as g } from "../fieldRules.mjs";
import { isEmptyValue as O } from "../rules.mjs";
import $ from "../../utils/hooks/useLatest.mjs";
import tt from "../../utils/hooks/useLatestRequest.mjs";
import ot from "../../utils/hooks/useDebouncedCallback.mjs";
import { Select as rt } from "../../ui/Select/Select.mjs";
import { Spin as st } from "../../ui/Spin/Spin.mjs";
const k = (l, t) => l ? `${l}.${t}` : t, q = function({
  name: t,
  label: B,
  required: N = !1,
  columnSpan: z,
  fetchOptions: b,
  fetchTimeout: D = 500,
  resetOnChangeOf: r,
  onChange: n,
  ...K
}) {
  var w;
  const _ = Z(), { filter: R } = C(), [G, p] = E([]), [h, j] = E(!1), x = W(!1), {
    values: A,
    errors: H,
    options: J,
    setValues: f,
    scopePath: a = "",
    fieldChange: i
  } = X(), M = A[t], F = (w = H[t]) == null ? void 0 : w[0], u = $(A), m = J[t];
  L(() => {
    Array.isArray(m) && !x.current && p(m);
  }, [m]);
  const Q = V(
    (s) => {
      f((c) => ({ ...c, [t]: s })), n && n(s);
    },
    [t, n, f]
  ), I = tt(), P = V(
    async (s = "", c) => {
      const d = c ?? u.current, o = I();
      j(!0);
      try {
        const e = await b(t, s, d);
        if (!o()) return;
        x.current = !0, p(e), R.setFilterOptions((y) => ({ ...y, [t]: e }));
      } catch (e) {
        console.error(`[Admiral] Failed to fetch options for "${t}":`, e);
      } finally {
        o() && j(!1);
      }
    },
    [b, t, R, I, u]
  ), v = ot(P, D), T = $(P), U = r == null ? void 0 : r.join(" ");
  return L(() => {
    if (!i || !(r != null && r.length)) return;
    const s = k(a, t), c = (o) => (e) => {
      v.cancel(), p([]), O(u.current[t]) || (f((y) => ({ ...y, [t]: null })), i.notify({ path: s, value: null })), T.current("", { ...u.current, [o]: e.value });
    }, d = r.map(
      (o) => i.subscribe(k(a, o), c(o))
    );
    return () => d.forEach((o) => o());
  }, [i, a, t, U]), /* @__PURE__ */ S(Y.Item, { label: B, required: N, error: F, columnSpan: z, children: /* @__PURE__ */ S(
    rt,
    {
      getPopupContainer: _,
      showSearch: !0,
      onSearch: v,
      loading: h,
      ...K,
      value: M,
      onChange: Q,
      alert: !!F,
      filterOption: !1,
      options: G,
      notFoundContent: h ? /* @__PURE__ */ S(st, { size: "small" }) : null
    }
  ) });
};
q.inputName = "AjaxSelectInput";
const bt = g(q);
export {
  bt as AjaxSelectInput
};
