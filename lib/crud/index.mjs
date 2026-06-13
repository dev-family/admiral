import { jsxs as P, Fragment as S, jsx as t } from "react/jsx-runtime";
import { Form as f } from "../form/Form.mjs";
import { Page as L } from "../ui/Page/index.mjs";
import { FiX as X, FiSave as _ } from "react-icons/fi";
import { useNavigate as z } from "react-router-dom";
import { useCallback as F, useEffect as I, useMemo as A, useState as B, useRef as G } from "react";
import { CrudIndexPageContextProvider as H } from "./CrudIndexPageContext.mjs";
import j from "../router/useTypedLocation.mjs";
import J from "./Crud.module.scss.mjs";
import { PopupContainerContextProvider as K } from "./PopupContainerContext.mjs";
import { useLocaleProvider as T } from "../locale/LocaleContext.mjs";
import O from "../filters/QuickFiltersWrapper.mjs";
import { useDataProvider as R } from "../dataProvider/DataProviderContext.mjs";
import { BackButton as N } from "../actions/BackButton.mjs";
import { AppliedFilters as Y } from "../filters/AppliedFilters.mjs";
import { DataTable as Z } from "../dataTable/DataTable.mjs";
import { Filters as g } from "../filters/Filters.mjs";
import { TopToolbar as ee } from "../layout/TopToolbar.mjs";
import { FilterButton as te } from "../actions/FilterButton.mjs";
import { CreateButton as re } from "../actions/CreateButton.mjs";
import E from "../ui/Button/Button.mjs";
import { getPopupContainer as oe } from "../utils/helpers/getPopupContainer.mjs";
import { EditAction as ae } from "../dataTable/actions/EditAction.mjs";
import { DeleteAction as ie } from "../dataTable/actions/DeleteAction.mjs";
import { Drawer as le } from "../ui/Drawer/Drawer.mjs";
const ne = {
  display: "flex",
  gap: "2px",
  flexWrap: "wrap"
};
function se(e) {
  return () => {
    var d, p, i;
    const { getFiltersFormData: o } = R(), r = T(), c = F(
      (C) => o(e.resource, C),
      [o]
    ), { view: m, drawer: s } = e.update || {}, h = (s == null ? void 0 : s.routePath) ?? ((C) => `${C}/:id`), u = r.actions, a = r.table, b = {
      ...(r == null ? void 0 : r.pagination) ?? {},
      total: u.paginationTotal
    }, l = e.index.tableActions, v = {
      title: u.tableColumn,
      key: "operation",
      fixed: "right",
      width: 120,
      render: (C, x) => /* @__PURE__ */ P("div", { style: ne, children: [
        /* @__PURE__ */ t(
          ae,
          {
            pathname: `${e.path}/${x.id}`,
            ...m === "drawer" && {
              behavior: "backgroundRoute",
              mainRoutePath: h(e.path)
            }
          }
        ),
        /* @__PURE__ */ t(
          ie,
          {
            resource: e.resource,
            id: x.id,
            locale: r == null ? void 0 : r.popconfirm
          }
        )
      ] })
    };
    return /* @__PURE__ */ t(H, { filterFields: (d = e.filter) == null ? void 0 : d.fields, children: /* @__PURE__ */ P(
      L,
      {
        title: e.index.title,
        actions: e.actions || /* @__PURE__ */ P(ee, { children: [
          !!e.filter && /* @__PURE__ */ t(te, { children: e.filter.topToolbarButtonText }),
          /* @__PURE__ */ t(re, { basePath: e.path, children: e.index.newButtonText })
        ] }),
        topContent: e.topContent,
        children: [
          !!e.filter && /* @__PURE__ */ P(S, { children: [
            /* @__PURE__ */ t(O, { filters: (p = e.filter) == null ? void 0 : p.quickFilters }),
            /* @__PURE__ */ t(Y, {})
          ] }),
          /* @__PURE__ */ t(
            Z,
            {
              resource: e.resource,
              columns: [
                ...e.index.tableColumns,
                ...l === null ? [] : l ? [l] : [v]
              ],
              config: e.index.tableConfig,
              locale: { table: a, pagination: b },
              autoupdateTime: (i = e.index.tableConfig) == null ? void 0 : i.autoupdateTime
            }
          ),
          !!e.filter && /* @__PURE__ */ t(
            g,
            {
              fetchInitialData: c,
              locale: { filters: r.filters, form: r.form },
              children: e.filter.fields
            }
          ),
          e.bottomContent
        ]
      }
    ) });
  };
}
function de(e) {
  return () => {
    var p;
    const o = T(), r = ((p = e.create) == null ? void 0 : p.title) ?? "Create", c = o.actions, {
      path: m,
      form: {
        create: { fields: s, children: h, rules: u }
      }
    } = e;
    I(() => {
      var i;
      e.form.create.fields && e.form.create.children && console.error(
        '[Admiral] Provide either "form.create.fields" or "form.create.children", not both'
      ), !e.form.create.fields && !e.form.create.children && console.error('[Admiral] Provide "form.create.fields" or "form.create.children"'), !e.form.create.fields && !((i = e.create) != null && i.title) && console.error('[Admiral] Please provide "create.title"');
    }, []);
    const { getCreateFormData: a, create: b } = R(), l = F(() => a(e.resource), [a]), v = F(
      (i) => b(e.resource, { data: i }),
      [b]
    ), d = A(
      () => h ?? /* @__PURE__ */ P(S, { children: [
        /* @__PURE__ */ t(f.Fields, { children: s }),
        /* @__PURE__ */ P(f.Footer, { children: [
          /* @__PURE__ */ t(N, { basePath: m, children: c.back }),
          /* @__PURE__ */ t(f.Submit, { children: c.submit })
        ] })
      ] }),
      [h, s, m, c]
    );
    return /* @__PURE__ */ t(L, { title: r, children: /* @__PURE__ */ t(
      f,
      {
        submitData: v,
        redirect: e.path,
        fetchInitialData: l,
        locale: o.form,
        rules: u,
        children: d
      }
    ) });
  };
}
function ce(e) {
  return ({ id: o }) => {
    const { getUpdateFormData: r, update: c } = R(), m = T(), s = F(() => r(e.resource, { id: o }), [r, o]), h = F(
      (n) => c(e.resource, { data: n, id: o }),
      [c, o]
    ), u = m.actions, {
      path: a,
      form: {
        edit: { fields: b, children: l, rules: v }
      }
    } = e, { title: d = (n) => `Update #${n}`, view: p = "page" } = e.update || {};
    I(() => {
      var n;
      e.form.edit.fields && e.form.edit.children && console.error(
        '[Admiral] Provide either "form.edit.fields" or "form.edit.children", not both'
      ), !e.form.edit.fields && !e.form.edit.children && console.error('[Admiral] Provide "form.edit.fields" or "form.edit.children"'), !e.form.edit.fields && !((n = e.update) != null && n.title) && console.error('[Admiral] Please provide "update.title"');
    }, []);
    const i = A(() => l || /* @__PURE__ */ P(S, { children: [
      /* @__PURE__ */ t(f.Fields, { children: b }),
      /* @__PURE__ */ P(f.Footer, { children: [
        /* @__PURE__ */ t(N, { basePath: a, children: u.back }),
        /* @__PURE__ */ t(f.Submit, { children: u.submit })
      ] })
    ] }), [l, b, a, u]), { state: C } = j(), x = C && C.background;
    return p === "drawer" && x ? /* @__PURE__ */ t(
      me,
      {
        config: e,
        title: d(o),
        fetchInitialData: s,
        submitData: h
      }
    ) : /* @__PURE__ */ t(L, { title: d(o), children: /* @__PURE__ */ t(
      f,
      {
        redirect: !0,
        submitData: h,
        fetchInitialData: s,
        locale: m.form,
        rules: v,
        children: i
      }
    ) });
  };
}
function me({
  config: e,
  title: o,
  fetchInitialData: r,
  submitData: c
}) {
  const m = T(), [s, h] = B(null), [u, a] = B(!1), [b, l] = B(!1);
  I(() => (a(!0), () => a(!1)), []);
  const v = z(), d = j(), p = G(null), i = m.actions, {
    path: C,
    form: {
      edit: { fields: x, children: n, rules: V }
    }
  } = e, { drawer: D } = e.update || {}, U = F(() => {
    a(!1);
  }, []), $ = F(async () => {
    var w;
    await ((w = p.current) == null ? void 0 : w.handleSubmit()) && (l(!0), a(!1));
  }, []), W = F(
    (k) => {
      h(() => k ? k.bodyElement : null);
    },
    []
  ), q = s ?? oe, M = A(() => n ? null : /* @__PURE__ */ P("div", { className: J.drawerFooter, children: [
    /* @__PURE__ */ t(E, { type: "button", view: "secondary", onClick: U, iconLeft: /* @__PURE__ */ t(X, {}), children: i.back }),
    /* @__PURE__ */ t(E, { type: "button", onClick: $, iconLeft: /* @__PURE__ */ t(_, {}), children: i.submit })
  ] }), [n, $, U, i]), Q = A(() => n || /* @__PURE__ */ t(f.Fields, { children: x }), [n, x]);
  return /* @__PURE__ */ t(
    le,
    {
      ref: W,
      visible: u,
      onClose: (k) => {
        k.stopPropagation(), a(!1);
      },
      title: o,
      footer: (D == null ? void 0 : D.footer) ?? M,
      afterVisibleChange: (k) => {
        var w;
        if (!k) {
          const y = (w = d == null ? void 0 : d.state) == null ? void 0 : w.background;
          v(
            {
              pathname: y ? y.pathname : C,
              search: (y == null ? void 0 : y.search) ?? void 0
            },
            {
              state: {
                update: { dataTable: b },
                scrollTop: !1
              }
            }
          ), l(!1);
        }
      },
      width: (D == null ? void 0 : D.width) ?? 900,
      children: /* @__PURE__ */ t(K, { value: q, children: /* @__PURE__ */ t(
        f,
        {
          ref: p,
          submitData: c,
          fetchInitialData: r,
          locale: m.form,
          rules: V,
          children: Q
        }
      ) })
    }
  );
}
function Ne(e) {
  return {
    IndexPage: se(e),
    CreatePage: de(e),
    UpdatePage: ce(e)
  };
}
export {
  Ne as createCRUD
};
