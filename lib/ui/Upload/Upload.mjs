import { jsxs as N, jsx as o, Fragment as Z } from "react/jsx-runtime";
import w, { useState as T, useMemo as C } from "react";
import { arrayMove as ee } from "@dnd-kit/sortable";
import L from "rc-upload";
import re from "rc-util/es/hooks/useMergedState";
import I from "classnames";
import { removeFileItem as te } from "./utils.mjs";
import oe from "./components/UploadList.mjs";
import j from "./Upload.module.scss.mjs";
import { FiPlus as ne } from "react-icons/fi";
import { enUS as ce } from "./locales/enUS.mjs";
function de({
  ref: ae,
  fileList: i,
  showUploadList: v = !0,
  listType: p,
  onChange: d,
  onPreview: $,
  onDownload: x,
  showDownloadIcon: B = !0,
  onDrop: g,
  disabled: s = !1,
  locale: F = ce,
  isImageUrl: M,
  className: U,
  children: f,
  style: O,
  type: b = "select",
  itemRender: A,
  maxCount: u,
  isDraggable: E,
  multiple: W = !1,
  data: k = {},
  accept: q = "",
  ...G
}) {
  const [H, J] = T("drop"), [a, P] = re([], {
    value: i,
    postState: (e) => e ?? []
  }), h = w.useRef(null);
  C(() => {
    const e = Date.now();
    (i || []).forEach((r, t) => {
      !r.uid && !Object.isFrozen(r) && (r.uid = `__AUTO__${e}_${t}__`);
    });
  }, [i]);
  const z = (e, r) => {
    let t = e.status === "removed" ? r : [...a, ...r];
    u === 1 ? t = t.slice(-1) : u && (t = t.slice(0, u)), P(t);
    const c = {
      file: e,
      fileList: t
    };
    d == null || d(c);
  }, K = async (e, r) => (s || z(e, r), !1), Q = (e) => {
    const r = te(e, a);
    r && z({ ...e, status: "removed" }, r);
  }, V = (e) => {
    const { active: r, over: t } = e;
    if (!t || r.id === t.id) return;
    const c = a.findIndex((l) => l.uid === r.id), _ = a.findIndex((l) => l.uid === t.id);
    if (c === -1 || _ === -1) return;
    const D = ee(a, c, _).map(
      (l, Y) => Object.assign(l, { order: Y })
    ), X = {
      file: a[c],
      fileList: D
    };
    P(D), d == null || d(X);
  }, n = I("upload"), m = {
    fileList: i,
    showUploadList: v,
    listType: p,
    onChange: d,
    onPreview: $,
    onDownload: x,
    showDownloadIcon: B,
    onDrop: g,
    disabled: s,
    locale: F,
    isImageUrl: M,
    className: U,
    children: f,
    style: O,
    type: b,
    itemRender: A,
    maxCount: u,
    isDraggable: E,
    multiple: W,
    data: k,
    accept: q,
    ...G,
    prefixCls: n,
    beforeUpload: K,
    onChange: void 0
  };
  delete m.className, delete m.style, (!f || s) && delete m.id;
  const y = (e) => {
    const { showRemoveIcon: r } = typeof v == "boolean" ? {} : v;
    return v ? /* @__PURE__ */ o(Z, { children: /* @__PURE__ */ o(
      oe,
      {
        listType: p,
        items: a,
        onRemove: Q,
        onPreview: $,
        onDownload: x,
        onDragEnd: E && !s ? V : void 0,
        showRemoveIcon: !s && r,
        showPreviewIcon: !!$,
        showDownloadIcon: B,
        locale: F,
        isImageUrl: M,
        itemRender: A,
        appendButton: e
      }
    ) }) : null;
  }, R = (e, r) => {
    if (e === "drag" || e === "picture-card") {
      const t = u && i ? u > i.length : !0;
      t || (m.disabled = !0);
      let c = /* @__PURE__ */ o("div", { className: `${n}-drag-container`, children: f });
      e === "picture-card" && !f && (c = /* @__PURE__ */ N("div", { className: j.item_Thumb__DefaultPictureCardUpload, children: [
        /* @__PURE__ */ o(ne, {}),
        F.pictureCardUpload
      ] }));
      const _ = I(
        n,
        {
          [`${n}-drag`]: !0,
          [`${n}-drag-hover`]: H === "dragover",
          [`${n}-disabled`]: s || !t
        },
        U
      );
      return /* @__PURE__ */ o(
        "div",
        {
          className: _,
          onDrop: S,
          onDragOver: S,
          onDragLeave: S,
          style: {
            ...O,
            display: e === "picture-card" && !t ? "none" : ""
          },
          children: /* @__PURE__ */ o(
            L,
            {
              ...m,
              ref: h,
              disabled: s,
              className: I({
                [`${n}-btn`]: e === "drag",
                [j.item]: e === "picture-card"
              }),
              children: c
            }
          )
        }
      );
    }
    return /* @__PURE__ */ o("div", { className: j.buttonWrap, style: r, children: /* @__PURE__ */ o(L, { ...m, ref: h }) });
  }, S = (e) => {
    J(e.type), e.type === "drop" && (g == null || g(e));
  };
  if (b === "drag")
    return /* @__PURE__ */ N("span", { children: [
      R(b),
      y()
    ] });
  if (p === "picture-card") {
    const r = R(p);
    return /* @__PURE__ */ o("span", { className: I(`${n}-picture-card-wrapper`, U), children: y(r) });
  }
  return /* @__PURE__ */ N("span", { className: U, children: [
    R(p === "text" ? p : "basic", f ? void 0 : { display: "none" }),
    y()
  ] });
}
const se = de;
se.displayName = "Upload";
export {
  se as Upload
};
