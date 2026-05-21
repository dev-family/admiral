import { jsx as i, jsxs as N } from "react/jsx-runtime";
import M, { useEffect as j, useMemo as z } from "react";
import { useSensors as F, useSensor as P, PointerSensor as $, DndContext as D, closestCenter as H } from "@dnd-kit/core";
import { SortableContext as k, horizontalListSortingStrategy as q, verticalListSortingStrategy as A, useSortable as B } from "@dnd-kit/sortable";
import G from "./UploadListItem.mjs";
import { previewImage as J, isImageUrl as K } from "../utils.mjs";
import { useTransition as O, config as Q, animated as V } from "@react-spring/web";
import n from "../Upload.module.scss.mjs";
import L from "classnames";
import W from "../../../utils/hooks/useForceUpdate.mjs";
function X({
  id: r,
  file: d,
  items: u,
  listType: s,
  locale: m,
  isImgUrl: h,
  showRemoveIcon: e,
  showPreviewIcon: x,
  showDownloadIcon: g,
  itemRender: b,
  onClose: _,
  onPreview: c,
  onDownload: S,
  isDragDisabled: o,
  springStyle: l
}) {
  const { attributes: I, listeners: U, setNodeRef: w, transform: p, transition: v, isDragging: f } = B({
    id: r,
    disabled: o
  }), y = {
    transition: v ?? void 0,
    transform: p ? `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0)` : void 0,
    ...f && { zIndex: 999, opacity: 0.5 }
  }, C = /* @__PURE__ */ i(
    "div",
    {
      ref: w,
      ...I,
      className: L(n.droppable__item, {
        [n["droppable__item--text_type"]]: s === "text",
        [n["droppable__item--picture_card"]]: s === "picture-card",
        [n["droppable__item--dragged"]]: f
      }),
      style: y,
      children: /* @__PURE__ */ i(
        G,
        {
          locale: m,
          file: d,
          items: u,
          listType: s,
          isImgUrl: h,
          showRemoveIcon: e,
          showPreviewIcon: x,
          showDownloadIcon: g,
          itemRender: b,
          onClose: _,
          onPreview: c,
          onDownload: S,
          showDragHandle: !o,
          dragListeners: U
        }
      )
    }
  );
  return l ? M.createElement(V.div, { style: l }, C) : C;
}
function Y({
  listType: r = "picture",
  onRemove: d,
  onPreview: u,
  onDownload: s,
  locale: m,
  isImageUrl: h = K,
  items: e = [],
  showRemoveIcon: x = !0,
  showPreviewIcon: g,
  showDownloadIcon: b,
  itemRender: _,
  previewFile: c = J,
  appendButton: S,
  onDragEnd: o
}) {
  const l = W();
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
  }, w = O(
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
        ...Q.stiff,
        friction: 0,
        duration: 160,
        clamp: !e.find((a) => a.uid === t.uid)
      })
    }
  ), p = F(P($)), v = z(() => e.map((t) => t.uid), [e]), f = r === "picture-card" ? q : A, y = !o || !e || e.length <= 1;
  return /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
    D,
    {
      sensors: p,
      collisionDetection: H,
      onDragEnd: (t) => {
        o == null || o(t);
      },
      children: /* @__PURE__ */ i(k, { items: v, strategy: f, children: /* @__PURE__ */ N(
        "ul",
        {
          className: L(n.droppable, {
            [n.droppable__TextType]: r === "text" || r === "picture",
            [n["droppable-picture-card"]]: r === "picture-card"
          }),
          children: [
            w((t, a, Z, E) => /* @__PURE__ */ i(
              X,
              {
                id: a.uid,
                file: a,
                items: e,
                listType: r,
                locale: m,
                isImgUrl: h,
                showRemoveIcon: x,
                showPreviewIcon: g,
                showDownloadIcon: b,
                itemRender: _,
                onClose: I,
                onPreview: U,
                onDownload: s,
                isDragDisabled: y,
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
Y.displayName = "UploadList";
export {
  Y as default
};
