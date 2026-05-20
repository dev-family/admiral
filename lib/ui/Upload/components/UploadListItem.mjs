import { jsx as t, jsxs as _, Fragment as G } from "react/jsx-runtime";
import { useState as J } from "react";
import c from "classnames";
import { FiTrash as K, FiEye as M, FiDownload as O, FiImage as F, FiPaperclip as Q, FiVideo as T, FiFile as W } from "react-icons/fi";
import { isVideoUrl as X } from "../utils.mjs";
import r from "../Upload.module.scss.mjs";
import { useTheme as Y } from "../../../theme/ThemeContext.mjs";
import l from "../../Button/Button.mjs";
import Z from "../../../utils/helpers/fileDownload.mjs";
import { DragHandle as $ } from "../../DragHandle/DragHandle.mjs";
import { Tooltip as f } from "../../Tooltip/Tooltip.mjs";
import { Dialog as R } from "../../Dialog/Dialog.mjs";
function lt({
  ref: n,
  locale: i,
  listType: o = "picture",
  file: e,
  items: m,
  itemRender: a,
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
  var w;
  const { themeName: s, themeClassNames: u } = Y(), [B, v] = J(!1), D = (d) => (q) => {
    q.preventDefault(), h(d);
  }, E = (d) => {
    v(!0), L(d, e);
  }, S = P ? /* @__PURE__ */ t(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ t(K, {}),
      title: i.removeFile,
      onClick: D(e),
      className: c(r.item_ActionButton, {
        [u.color.invert]: o === "picture-card" && s === "light"
      })
    }
  ) : null, z = x ? /* @__PURE__ */ t(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ t(M, {}),
      title: i.previewFile,
      disabled: !(e.url || e.thumbUrl),
      onClick: E,
      className: c(r.item_ActionButton, {
        [u.color.invert]: o === "picture-card" && s === "light"
      })
    }
  ) : null, I = g ? /* @__PURE__ */ t(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ t(O, {}),
      title: i.downloadFile,
      onClick: () => p ? p(e) : Z(e),
      disabled: !(e != null && e.url),
      className: c(r.item_ActionButton, {
        [u.color.invert]: o === "picture-card" && s === "light"
      })
    }
  ) : null, V = /* @__PURE__ */ _(
    "span",
    {
      className: c(r.item_Actions, {
        [r.item_Actions__PictureCard]: o === "picture-card",
        [r.item_Actions__TextType]: o === "text"
      }),
      children: [
        I,
        z,
        S
      ]
    },
    "actions"
  ), j = [
    o !== "picture-card" ? /* @__PURE__ */ t("span", { className: r.item_Name, title: e.name, children: e.name }, "view") : null,
    V,
    o == "picture-card" ? /* @__PURE__ */ t(y, { file: e, visible: B, onClose: () => v(!1) }) : null
  ], b = /* @__PURE__ */ t(
    "div",
    {
      className: c(r.item, {
        [r.item__PictureCard]: o === "picture-card",
        [r.item__TextType]: o === "text",
        [r.item__Error]: e.status === "error"
      }),
      children: /* @__PURE__ */ _(
        "div",
        {
          className: c(r.item_Content, {
            [r.item_Content__PictureCard]: o === "picture-card"
          }),
          children: [
            k && /* @__PURE__ */ t($, { listeners: A }),
            /* @__PURE__ */ t(U, { isImgUrl: C, listType: o, file: e }),
            j
          ]
        }
      )
    }
  ), H = ((w = e.error) == null ? void 0 : w.message) || i.uploadError, N = e.status === "error" ? /* @__PURE__ */ t(f, { placement: "top", content: H, offset: [0, 6], children: b }) : b;
  return /* @__PURE__ */ t("div", { ref: n, style: { height: "100%" }, children: a ? a(N, e, m, {
    remove: h.bind(null, e)
  }) : N });
}
function U({
  isImgUrl: n,
  file: i,
  listType: o
}) {
  const e = o === "text" ? /* @__PURE__ */ t(Q, {}) : n && n(i) ? /* @__PURE__ */ t(F, {}) : X(i) ? /* @__PURE__ */ t(T, {}) : /* @__PURE__ */ t(W, {});
  let m = /* @__PURE__ */ t(G, {});
  if (o === "picture" || o === "picture-card")
    if (!i.thumbUrl && !i.url)
      m = /* @__PURE__ */ t(
        "div",
        {
          className: c({
            [r.item_Thumb]: o === "picture",
            [r.item_Thumb__PictureCard]: o === "picture-card"
          }),
          children: e
        }
      );
    else {
      const a = n != null && n(i) ? /* @__PURE__ */ t(
        "img",
        {
          src: i.thumbUrl || i.url,
          alt: i.name,
          className: r.item_Image
        }
      ) : e;
      m = /* @__PURE__ */ _(
        "div",
        {
          className: c({
            [r.item_Thumb]: !0,
            [r.item_Thumb__PictureCard]: o === "picture-card"
          }),
          children: [
            a,
            i.url ? /* @__PURE__ */ t("a", { className: r.item_Link, target: "_blank", rel: "noopener noreferrer" }) : null
          ]
        }
      );
    }
  if (o === "text") {
    const a = e;
    m = /* @__PURE__ */ t(
      "div",
      {
        className: c({
          [r.item_Thumb]: !0,
          [r.item_Thumb__TextType]: !0
        }),
        children: a
      }
    );
  }
  return m;
}
function y({
  file: n,
  visible: i,
  onClose: o
}) {
  const e = /* @__PURE__ */ t("div", { className: c(r.item_Preview, { [r.item_PreviewError]: !n.url }), children: n.url ? /* @__PURE__ */ t("img", { src: n.url, alt: n.name, className: r.item_Preview__Image }) : /* @__PURE__ */ t(F, {}) });
  return /* @__PURE__ */ t(R, { visible: i, onClose: o, title: n.name, children: e });
}
export {
  lt as default
};
