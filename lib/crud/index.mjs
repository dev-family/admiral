import { jsxs as b, Fragment as S, jsx as t } from "react/jsx-runtime";
import { Form as p } from "../form/Form.mjs";
import { Page as L } from "../ui/Page/index.mjs";
import { FiX as Q, FiSave as X } from "react-icons/fi";
import { useNavigate as _ } from "react-router-dom";
import { useCallback as v, useEffect as I, useMemo as A, useState as B, useRef as z } from "react";
import { CrudIndexPageContextProvider as G } from "./CrudIndexPageContext.mjs";
import j from "../router/useTypedLocation.mjs";
import H from "./Crud.module.scss.mjs";
import { PopupContainerContextProvider as J } from "./PopupContainerContext.mjs";
import { useLocaleProvider as T } from "../locale/LocaleContext.mjs";
import K from "../filters/QuickFiltersWrapper.mjs";
import { useDataProvider as R } from "../dataProvider/DataProviderContext.mjs";
import { BackButton as N } from "../actions/BackButton.mjs";
import { AppliedFilters as O } from "../filters/AppliedFilters.mjs";
import { DataTable as Y } from "../dataTable/DataTable.mjs";
import { Filters as Z } from "../filters/Filters.mjs";
import { TopToolbar as g } from "../layout/TopToolbar.mjs";
import { FilterButton as ee } from "../actions/FilterButton.mjs";
import { CreateButton as te } from "../actions/CreateButton.mjs";
import E from "../ui/Button/Button.mjs";
import { getPopupContainer as re } from "../utils/helpers/getPopupContainer.mjs";
import { EditAction as oe } from "../dataTable/actions/EditAction.mjs";
import { DeleteAction as ae } from "../dataTable/actions/DeleteAction.mjs";
import { Drawer as ie } from "../ui/Drawer/Drawer.mjs";
const le = {
  display: "flex",
  gap: "2px",
  flexWrap: "wrap"
};
function ne(e) {
  return () => {
    var c, l, h;
    const { getFiltersFormData: o } = R(), r = T(), m = v(
      (F) => o(e.resource, F),
      [o]
    ), { view: u, drawer: s } = e.update || {}, f = (s == null ? void 0 : s.routePath) ?? ((F) => `${F}/:id`), d = r.actions, a = r.table, C = {
      ...(r == null ? void 0 : r.pagination) ?? {},
      total: d.paginationTotal
    }, i = e.index.tableActions, P = {
      title: d.tableColumn,
      key: "operation",
      fixed: "right",
      width: 120,
      render: (F, n) => /* @__PURE__ */ b("div", { style: le, children: [
        /* @__PURE__ */ t(
          oe,
          {
            pathname: `${e.path}/${n.id}`,
            ...u === "drawer" && {
              behavior: "backgroundRoute",
              mainRoutePath: f(e.path)
            }
          }
        ),
        /* @__PURE__ */ t(
          ae,
          {
            resource: e.resource,
            id: n.id,
            locale: r == null ? void 0 : r.popconfirm
          }
        )
      ] })
    };
    return /* @__PURE__ */ t(G, { filterFields: (c = e.filter) == null ? void 0 : c.fields, children: /* @__PURE__ */ b(
      L,
      {
        title: e.index.title,
        actions: e.actions || /* @__PURE__ */ b(g, { children: [
          !!e.filter && /* @__PURE__ */ t(ee, { children: e.filter.topToolbarButtonText }),
          /* @__PURE__ */ t(te, { basePath: e.path, children: e.index.newButtonText })
        ] }),
        topContent: e.topContent,
        children: [
          !!e.filter && /* @__PURE__ */ b(S, { children: [
            /* @__PURE__ */ t(K, { filters: (l = e.filter) == null ? void 0 : l.quickFilters }),
            /* @__PURE__ */ t(O, {})
          ] }),
          /* @__PURE__ */ t(
            Y,
            {
              resource: e.resource,
              columns: [
                ...e.index.tableColumns,
                ...i === null ? [] : i ? [i] : [P]
              ],
              config: e.index.tableConfig,
              locale: { table: a, pagination: C },
              autoupdateTime: (h = e.index.tableConfig) == null ? void 0 : h.autoupdateTime
            }
          ),
          !!e.filter && /* @__PURE__ */ t(
            Z,
            {
              fetchInitialData: m,
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
function se(e) {
  return () => {
    var c;
    const o = T(), r = ((c = e.create) == null ? void 0 : c.title) ?? "Create", m = o.actions, {
      path: u,
      form: {
        create: { fields: s, children: f }
      }
    } = e;
    I(() => {
      var l;
      e.form.create.fields && e.form.create.children && console.error(
        '[Admiral] Provide either "form.create.fields" or "form.create.children", not both'
      ), !e.form.create.fields && !e.form.create.children && console.error('[Admiral] Provide "form.create.fields" or "form.create.children"'), !e.form.create.fields && !((l = e.create) != null && l.title) && console.error('[Admiral] Please provide "create.title"');
    }, []);
    const { getCreateFormData: d, create: a } = R(), C = v(() => d(e.resource), [d]), i = v(
      (l) => a(e.resource, { data: l }),
      [a]
    ), P = A(
      () => f ?? /* @__PURE__ */ b(S, { children: [
        /* @__PURE__ */ t(p.Fields, { children: s }),
        /* @__PURE__ */ b(p.Footer, { children: [
          /* @__PURE__ */ t(N, { basePath: u, children: m.back }),
          /* @__PURE__ */ t(p.Submit, { children: m.submit })
        ] })
      ] }),
      [f, s, u, m]
    );
    return /* @__PURE__ */ t(L, { title: r, children: /* @__PURE__ */ t(
      p,
      {
        submitData: i,
        redirect: e.path,
        fetchInitialData: C,
        locale: o.form,
        children: P
      }
    ) });
  };
}
function de(e) {
  return ({ id: o }) => {
    const { getUpdateFormData: r, update: m } = R(), u = T(), s = v(() => r(e.resource, { id: o }), [r, o]), f = v(
      (n) => m(e.resource, { data: n, id: o }),
      [m, o]
    ), d = u.actions, {
      path: a,
      form: {
        edit: { fields: C, children: i }
      }
    } = e, { title: P = (n) => `Update #${n}`, view: c = "page" } = e.update || {};
    I(() => {
      var n;
      e.form.edit.fields && e.form.edit.children && console.error(
        '[Admiral] Provide either "form.edit.fields" or "form.edit.children", not both'
      ), !e.form.edit.fields && !e.form.edit.children && console.error('[Admiral] Provide "form.edit.fields" or "form.edit.children"'), !e.form.edit.fields && !((n = e.update) != null && n.title) && console.error('[Admiral] Please provide "update.title"');
    }, []);
    const l = A(() => i || /* @__PURE__ */ b(S, { children: [
      /* @__PURE__ */ t(p.Fields, { children: C }),
      /* @__PURE__ */ b(p.Footer, { children: [
        /* @__PURE__ */ t(N, { basePath: a, children: d.back }),
        /* @__PURE__ */ t(p.Submit, { children: d.submit })
      ] })
    ] }), [i, C, a, d]), { state: h } = j(), F = h && h.background;
    return c === "drawer" && F ? /* @__PURE__ */ t(
      ce,
      {
        config: e,
        title: P(o),
        fetchInitialData: s,
        submitData: f
      }
    ) : /* @__PURE__ */ t(L, { title: P(o), children: /* @__PURE__ */ t(
      p,
      {
        redirect: !0,
        submitData: f,
        fetchInitialData: s,
        locale: u.form,
        children: l
      }
    ) });
  };
}
function ce({
  config: e,
  title: o,
  fetchInitialData: r,
  submitData: m
}) {
  const u = T(), [s, f] = B(null), [d, a] = B(!1), [C, i] = B(!1);
  I(() => (a(!0), () => a(!1)), []);
  const P = _(), c = j(), l = z(null), h = u.actions, {
    path: F,
    form: {
      edit: { fields: n, children: D }
    }
  } = e, { drawer: k } = e.update || {}, U = v(() => {
    a(!1);
  }, []), $ = v(async () => {
    var w;
    await ((w = l.current) == null ? void 0 : w.handleSubmit()) && (i(!0), a(!1));
  }, []), V = v(
    (x) => {
      f(() => x ? x.bodyElement : null);
    },
    []
  ), W = s ?? re, q = A(() => D ? null : /* @__PURE__ */ b("div", { className: H.drawerFooter, children: [
    /* @__PURE__ */ t(E, { type: "button", view: "secondary", onClick: U, iconLeft: /* @__PURE__ */ t(Q, {}), children: h.back }),
    /* @__PURE__ */ t(E, { type: "button", onClick: $, iconLeft: /* @__PURE__ */ t(X, {}), children: h.submit })
  ] }), [D, $, U, h]), M = A(() => D || /* @__PURE__ */ t(p.Fields, { children: n }), [D, n]);
  return /* @__PURE__ */ t(
    ie,
    {
      ref: V,
      visible: d,
      onClose: (x) => {
        x.stopPropagation(), a(!1);
      },
      title: o,
      footer: (k == null ? void 0 : k.footer) ?? q,
      afterVisibleChange: (x) => {
        var w;
        if (!x) {
          const y = (w = c == null ? void 0 : c.state) == null ? void 0 : w.background;
          P(
            {
              pathname: y ? y.pathname : F,
              search: (y == null ? void 0 : y.search) ?? void 0
            },
            {
              state: {
                update: { dataTable: C },
                scrollTop: !1
              }
            }
          ), i(!1);
        }
      },
      width: (k == null ? void 0 : k.width) ?? 900,
      children: /* @__PURE__ */ t(J, { value: W, children: /* @__PURE__ */ t(
        p,
        {
          ref: l,
          submitData: m,
          fetchInitialData: r,
          locale: u.form,
          children: M
        }
      ) })
    }
  );
}
function je(e) {
  return {
    IndexPage: ne(e),
    CreatePage: se(e),
    UpdatePage: de(e)
  };
}
export {
  je as createCRUD
};
