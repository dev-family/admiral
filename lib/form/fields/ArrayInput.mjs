import { jsxs as j, jsx as p } from "react/jsx-runtime";
import E, { useRef as Q, useEffect as Y, useCallback as I } from "react";
import { useForm as Z } from "../FormContext.mjs";
import { Form as w } from "../Form.mjs";
import { FiX as q, FiPlus as x } from "react-icons/fi";
import R from "classnames";
import u from "../Form.module.scss.mjs";
import { withFieldRules as v } from "../fieldRules.mjs";
import { enUS as tt } from "../locale/enUS.mjs";
import O from "../../ui/Button/Button.mjs";
const N = function({
  name: o,
  label: c,
  required: f,
  columnSpan: h = 2,
  disableOrder: y = !1,
  disableRemove: i = !1,
  disableAdd: d = !1,
  children: F
}) {
  const {
    values: A,
    options: V,
    setOptions: L,
    setValues: g,
    errors: B,
    setErrors: C,
    locale: $,
    scopePath: H = "",
    ...D
  } = Z(), k = { ...tt.fields.array, ...$.fields.array }, S = (A == null ? void 0 : A[o]) ?? (f ? [{}] : []), z = P(B, o), T = ot(V, o), b = Q(!1);
  Y(() => {
    b.current = !1;
  });
  const U = I(
    (r) => (t) => {
      g((e) => {
        const s = (e == null ? void 0 : e[o]) ?? [], a = s == null ? void 0 : s[r];
        let n;
        return typeof t == "function" ? n = t(a) : n = t, {
          ...e,
          [o]: [...s.slice(0, r), { ...n }, ...s.slice(r + 1)]
        };
      });
    },
    []
  ), W = I(
    (r) => (t) => {
      C((e) => {
        var m;
        const s = ((m = P(e, o)) == null ? void 0 : m[r]) ?? {};
        let a;
        typeof t == "function" ? a = t(s) : a = t;
        const n = Object.entries(a).reduce(
          (_, [K, M]) => (_[`${o}.${r}.${K}`] = M, _),
          {}
        );
        return {
          ...e,
          ...n
        };
      });
    },
    [C]
  ), X = I(
    (r) => () => {
      g((t) => {
        const e = (t == null ? void 0 : t[o]) ?? [];
        return {
          ...t,
          [o]: [...e.slice(0, r), ...e.slice(r + 1)]
        };
      });
    },
    []
  ), G = (r) => {
    b.current = !0, g((t) => {
      const e = (t == null ? void 0 : t[o]) ?? [];
      return {
        ...t,
        [o]: [...e, {}]
      };
    });
  }, J = I(
    (r, t) => {
      if (!Array.isArray(r))
        return E.isValidElement(r) ? E.cloneElement(r, {
          autoFocus: t,
          props: {
            autoFocus: t
          },
          key: r.key
        }) : r;
      if (!t) return r;
      let e = !1;
      return E.Children.map(r, (s, a) => {
        var m;
        const n = (m = s.props) == null ? void 0 : m.disabled;
        return !e && E.isValidElement(s) && !n ? (e = !0, E.cloneElement(s, {
          autoFocus: !0,
          key: s.key
        })) : s;
      });
    },
    []
  );
  return /* @__PURE__ */ j(w.Item, { label: c, columnSpan: 2, labelAs: "div", required: f, children: [
    /* @__PURE__ */ p("ol", { className: u.arrayInput, children: S.map((r, t) => {
      const e = z[t] ?? {}, s = t, a = t === S.length - 1, n = b.current && a, m = typeof F == "function" ? F(r, t) : F, _ = J(
        m,
        n
      );
      return /* @__PURE__ */ j(
        w.ChildForm,
        {
          as: "li",
          className: R(u.arrayInput_Item, {
            [u.arrayInput_Item__ColumnSpanTwo]: h === 2
          }),
          values: r,
          setValues: U(t),
          options: T,
          setOptions: L,
          errors: e,
          setErrors: W(t),
          locale: $,
          ...D,
          scopePath: rt(H, `${o}.${t}`),
          children: [
            /* @__PURE__ */ p(
              "div",
              {
                className: R(u.arrayInput_Header, {
                  [u.arrayInput_Header__NoOrder]: y,
                  [u.arrayInput_Header__Empty]: y && i
                }),
                children: !i && /* @__PURE__ */ p(
                  O,
                  {
                    type: "button",
                    size: "S",
                    iconLeft: /* @__PURE__ */ p(q, {}),
                    view: "ghost",
                    disabled: S.length <= 1 && f,
                    onClick: X(t),
                    children: k.remove
                  }
                )
              }
            ),
            /* @__PURE__ */ p("div", { className: u.arrayInput_Children, children: _ })
          ]
        },
        s
      );
    }) }),
    !d && /* @__PURE__ */ p("div", { className: u.arrayInput_Footer, children: /* @__PURE__ */ p(
      O,
      {
        type: "button",
        iconLeft: /* @__PURE__ */ p(x, {}),
        view: "secondary",
        onClick: G,
        children: k.add
      }
    ) })
  ] });
};
N.inputName = "ArrayInput";
const mt = v(N, {
  supportsDisabled: !1,
  supportsRequiredWhen: !1,
  dispatchesChange: !1
}), rt = (l, o) => l ? `${l}.${o}` : o, P = (l, o) => Object.entries(l).reduce(
  (c, [f, h]) => {
    const y = new RegExp(`^${o}\\.(\\d+)\\.(.+)`), i = f.match(y);
    if (i) {
      const [, d, F] = i;
      c[d] = { ...c[d], [F]: h };
    }
    return c;
  },
  {}
), ot = (l, o) => Object.entries(l).reduce(
  (c, [f, h]) => {
    const y = new RegExp(`^${o}\\.(.+)`), i = f.match(y);
    if (i) {
      const [, d] = i;
      c[d] = h;
    }
    return c;
  },
  {}
);
export {
  mt as ArrayInput
};
