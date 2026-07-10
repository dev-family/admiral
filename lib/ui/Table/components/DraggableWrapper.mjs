import { jsx as t } from "react/jsx-runtime";
import { SortableContext as i, verticalListSortingStrategy as n } from "@dnd-kit/sortable";
function c(e) {
  const { children: r, ...o } = e;
  return /* @__PURE__ */ t(
    i,
    {
      items: r[1] instanceof Array ? r[1].map((a) => a.key) : [],
      strategy: n,
      children: /* @__PURE__ */ t("tbody", {
        ...o,
        // This invokes `Table.components.body.row` for each element of `children`.
        children: r
      })
    }
  );
}
export {
  c as DraggableWrapper
};
