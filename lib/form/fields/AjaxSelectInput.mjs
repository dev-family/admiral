import { jsx as i } from "react/jsx-runtime";
import { useState as C, useRef as v, useEffect as z, useCallback as x } from "react";
import { useForm as B } from "../FormContext.mjs";
import { Form as D } from "../Form.mjs";
import { usePopupContainer as E } from "../../crud/PopupContainerContext.mjs";
import { useCrudIndex as V } from "../../crud/CrudIndexPageContext.mjs";
import _ from "../../utils/hooks/useLatestRequest.mjs";
import $ from "../../utils/hooks/useDebouncedCallback.mjs";
import { Select as G } from "../../ui/Select/Select.mjs";
import { Spin as H } from "../../ui/Spin/Spin.mjs";
const J = function({
  name: t,
  label: y,
  required: A = !1,
  columnSpan: F,
  fetchOptions: c,
  fetchTimeout: I = 500,
  onChange: s,
  ...b
}) {
  var h;
  const g = E(), { filter: u } = V(), [j, l] = C([]), [f, p] = C(!1), a = v(!1), { values: R, errors: O, options: k, setValues: m } = B(), q = R[t], d = (h = O[t]) == null ? void 0 : h[0], n = k[t];
  z(() => {
    Array.isArray(n) && !a.current && l(n);
  }, [n]);
  const w = x(
    (o) => {
      m((e) => ({ ...e, [t]: o })), s && s(o);
    },
    [t, s, m]
  ), S = _(), L = x(
    async (o = "") => {
      const e = S();
      p(!0);
      try {
        const r = await c(t, o);
        if (!e()) return;
        a.current = !0, l(r), u.setFilterOptions((P) => ({ ...P, [t]: r }));
      } catch (r) {
        console.error(`[Admiral] Failed to fetch options for "${t}":`, r);
      } finally {
        e() && p(!1);
      }
    },
    [c, t, u, S]
  ), N = $(L, I);
  return /* @__PURE__ */ i(D.Item, { label: y, required: A, error: d, columnSpan: F, children: /* @__PURE__ */ i(
    G,
    {
      getPopupContainer: g,
      showSearch: !0,
      onSearch: N,
      loading: f,
      ...b,
      value: q,
      onChange: w,
      alert: !!d,
      filterOption: !1,
      options: j,
      notFoundContent: f ? /* @__PURE__ */ i(H, { size: "small" }) : null
    }
  ) });
};
J.inputName = "AjaxSelectInput";
export {
  J as AjaxSelectInput
};
