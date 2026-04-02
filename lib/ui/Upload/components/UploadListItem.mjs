import { jsx as t, jsxs as _, Fragment as q } from "react/jsx-runtime";
import { useState as G } from "react";
import c from "classnames";
import { FiTrash as H, FiEye as J, FiDownload as K, FiImage as F, FiPaperclip as M, FiVideo as O, FiFile as Q } from "react-icons/fi";
import { isVideoUrl as T } from "../utils.mjs";
import r from "../Upload.module.scss.mjs";
import { useTheme as W } from "../../../theme/ThemeContext.mjs";
import l from "../../Button/Button.mjs";
import X from "../../../utils/helpers/fileDownload.mjs";
import { Dialog as Y } from "../../Dialog/Dialog.mjs";
import { Tooltip as Z } from "../../Tooltip/Tooltip.mjs";
function at({
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
  onDownload: p
}) {
  var w;
  const { themeName: u, themeClassNames: s } = W(), [A, v] = G(!1), k = (d) => (j) => {
    j.preventDefault(), h(d);
  }, B = (d) => {
    v(!0), L(d, e);
  }, E = P ? /* @__PURE__ */ t(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ t(H, {}),
      title: i.removeFile,
      onClick: k(e),
      className: c(r.item_ActionButton, {
        [s.color.invert]: o === "picture-card" && u === "light"
      })
    }
  ) : null, S = x ? /* @__PURE__ */ t(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ t(J, {}),
      title: i.previewFile,
      disabled: !(e.url || e.thumbUrl),
      onClick: B,
      className: c(r.item_ActionButton, {
        [s.color.invert]: o === "picture-card" && u === "light"
      })
    }
  ) : null, z = g ? /* @__PURE__ */ t(
    l,
    {
      view: "clear",
      size: "S",
      type: "button",
      iconLeft: /* @__PURE__ */ t(K, {}),
      title: i.downloadFile,
      onClick: () => p ? p(e) : X(e),
      disabled: !(e != null && e.url),
      className: c(r.item_ActionButton, {
        [s.color.invert]: o === "picture-card" && u === "light"
      })
    }
  ) : null, D = /* @__PURE__ */ _(
    "span",
    {
      className: c(r.item_Actions, {
        [r.item_Actions__PictureCard]: o === "picture-card",
        [r.item_Actions__TextType]: o === "text"
      }),
      children: [
        z,
        S,
        E
      ]
    },
    "actions"
  ), I = [
    o !== "picture-card" ? /* @__PURE__ */ t("span", { className: r.item_Name, title: e.name, children: e.name }, "view") : null,
    D,
    o == "picture-card" ? /* @__PURE__ */ t(R, { file: e, visible: A, onClose: () => v(!1) }) : null
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
            /* @__PURE__ */ t($, { isImgUrl: C, listType: o, file: e }),
            I
          ]
        }
      )
    }
  ), V = ((w = e.error) == null ? void 0 : w.message) || i.uploadError, N = e.status === "error" ? /* @__PURE__ */ t(Z, { placement: "top", content: V, offset: [0, 6], children: b }) : b;
  return /* @__PURE__ */ t("div", { ref: n, style: { height: "100%" }, children: a ? a(N, e, m, {
    remove: h.bind(null, e)
  }) : N });
}
function $({
  isImgUrl: n,
  file: i,
  listType: o
}) {
  const e = o === "text" ? /* @__PURE__ */ t(M, {}) : n && n(i) ? /* @__PURE__ */ t(F, {}) : T(i) ? /* @__PURE__ */ t(O, {}) : /* @__PURE__ */ t(Q, {});
  let m = /* @__PURE__ */ t(q, {});
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
function R({
  file: n,
  visible: i,
  onClose: o
}) {
  const e = /* @__PURE__ */ t("div", { className: c(r.item_Preview, { [r.item_PreviewError]: !n.url }), children: n.url ? /* @__PURE__ */ t("img", { src: n.url, alt: n.name, className: r.item_Preview__Image }) : /* @__PURE__ */ t(F, {}) });
  return /* @__PURE__ */ t(Y, { visible: i, onClose: o, title: n.name, children: e });
}
export {
  at as default
};
