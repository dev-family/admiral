import { jsx as o, jsxs as k } from "react/jsx-runtime";
import { useRef as L, useEffect as R, useCallback as m } from "react";
import { useCrudIndex as g } from "../crud/CrudIndexPageContext.mjs";
import { Form as l } from "../form/Form.mjs";
import { FiX as j, FiSave as U } from "react-icons/fi";
import B from "./Filters.module.scss.mjs";
import { Drawer as E } from "../ui/Drawer/Drawer.mjs";
import { enUS as N } from "./locale/enUS.mjs";
import d from "../ui/Button/Button.mjs";
function J({ locale: t, fetchInitialData: r, children: v }) {
  const {
    filterDrawer: w,
    setFilterDrawer: F,
    setUrlState: n,
    urlState: s,
    filter: { setFilterOptions: b }
  } = g(), u = (t == null ? void 0 : t.filters) ?? N, p = L(null);
  R(() => {
    (async () => {
      var c;
      const e = ((c = await (r == null ? void 0 : r(s.filter))) == null ? void 0 : c.options) ?? {};
      b((x) => ({ ...x, ...e }));
    })();
  }, []);
  const i = m(() => {
    F(!1);
  }, []), y = m(() => {
    n({ filter: {} }), i();
  }, [n, i]), C = m(() => {
    var e;
    const f = ((e = p.current) == null ? void 0 : e.values) ?? {};
    n({ ...s, filter: f, page: void 0 }), i();
  }, [n, i, p]), S = m(async () => {
    var e;
    const f = ((e = await (r == null ? void 0 : r(s.filter))) == null ? void 0 : e.options) ?? {};
    return {
      data: s.filter,
      values: f
    };
  }, [s, r]);
  return /* @__PURE__ */ o(
    E,
    {
      visible: w,
      onClose: i,
      title: u.title,
      footer: /* @__PURE__ */ k("div", { className: B.footer, children: [
        /* @__PURE__ */ o(d, { type: "button", view: "secondary", onClick: y, iconLeft: /* @__PURE__ */ o(j, {}), children: u.clear }),
        /* @__PURE__ */ o(d, { type: "button", onClick: C, iconLeft: /* @__PURE__ */ o(U, {}), children: u.submit })
      ] }),
      children: /* @__PURE__ */ o(l, { ref: p, fetchInitialData: S, locale: t == null ? void 0 : t.form, children: /* @__PURE__ */ o(l.Fields, { singleColumn: !0, children: v }) })
    }
  );
}
export {
  J as Filters
};
