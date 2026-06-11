import { jsx as n, jsxs as M } from "react/jsx-runtime";
import { useEffect as j, useMemo as z } from "react";
import { useSensors as F, useSensor as L, PointerSensor as K, KeyboardSensor as P, DndContext as $, closestCenter as D } from "@dnd-kit/core";
import { sortableKeyboardCoordinates as G, SortableContext as H, horizontalListSortingStrategy as k, verticalListSortingStrategy as q, useSortable as A } from "@dnd-kit/sortable";
import B from "./UploadListItem.mjs";
import { previewImage as J, isImageUrl as O } from "../utils.mjs";
import { useTransition as Q, config as V, animated as W } from "@react-spring/web";
import i from "../Upload.module.scss.mjs";
import N from "classnames";
import X from "../../../utils/hooks/useForceUpdate.mjs";
function Y({
  id: r,
  file: d,
  items: u,
  listType: s,
  locale: m,
  isImgUrl: h,
  showRemoveIcon: e,
  showPreviewIcon: x,
  showDownloadIcon: b,
  itemRender: g,
  onClose: _,
  onPreview: c,
  onDownload: S,
  isDragDisabled: o,
  springStyle: l
}) {
  const { attributes: I, listeners: U, setNodeRef: y, transform: p, transition: w, isDragging: f } = A({
    id: r,
    disabled: o
  }), C = {
    transition: w ?? void 0,
    transform: p ? `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0)` : void 0,
    ...f && { zIndex: 999, opacity: 0.5 }
  }, v = /* @__PURE__ */ n(
    "div",
    {
      ref: y,
      ...I,
      className: N(i.droppable__item, {
        [i["droppable__item--text_type"]]: s === "text",
        [i["droppable__item--picture_card"]]: s === "picture-card",
        [i["droppable__item--dragged"]]: f
      }),
      style: C,
      children: /* @__PURE__ */ n(
        B,
        {
          locale: m,
          file: d,
          items: u,
          listType: s,
          isImgUrl: h,
          showRemoveIcon: e,
          showPreviewIcon: x,
          showDownloadIcon: b,
          itemRender: g,
          onClose: _,
          onPreview: c,
          onDownload: S,
          showDragHandle: !o,
          dragListeners: U
        }
      )
    }
  );
  return l ? /* @__PURE__ */ n(W.div, { style: l, children: v }) : v;
}
function Z({
  listType: r = "picture",
  onRemove: d,
  onPreview: u,
  onDownload: s,
  locale: m,
  isImageUrl: h = O,
  items: e = [],
  showRemoveIcon: x = !0,
  showPreviewIcon: b,
  showDownloadIcon: g,
  itemRender: _,
  previewFile: c = J,
  appendButton: S,
  onDragEnd: o
}) {
  const l = X();
  j(() => {
    r !== "picture" && r !== "picture-card" || (e || []).forEach((t) => {
      typeof document > "u" || typeof window > "u" || !window.FileReader || !window.File || !(t instanceof File) || t.thumbUrl !== void 0 || c && c(t).then((a) => {
        t.thumbUrl = a || "", l();
      });
    });
  }, [r, e, c]);
  const I = (t) => {
    d == null || d(t);
  }, U = (t, a) => {
    if (u)
      return t == null || t.preventDefault(), u(a);
  }, y = Q(
    e,
    o ? {} : {
      initial: {
        opacity: 1,
        transform: "translate3d(0px, 0%, 0px)",
        height: r !== "picture" ? "auto" : 68
      },
      from: { opacity: 0, transform: "translate3d(0px, 10%, 0px)" },
      enter: {
        opacity: 1,
        transform: "translate3d(0px, 0%, 0px)",
        height: r !== "picture" ? "auto" : 68
      },
      leave: {
        opacity: 0,
        transform: "translate3d(0px, -10%, 0px)",
        height: 0,
        config: { duration: 100 }
      },
      update: { height: r !== "picture" ? "auto" : 68 },
      config: (t) => ({
        ...V.stiff,
        friction: 0,
        duration: 160,
        clamp: !e.find((a) => a.uid === t.uid)
      })
    }
  ), p = F(
    L(K),
    L(P, { coordinateGetter: G })
  ), w = z(() => e.map((t) => t.uid), [e]), f = r === "picture-card" ? k : q, C = !o || !e || e.length <= 1;
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
    $,
    {
      sensors: p,
      collisionDetection: D,
      onDragEnd: (t) => {
        o == null || o(t);
      },
      children: /* @__PURE__ */ n(H, { items: w, strategy: f, children: /* @__PURE__ */ M(
        "ul",
        {
          className: N(i.droppable, {
            [i.droppable__TextType]: r === "text" || r === "picture",
            [i["droppable-picture-card"]]: r === "picture-card"
          }),
          children: [
            y((t, a, E, R) => /* @__PURE__ */ n(
              Y,
              {
                id: a.uid,
                file: a,
                items: e,
                listType: r,
                locale: m,
                isImgUrl: h,
                showRemoveIcon: x,
                showPreviewIcon: b,
                showDownloadIcon: g,
                itemRender: _,
                onClose: I,
                onPreview: U,
                onDownload: s,
                isDragDisabled: C,
                springStyle: o ? void 0 : t
              },
              a.uid
            )),
            S
          ]
        }
      ) })
    }
  ) });
}
Z.displayName = "UploadList";
export {
  Z as default
};
