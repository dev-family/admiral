import { jsxs as m, jsx as a } from "react/jsx-runtime";
import { useId as p } from "react";
import i from "./Form.module.scss.mjs";
import d from "classnames";
import u from "./Error.mjs";
function I({
  label: r,
  required: o = !1,
  error: e,
  showError: s = !0,
  columnSpan: t = 1,
  onLabelClick: n,
  labelAs: c = "label",
  children: f
}) {
  const l = p();
  return /* @__PURE__ */ m("div", { className: d(i.item, { [i.item__ColumnSpanTwo]: t === 2 }), children: [
    /* @__PURE__ */ m(c, { onClick: n, children: [
      /* @__PURE__ */ a(
        "span",
        {
          className: d(i.item_Label, { [i.item_Label__Required]: o }),
          children: r
        }
      ),
      /* @__PURE__ */ a(
        "div",
        {
          className: i.item_Field,
          "aria-invalid": !!e || void 0,
          "aria-describedby": e ? l : void 0,
          children: f
        }
      )
    ] }),
    s && /* @__PURE__ */ a("div", { id: e ? l : void 0, children: /* @__PURE__ */ a(u, { error: e }) })
  ] });
}
export {
  I as default
};
