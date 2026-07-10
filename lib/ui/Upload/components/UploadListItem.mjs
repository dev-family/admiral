import { jsx as e, jsxs as _, Fragment as G } from "react/jsx-runtime";
import { useState as J } from "react";
import a from "classnames";
import { FiTrash as K, FiEye as M, FiDownload as O, FiImage as F, FiPaperclip as Q, FiVideo as T, FiFile as W } from "react-icons/fi";
import { isVideoUrl as X } from "../utils.mjs";
import r from "../Upload.module.scss.mjs";
import { useTheme as Y } from "../../../theme/ThemeContext.mjs";
import l from "../../Button/Button.mjs";
import Z from "../../../utils/helpers/fileDownload.mjs";
import { DragHandle as $ } from "../../DragHandle/DragHandle.mjs";
import { Tooltip as f } from "../../Tooltip/Tooltip.mjs";
import { Dialog as R } from "../../Dialog/Dialog.mjs";
function le({
  ref: o,
  locale: n,
  listType: i = "picture",
  file: t,
  items: c,
  itemRender: m,
  isImgUrl: C,
  showRemoveIcon: P,
  showPreviewIcon: x = !0,
  showDownloadIcon: g,
  onClose: h,
  onPreview: L,
  onDownload: p,
  dragListeners: A,
  showDragHandle: k
}) {
  var N;
  const { themeName: s, themeClassNames: u } = Y(), [B, v] = J(!1), D = (d) => (q) => {
    q.preventDefault(), h(d);
  }, E = (d) => {
    v(!0), L(d, t);
  }, S = P ? /* @__PURE__ */ e(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ e(K, {}),
      title: n.removeFile,
      "aria-label": n.removeFile,
      onClick: D(t),
      className: a(r.item_ActionButton, {
        [u.color.invert]: i === "picture-card" && s === "light"
      })
    }
  ) : null, z = x ? /* @__PURE__ */ e(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ e(M, {}),
      title: n.previewFile,
      "aria-label": n.previewFile,
      disabled: !(t.url || t.thumbUrl),
      onClick: E,
      className: a(r.item_ActionButton, {
        [u.color.invert]: i === "picture-card" && s === "light"
      })
    }
  ) : null, I = g ? /* @__PURE__ */ e(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ e(O, {}),
      title: n.downloadFile,
      "aria-label": n.downloadFile,
      onClick: () => p ? p(t) : Z(t),
      disabled: !(t != null && t.url),
      className: a(r.item_ActionButton, {
        [u.color.invert]: i === "picture-card" && s === "light"
      })
    }
  ) : null, V = /* @__PURE__ */ _(
    "span",
    {
      className: a(r.item_Actions, {
        [r.item_Actions__PictureCard]: i === "picture-card",
        [r.item_Actions__TextType]: i === "text"
      }),
      children: [
        I,
        z,
        S
      ]
    },
    "actions"
  ), j = [
    i !== "picture-card" ? /* @__PURE__ */ e("span", { className: r.item_Name, title: t.name, children: t.name }, "view") : null,
    V,
    i == "picture-card" ? /* @__PURE__ */ e(y, { file: t, visible: B, onClose: () => v(!1) }) : null
  ], b = /* @__PURE__ */ e(
    "div",
    {
      className: a(r.item, {
        [r.item__PictureCard]: i === "picture-card",
        [r.item__TextType]: i === "text",
        [r.item__Error]: t.status === "error"
      }),
      children: /* @__PURE__ */ _(
        "div",
        {
          className: a(r.item_Content, {
            [r.item_Content__PictureCard]: i === "picture-card"
          }),
          children: [
            k && /* @__PURE__ */ e($, { listeners: A }),
            /* @__PURE__ */ e(U, { isImgUrl: C, listType: i, file: t }),
            j
          ]
        }
      )
    }
  ), H = ((N = t.error) == null ? void 0 : N.message) || n.uploadError, w = t.status === "error" ? /* @__PURE__ */ e(f, { placement: "top", content: H, offset: [0, 6], children: b }) : b;
  return /* @__PURE__ */ e("div", { ref: o, style: { height: "100%" }, children: m ? m(w, t, c, {
    remove: h.bind(null, t)
  }) : w });
}
function U({
  isImgUrl: o,
  file: n,
  listType: i
}) {
  const t = i === "text" ? /* @__PURE__ */ e(Q, {}) : o && o(n) ? /* @__PURE__ */ e(F, {}) : X(n) ? /* @__PURE__ */ e(T, {}) : /* @__PURE__ */ e(W, {});
  let c = /* @__PURE__ */ e(G, {});
  if (i === "picture" || i === "picture-card")
    if (!n.thumbUrl && !n.url)
      c = /* @__PURE__ */ e(
        "div",
        {
          className: a({
            [r.item_Thumb]: i === "picture",
            [r.item_Thumb__PictureCard]: i === "picture-card"
          }),
          children: t
        }
      );
    else {
      const m = o != null && o(n) ? /* @__PURE__ */ e(
        "img",
        {
          src: n.thumbUrl || n.url,
          alt: n.name,
          className: r.item_Image
        }
      ) : t;
      c = /* @__PURE__ */ _(
        "div",
        {
          className: a({
            [r.item_Thumb]: !0,
            [r.item_Thumb__PictureCard]: i === "picture-card"
          }),
          children: [
            m,
            n.url ? /* @__PURE__ */ e("a", { className: r.item_Link, target: "_blank", rel: "noopener noreferrer" }) : null
          ]
        }
      );
    }
  if (i === "text") {
    const m = t;
    c = /* @__PURE__ */ e(
      "div",
      {
        className: a({
          [r.item_Thumb]: !0,
          [r.item_Thumb__TextType]: !0
        }),
        children: m
      }
    );
  }
  return c;
}
function y({
  file: o,
  visible: n,
  onClose: i
}) {
  const t = /* @__PURE__ */ e("div", { className: a(r.item_Preview, { [r.item_PreviewError]: !o.url }), children: o.url ? /* @__PURE__ */ e("img", { src: o.url, alt: o.name, className: r.item_Preview__Image }) : /* @__PURE__ */ e(F, {}) });
  return /* @__PURE__ */ e(R, { visible: n, onClose: i, title: o.name, children: t });
}
export {
  le as default
};
