import { jsx as o } from "react/jsx-runtime";
import { MdDragIndicator as r } from "react-icons/md";
import n from "../Button/Button.mjs";
function u({ listeners: t }) {
  return /* @__PURE__ */ o(
    n,
    {
      type: "button",
      size: "S",
      view: "clear",
      style: {
        "--button-bg-focus": "rgba(0,0,0,0)",
        cursor: "grab",
        touchAction: "none"
      },
      iconLeft: /* @__PURE__ */ o(r, {}),
      ...t
    }
  );
}
export {
  u as DragHandle
};
