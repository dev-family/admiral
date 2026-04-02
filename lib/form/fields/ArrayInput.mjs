import { jsxs as w, jsx as f } from "react/jsx-runtime";
import F, { useRef as M, useEffect as Q, useCallback as I } from "react";
import { useForm as W } from "../FormContext.mjs";
import { Form as O } from "../Form.mjs";
import { FiX as Y, FiPlus as Z } from "react-icons/fi";
import N from "classnames";
import l from "../Form.module.scss.mjs";
import { enUS as q } from "../locale/enUS.mjs";
import R from "../../ui/Button/Button.mjs";
const x = function({
  name: e,
  label: c,
  required: p,
  columnSpan: d = 2,
  disableOrder: m = !1,
  disableRemove: i = !1,
  disableAdd: y = !1,
  children: E
}) {
  const {
    values: A,
    options: $,
    setOptions: L,
    setValues: g,
    errors: H,
    setErrors: k,
    locale: C,
    ...B
  } = W(), j = { ...q.fields.array, ...C.fields.array }, S = (A == null ? void 0 : A[e]) ?? (p ? [{}] : []), P = V(H, e), z = v($, e), b = M(!1);
  Q(() => {
    b.current = !1;
  });
  const D = I(
    (t) => (r) => {
      g((o) => {
        const n = (o == null ? void 0 : o[e]) ?? [], u = n == null ? void 0 : n[t];
        let s;
        return typeof r == "function" ? s = r(u) : s = r, {
          ...o,
          [e]: [...n.slice(0, t), { ...s }, ...n.slice(t + 1)]
        };
      });
    },
    []
  ), T = I(
    (t) => (r) => {
      k((o) => {
        var a;
        const n = ((a = V(o, e)) == null ? void 0 : a[t]) ?? {};
        let u;
        typeof r == "function" ? u = r(n) : u = r;
        const s = Object.entries(u).reduce(
          (h, [J, K]) => (h[`${e}.${t}.${J}`] = K, h),
          {}
        );
        return {
          ...o,
          ...s
        };
      });
    },
    [k]
  ), U = I(
    (t) => () => {
      g((r) => {
        const o = (r == null ? void 0 : r[e]) ?? [];
        return {
          ...r,
          [e]: [...o.slice(0, t), ...o.slice(t + 1)]
        };
      });
    },
    []
  ), X = (t) => {
    b.current = !0, g((r) => {
      const o = (r == null ? void 0 : r[e]) ?? [];
      return {
        ...r,
        [e]: [...o, {}]
      };
    });
  }, G = I(
    (t, r) => {
      if (!Array.isArray(t))
        return F.isValidElement(t) ? F.cloneElement(t, {
          autoFocus: r,
          props: {
            autoFocus: r
          },
          key: t.key
        }) : t;
      if (!r) return t;
      let o = !1;
      return F.Children.map(t, (n, u) => {
        var a;
        const s = (a = n.props) == null ? void 0 : a.disabled;
        return !o && F.isValidElement(n) && !s ? (o = !0, F.cloneElement(n, {
          autoFocus: !0,
          key: n.key
        })) : n;
      });
    },
    []
  );
  return /* @__PURE__ */ w(O.Item, { label: c, columnSpan: 2, labelAs: "div", required: p, children: [
    /* @__PURE__ */ f("ol", { className: l.arrayInput, children: S.map((t, r) => {
      const o = P[r] ?? {}, n = r, u = r === S.length - 1, s = b.current && u, a = typeof E == "function" ? E(t, r) : E, h = G(
        a,
        s
      );
      return /* @__PURE__ */ w(
        O.ChildForm,
        {
          as: "li",
          className: N(l.arrayInput_Item, {
            [l.arrayInput_Item__ColumnSpanTwo]: d === 2
          }),
          values: t,
          setValues: D(r),
          options: z,
          setOptions: L,
          errors: o,
          setErrors: T(r),
          locale: C,
          ...B,
          children: [
            /* @__PURE__ */ f(
              "div",
              {
                className: N(l.arrayInput_Header, {
                  [l.arrayInput_Header__NoOrder]: m,
                  [l.arrayInput_Header__Empty]: m && i
                }),
                children: !i && /* @__PURE__ */ f(
                  R,
                  {
                    type: "button",
                    size: "S",
                    iconLeft: /* @__PURE__ */ f(Y, {}),
                    view: "ghost",
                    disabled: S.length <= 1 && p,
                    onClick: U(r),
                    children: j.remove
                  }
                )
              }
            ),
            /* @__PURE__ */ f("div", { className: l.arrayInput_Children, children: h })
          ]
        },
        n
      );
    }) }),
    !y && /* @__PURE__ */ f("div", { className: l.arrayInput_Footer, children: /* @__PURE__ */ f(
      R,
      {
        type: "button",
        iconLeft: /* @__PURE__ */ f(Z, {}),
        view: "secondary",
        onClick: X,
        children: j.add
      }
    ) })
  ] });
};
x.inputName = "ArrayInput";
const V = (_, e) => Object.entries(_).reduce(
  (c, [p, d]) => {
    const m = new RegExp(`^${e}\\.(\\d+)\\.(.+)`), i = p.match(m);
    if (i) {
      const [, y, E] = i;
      c[y] = { ...c[y], [E]: d };
    }
    return c;
  },
  {}
), v = (_, e) => Object.entries(_).reduce(
  (c, [p, d]) => {
    const m = new RegExp(`^${e}\\.(.+)`), i = p.match(m);
    if (i) {
      const [, y] = i;
      c[y] = d;
    }
    return c;
  },
  {}
);
export {
  x as ArrayInput
};
