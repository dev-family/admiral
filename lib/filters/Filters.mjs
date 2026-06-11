import { jsx as t, jsxs as h } from "react/jsx-runtime";
import { useRef as j, useEffect as F, useCallback as m } from "react";
import { useCrudIndex as q } from "../crud/CrudIndexPageContext.mjs";
import { Form as b } from "../form/Form.mjs";
import { FiX as U, FiSave as a } from "react-icons/fi";
import A from "./Filters.module.scss.mjs";
import { enUS as B } from "./locale/enUS.mjs";
import E from "../utils/hooks/useLatest.mjs";
import N from "../utils/hooks/useLatestRequest.mjs";
import { Drawer as O } from "../ui/Drawer/Drawer.mjs";
import w from "../ui/Button/Button.mjs";
function T({ locale: o, fetchInitialData: e, children: y }) {
  const {
    filterDrawer: c,
    setFilterDrawer: v,
    setUrlState: f,
    urlState: C,
    filter: { setFilterOptions: R }
  } = q(), p = (o == null ? void 0 : o.filters) ?? B, l = j(null), s = E(C.filter), L = N();
  F(() => {
    const r = L();
    (async () => {
      var u;
      try {
        const d = ((u = await (e == null ? void 0 : e(s.current))) == null ? void 0 : u.options) ?? {};
        r() && R((k) => ({ ...k, ...d }));
      } catch (d) {
        console.error("[Admiral] Failed to fetch filter options:", d);
      }
    })();
  }, []), F(() => {
    var r;
    c && ((r = l.current) == null || r.setValues({ ...s.current }));
  }, [c, s]);
  const i = m(() => {
    v(!1);
  }, [v]), S = m(() => {
    f({ filter: {}, page: void 0 }), i();
  }, [f, i]), g = m(() => {
    var n;
    const r = ((n = l.current) == null ? void 0 : n.values) ?? {};
    f((u) => ({ ...u, filter: r, page: void 0 })), i();
  }, [f, i]), x = m(async () => {
    var n;
    const r = ((n = await (e == null ? void 0 : e(s.current))) == null ? void 0 : n.options) ?? {};
    return {
      data: s.current,
      values: r
    };
  }, [e, s]);
  return /* @__PURE__ */ t(
    O,
    {
      visible: c,
      onClose: i,
      title: p.title,
      footer: /* @__PURE__ */ h("div", { className: A.footer, children: [
        /* @__PURE__ */ t(w, { type: "button", view: "secondary", onClick: S, iconLeft: /* @__PURE__ */ t(U, {}), children: p.clear }),
        /* @__PURE__ */ t(w, { type: "button", onClick: g, iconLeft: /* @__PURE__ */ t(a, {}), children: p.submit })
      ] }),
      children: /* @__PURE__ */ t(b, { ref: l, fetchInitialData: x, locale: o == null ? void 0 : o.form, children: /* @__PURE__ */ t(b.Fields, { singleColumn: !0, children: y }) })
    }
  );
}
export {
  T as Filters
};
