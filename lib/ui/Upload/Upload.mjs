import { jsxs as D, jsx as r, Fragment as J } from "react/jsx-runtime";
import K, { useState as Q, useMemo as V } from "react";
import { arrayMove as X } from "@dnd-kit/sortable";
import P from "rc-upload";
import Y from "rc-util/es/hooks/useMergedState";
import g from "classnames";
import { removeFileItem as Z } from "./utils.mjs";
import ee from "./components/UploadList.mjs";
import L from "./Upload.module.scss.mjs";
import { FiPlus as te } from "react-icons/fi";
import { enUS as oe } from "./locales/enUS.mjs";
function re(x) {
  const {
    fileList: c,
    showUploadList: h = !0,
    listType: p,
    onChange: i,
    onPreview: _,
    onDownload: j,
    showDownloadIcon: B = !0,
    onDrop: y,
    disabled: d = !1,
    locale: N = oe,
    isImageUrl: M,
    className: U,
    children: f,
    style: O,
    type: R = "select",
    itemRender: T,
    maxCount: m,
    isDraggable: A
  } = x, [E, z] = Q("drop"), [a, $] = Y([], {
    value: c,
    postState: (e) => e ?? []
  }), F = K.useRef(null);
  V(() => {
    const e = Date.now();
    (c || []).forEach((t, o) => {
      !t.uid && !Object.isFrozen(t) && (t.uid = `__AUTO__${e}_${o}__`);
    });
  }, [c]);
  const S = (e, t) => {
    let o = e.status === "removed" ? t : [...a, ...t];
    m === 1 ? o = o.slice(-1) : m && (o = o.slice(0, m)), $(o);
    const s = {
      file: e,
      fileList: o
    };
    i == null || i(s);
  }, W = async (e, t) => (d || S(e, t), !1), k = (e) => {
    const t = Z(e, a);
    t && S({ ...e, status: "removed" }, t);
  }, q = (e) => {
    const { active: t, over: o } = e;
    if (!o || t.id === o.id) return;
    const s = a.findIndex((u) => u.uid === t.id), v = a.findIndex((u) => u.uid === o.id);
    if (s === -1 || v === -1) return;
    const C = X(a, s, v).map(
      (u, H) => Object.assign(u, { order: H })
    ), G = {
      file: a[s],
      fileList: C
    };
    $(C), i == null || i(G);
  }, n = g("upload"), l = {
    // Spread the original props so new upload options reach rc-upload
    // without having to be re-listed here.
    ...x,
    prefixCls: n,
    beforeUpload: W,
    onChange: void 0
  };
  delete l.className, delete l.style, (!f || d) && delete l.id;
  const b = (e) => {
    const { showRemoveIcon: t } = typeof h == "boolean" ? {} : h;
    return h ? /* @__PURE__ */ r(J, { children: /* @__PURE__ */ r(
      ee,
      {
        listType: p,
        items: a,
        onRemove: k,
        onPreview: _,
        onDownload: j,
        onDragEnd: A && !d ? q : void 0,
        showRemoveIcon: !d && t,
        showPreviewIcon: !!_,
        showDownloadIcon: B,
        locale: N,
        isImageUrl: M,
        itemRender: T,
        appendButton: e
      }
    ) }) : null;
  }, I = (e, t) => {
    if (e === "drag" || e === "picture-card") {
      const o = m && c ? m > c.length : !0;
      o || (l.disabled = !0);
      let s = /* @__PURE__ */ r("div", { className: `${n}-drag-container`, children: f });
      e === "picture-card" && !f && (s = /* @__PURE__ */ D("div", { className: L.item_Thumb__DefaultPictureCardUpload, children: [
        /* @__PURE__ */ r(te, {}),
        N.pictureCardUpload
      ] }));
      const v = g(
        n,
        {
          [`${n}-drag`]: !0,
          [`${n}-drag-hover`]: E === "dragover",
          [`${n}-disabled`]: d || !o
        },
        U
      );
      return /* @__PURE__ */ r(
        "div",
        {
          className: v,
          onDrop: w,
          onDragOver: w,
          onDragLeave: w,
          style: {
            ...O,
            display: e === "picture-card" && !o ? "none" : ""
          },
          children: /* @__PURE__ */ r(
            P,
            {
              ...l,
              ref: F,
              disabled: d,
              className: g({
                [`${n}-btn`]: e === "drag",
                [L.item]: e === "picture-card"
              }),
              children: s
            }
          )
        }
      );
    }
    return /* @__PURE__ */ r("div", { className: L.buttonWrap, style: t, children: /* @__PURE__ */ r(P, { ...l, ref: F }) });
  }, w = (e) => {
    z(e.type), e.type === "drop" && (y == null || y(e));
  };
  if (R === "drag")
    return /* @__PURE__ */ D("span", { children: [
      I(R),
      b()
    ] });
  if (p === "picture-card") {
    const t = I(p);
    return /* @__PURE__ */ r("span", { className: g(`${n}-picture-card-wrapper`, U), children: b(t) });
  }
  return /* @__PURE__ */ D("span", { className: U, children: [
    I(p === "text" ? p : "basic", f ? void 0 : { display: "none" }),
    b()
  ] });
}
const ne = re;
ne.displayName = "Upload";
export {
  ne as Upload
};
