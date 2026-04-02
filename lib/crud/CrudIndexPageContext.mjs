import { jsx as _ } from "react/jsx-runtime";
import { useContext as A, createContext as E, useState as f, useMemo as n, useCallback as I } from "react";
import { INPUT_NAMES as v } from "../form/interfaces.mjs";
import { getTimePickerExtra as D } from "./IndexPageContext/filterFieldExtra.mjs";
import F from "../utils/hooks/useUrlState.mjs";
const u = "1", c = "10", m = {
  page: u,
  page_size: c,
  filter: {},
  sort: {}
}, d = E({
  filterDrawer: !1,
  setFilterDrawer: () => {
  },
  urlState: m,
  setUrlState: () => {
  },
  filter: { fields: [], options: {}, setFilterOptions: () => {
  } }
});
function N({
  filterFields: o,
  children: S
}) {
  const [s, x] = f(!1), [r, g] = F({
    page: "1",
    page_size: "10",
    sort: {},
    filter: {}
  }), [i, y] = f({}), C = (t) => t.type.inputName, a = n(() => {
    if (!o)
      return [];
    const t = o.props.children ?? [];
    return (Array.isArray(t) ? t : [t]).filter((e) => typeof e == "object" ? typeof e.type == "function" : !1).map((e) => {
      const U = C(e);
      return {
        name: e.props.name,
        label: e.props.label,
        type: U,
        props: e.props,
        extra: {
          timePicker: e.type.inputName === v.timePicker ? D(e) : void 0
        }
      };
    });
  }, [o]), p = n(() => ({ ...m, ...r }), [r]), l = I(
    (t) => {
      let e;
      typeof t == "function" ? e = t(r) : e = t, e.page == u && (e.page = void 0), e.page_size == c && (e.page_size = void 0), g(e);
    },
    [r]
  ), P = n(
    () => ({
      urlState: p,
      setUrlState: l,
      filterDrawer: s,
      setFilterDrawer: x,
      filter: { fields: a, options: i, setFilterOptions: y }
    }),
    [p, l, s, a, i]
  );
  return /* @__PURE__ */ _(d.Provider, { value: P, children: S });
}
function O() {
  return A(d);
}
export {
  d as CrudIndexPageContext,
  N as CrudIndexPageContextProvider,
  O as useCrudIndex
};
