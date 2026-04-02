import { jsx as r } from "react/jsx-runtime";
import { Select as s } from "../Select/Select.mjs";
function m(l) {
  return (e) => /* @__PURE__ */ r(
    s,
    {
      disabled: e.disabled,
      value: e.size,
      onChange: (a) => e.onSizeChange(a),
      "aria-label": e["aria-label"],
      className: e.className,
      size: l,
      options: e.options.map((a) => ({
        label: String(a.value),
        value: a.value
      }))
    }
  );
}
export {
  m as createSizeChangerRender
};
