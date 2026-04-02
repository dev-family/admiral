import { jsx as n, jsxs as N } from "react/jsx-runtime";
import M, { useEffect as j, useMemo as z } from "react";
import { useSensors as D, useSensor as F, PointerSensor as P, DndContext as $, closestCenter as k } from "@dnd-kit/core";
import { SortableContext as q, horizontalListSortingStrategy as A, verticalListSortingStrategy as B, useSortable as G } from "@dnd-kit/sortable";
import H from "./UploadListItem.mjs";
import { previewImage as J, isImageUrl as K } from "../utils.mjs";
import { useTransition as O, config as Q, animated as V } from "react-spring";
import i from "../Upload.module.scss.mjs";
import L from "classnames";
import W from "../../../utils/hooks/useForceUpdate.mjs";
function X({
  id: r,
  file: d,
  items: u,
  listType: c,
  locale: m,
  isImgUrl: h,
  showRemoveIcon: e,
  showPreviewIcon: x,
  showDownloadIcon: g,
  itemRender: b,
  onClose: _,
  onPreview: s,
  onDownload: S,
  isDragDisabled: a,
  springStyle: l
}) {
  const { attributes: I, listeners: U, setNodeRef: v, transform: p, transition: w, isDragging: f } = G({
    id: r,
    disabled: a
  }), y = {
    transition: w ?? void 0,
    transform: p ? `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0)` : void 0,
    ...f && { zIndex: 999, opacity: 0.5 }
  }, C = /* @__PURE__ */ n(
    "div",
    {
      ref: v,
      ...I,
      ...U,
      className: L(i.droppable__item, {
        [i["droppable__item--text_type"]]: c === "text",
        [i["droppable__item--picture_card"]]: c === "picture-card",
        [i["droppable__item--dragged"]]: f
      }),
      style: y,
      children: /* @__PURE__ */ n(
        H,
        {
          locale: m,
          file: d,
          items: u,
          listType: c,
          isImgUrl: h,
          showRemoveIcon: e,
          showPreviewIcon: x,
          showDownloadIcon: g,
          itemRender: b,
          onClose: _,
          onPreview: s,
          onDownload: S
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
  onDownload: c,
  locale: m,
  isImageUrl: h = K,
  items: e = [],
  showRemoveIcon: x = !0,
  showPreviewIcon: g,
  showDownloadIcon: b,
  itemRender: _,
  previewFile: s = J,
  appendButton: S,
  onDragEnd: a
}) {
  const l = W();
  j(() => {
    r !== "picture" && r !== "picture-card" || (e || []).forEach((t) => {
      typeof document > "u" || typeof window > "u" || !window.FileReader || !window.File || !(t instanceof File) || t.thumbUrl !== void 0 || s && s(t).then((o) => {
        t.thumbUrl = o || "", l();
      });
    });
  }, [r, e, s]);
  const I = (t) => {
    d == null || d(t);
  }, U = (t, o) => {
    if (u)
      return t == null || t.preventDefault(), u(o);
  }, v = O(
    e,
    a ? {} : {
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
        clamp: !e.find((o) => o.uid === t.uid)
      })
    }
  ), p = D(F(P)), w = z(() => e.map((t) => t.uid), [e]), f = r === "picture-card" ? A : B, y = !a || !e || e.length <= 1;
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
    $,
    {
      sensors: p,
      collisionDetection: k,
      onDragEnd: (t) => {
        a == null || a(t);
      },
      children: /* @__PURE__ */ n(q, { items: w, strategy: f, children: /* @__PURE__ */ N(
        "ul",
        {
          className: L(i.droppable, {
            [i.droppable__TextType]: r === "text" || r === "picture",
            [i["droppable-picture-card"]]: r === "picture-card"
          }),
          children: [
            v((t, o, Z, E) => /* @__PURE__ */ n(
              X,
              {
                id: o.uid,
                file: o,
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
                onDownload: c,
                isDragDisabled: y,
                springStyle: a ? void 0 : t
              },
              o.uid
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
