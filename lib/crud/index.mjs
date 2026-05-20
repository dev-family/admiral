import { jsxs as C, Fragment as L, jsx as t } from "react/jsx-runtime";
import { Form as u } from "../form/Form.mjs";
import { Page as S } from "../ui/Page/index.mjs";
import { FiX as X, FiSave as _ } from "react-icons/fi";
import { useLocation as N, useNavigate as z } from "react-router-dom";
import { useCallback as v, useMemo as T, useRef as E, useState as I, useEffect as G } from "react";
import { CrudIndexPageContextProvider as H } from "./CrudIndexPageContext.mjs";
import J from "./Crud.module.scss.mjs";
import { PopupContainerContextProvider as K } from "./PopupContainerContext.mjs";
import { useLocaleProvider as B } from "../locale/LocaleContext.mjs";
import O from "../filters/QuickFiltersWrapper.mjs";
import { useDataProvider as R } from "../dataProvider/DataProviderContext.mjs";
import { BackButton as V } from "../actions/BackButton.mjs";
import { AppliedFilters as Y } from "../filters/AppliedFilters.mjs";
import { DataTable as Z } from "../dataTable/DataTable.mjs";
import { Filters as g } from "../filters/Filters.mjs";
import { TopToolbar as ee } from "../layout/TopToolbar.mjs";
import { FilterButton as te } from "../actions/FilterButton.mjs";
import { CreateButton as re } from "../actions/CreateButton.mjs";
import j from "../ui/Button/Button.mjs";
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
    var b, n, s;
    const { getFiltersFormData: a } = R(), r = B(), p = v((P) => a(e.resource, P), []), { view: c, drawer: i } = e.update || {}, f = (i == null ? void 0 : i.routePath) ?? ((P) => `${P}/:id`), d = r.actions, F = r.table, o = {
      ...(r == null ? void 0 : r.pagination) ?? {},
      total: d.paginationTotal
    }, l = e.index.tableActions, h = {
      title: d.tableColumn,
      key: "operation",
      fixed: "right",
      width: 120,
      render: (P, x) => /* @__PURE__ */ C("div", { style: ne, children: [
        /* @__PURE__ */ t(
          ae,
          {
            pathname: `${e.path}/${x.id}`,
            ...c === "drawer" && {
              behavior: "backgroundRoute",
              mainRoutePath: f(e.path)
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
    return /* @__PURE__ */ t(H, { filterFields: (b = e.filter) == null ? void 0 : b.fields, children: /* @__PURE__ */ C(
      S,
      {
        title: e.index.title,
        actions: e.actions || /* @__PURE__ */ C(ee, { children: [
          !!e.filter && /* @__PURE__ */ t(te, { children: e.filter.topToolbarButtonText }),
          /* @__PURE__ */ t(re, { basePath: e.path, children: e.index.newButtonText })
        ] }),
        topContent: e.topContent,
        children: [
          !!e.filter && /* @__PURE__ */ C(L, { children: [
            /* @__PURE__ */ t(O, { filters: (n = e.filter) == null ? void 0 : n.quickFilters }),
            /* @__PURE__ */ t(Y, {})
          ] }),
          /* @__PURE__ */ t(
            Z,
            {
              resource: e.resource,
              columns: [
                ...e.index.tableColumns,
                ...l === null ? [] : l ? [l] : [h]
              ],
              config: e.index.tableConfig,
              locale: { table: F, pagination: o },
              autoupdateTime: (s = e.index.tableConfig) == null ? void 0 : s.autoupdateTime
            }
          ),
          !!e.filter && /* @__PURE__ */ t(
            g,
            {
              fetchInitialData: p,
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
function ce(e) {
  return () => {
    var b, n;
    const a = B(), r = ((b = e.create) == null ? void 0 : b.title) ?? "Create", p = a.actions, {
      path: c,
      form: {
        create: { fields: i, children: f }
      }
    } = e;
    e.form.create.fields && e.form.create.children && console.error('Please provide "form.create.fields" or "form.create.children"'), !e.form.create.fields && !e.form.create.children && console.error('Please provide "form.create.fields" or "form.create.children"'), !e.form.create.fields && !((n = e.create) != null && n.title) && console.error('Please provide "create.title"');
    const { getCreateFormData: d, create: F } = R(), o = v(() => d(e.resource), []), l = v((s) => F(e.resource, { data: s }), []), h = T(
      () => f ?? /* @__PURE__ */ C(L, { children: [
        /* @__PURE__ */ t(u.Fields, { children: i }),
        /* @__PURE__ */ C(u.Footer, { children: [
          /* @__PURE__ */ t(V, { basePath: c, children: p.back }),
          /* @__PURE__ */ t(u.Submit, { children: p.submit })
        ] })
      ] }),
      [f, i, c, p]
    );
    return /* @__PURE__ */ t(S, { title: r, children: /* @__PURE__ */ t(
      u,
      {
        submitData: l,
        redirect: e.path,
        fetchInitialData: o,
        locale: a.form,
        children: h
      }
    ) });
  };
}
function de(e) {
  return ({ id: a }) => {
    var x;
    const { getUpdateFormData: r, update: p } = R(), c = B(), i = v(() => r(e.resource, { id: a }), []), f = v((k) => p(e.resource, { data: k, id: a }), []), d = c.actions, {
      path: F,
      form: {
        edit: { fields: o, children: l }
      }
    } = e, { title: h = (k) => `Update #${k}`, view: b = "page" } = e.update || {};
    e.form.edit.fields && e.form.edit.children && console.error('Please provide "form.edit.fields" or "form.edit.children"'), !e.form.edit.fields && !e.form.edit.children && console.error('Please provide "form.edit.fields" or "form.edit.children"'), !e.form.edit.fields && !((x = e.update) != null && x.title) && console.error('Please provide "update.title"');
    const n = T(() => l || /* @__PURE__ */ C(L, { children: [
      /* @__PURE__ */ t(u.Fields, { children: o }),
      /* @__PURE__ */ C(u.Footer, { children: [
        /* @__PURE__ */ t(V, { basePath: F, children: d.back }),
        /* @__PURE__ */ t(u.Submit, { children: d.submit })
      ] })
    ] }), [l, o, F, d]), { state: s } = N(), P = s && s.background;
    return b === "drawer" && P ? /* @__PURE__ */ t(
      me,
      {
        config: e,
        title: h(a),
        fetchInitialData: i,
        submitData: f
      }
    ) : /* @__PURE__ */ t(S, { title: h(a), children: /* @__PURE__ */ t(
      u,
      {
        redirect: !0,
        submitData: f,
        fetchInitialData: i,
        locale: c.form,
        children: n
      }
    ) });
  };
}
function me({
  config: e,
  title: a,
  fetchInitialData: r,
  submitData: p
}) {
  const c = B(), i = E(null), [f, d] = I(null), [F, o] = I(!1), [l, h] = I(!1);
  G(() => (o(!0), () => o(!1)), []);
  const b = z(), n = N(), s = E(null), P = c.actions, {
    path: x,
    form: {
      edit: { fields: k, children: w }
    }
  } = e, { drawer: D } = e.update || {}, A = v(() => {
    o(!1);
  }, []), U = v(async () => {
    var m;
    await ((m = s.current) == null ? void 0 : m.handleSubmit().then(() => {
      o(!1);
    }).finally(() => {
      h(!0);
    }));
  }, [s]), W = v((m) => {
    i.current = m, d(() => m ? m.bodyElement : null);
  }, []), q = f ?? oe, M = T(() => w ? null : /* @__PURE__ */ C("div", { className: J.drawerFooter, children: [
    /* @__PURE__ */ t(j, { type: "button", view: "secondary", onClick: A, iconLeft: /* @__PURE__ */ t(X, {}), children: P.back }),
    /* @__PURE__ */ t(j, { type: "button", onClick: U, iconLeft: /* @__PURE__ */ t(_, {}), children: P.submit })
  ] }), [w, U, A, D == null ? void 0 : D.footer]), Q = T(() => w || /* @__PURE__ */ t(u.Fields, { children: k }), [w, k]);
  return /* @__PURE__ */ t(
    le,
    {
      ref: W,
      visible: F,
      onClose: (m) => {
        m.stopPropagation(), o(!1);
      },
      title: a,
      footer: M,
      afterVisibleChange: (m) => {
        var $;
        if (!m) {
          const y = ($ = n == null ? void 0 : n.state) == null ? void 0 : $.background;
          b(
            {
              pathname: y ? y.pathname : x,
              search: (y == null ? void 0 : y.search) ?? void 0
            },
            {
              state: {
                update: { dataTable: l },
                scrollTop: !1
              }
            }
          ), h(!1);
        }
      },
      width: (D == null ? void 0 : D.width) ?? 900,
      children: /* @__PURE__ */ t(K, { value: q, children: /* @__PURE__ */ t(
        u,
        {
          ref: s,
          submitData: p,
          fetchInitialData: r,
          locale: c.form,
          children: Q
        }
      ) })
    }
  );
}
function je(e) {
  return {
    IndexPage: se(e),
    CreatePage: ce(e),
    UpdatePage: de(e)
  };
}
export {
  je as createCRUD
};
