import { jsx as t } from "react/jsx-runtime";
import { MdDragIndicator as r } from "react-icons/md";
import n from "../../Button/Button.mjs";
function u({ listeners: o }) {
  return /* @__PURE__ */ t(
    n,
    {
      type: "button",
      size: "S",
      view: "clear",
      style: { "--button-bg-focus": "rgba(0,0,0,0)" },
      iconLeft: /* @__PURE__ */ t(
        r,
        {
          style: {
            cursor: "grab",
            touchAction: "none"
          },
          ...o
        }
      )
    }
  );
}
export {
  u as DragHandle
};
