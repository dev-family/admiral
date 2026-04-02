import { jsx as n } from "react/jsx-runtime";
import m from "react";
import { useSortable as p } from "@dnd-kit/sortable";
import { DragHandle as u } from "./DragHandle.mjs";
function D(o) {
  var a;
  const i = (a = o["data-row-key"]) == null ? void 0 : a.toString(), { children: r, ...s } = o, { attributes: l, isDragging: d, listeners: c, setNodeRef: g, transform: e, transition: x } = p({
    id: i
  });
  return /* @__PURE__ */ n(
    "tr",
    {
      ref: g,
      ...l,
      ...s,
      style: {
        transition: [x].filter(Boolean).join(", "),
        "--translate-x": e ? `${Math.round(e.x)}px` : void 0,
        "--translate-y": e ? `${Math.round(e.y)}px` : void 0,
        "--scale-x": e != null && e.scaleX ? `${e.scaleX}` : void 0,
        "--scale-y": e != null && e.scaleY ? `${e.scaleY}` : void 0,
        ...d && { zIndex: 999 }
      },
      children: Array.isArray(r) ? r.map((t) => {
        const { key: y } = t;
        return y === "dragHandle" ? m.cloneElement(t, {
          render: () => /* @__PURE__ */ n(u, { listeners: c })
        }) : t;
      }) : r
    }
  );
}
export {
  D as DraggableRow
};
