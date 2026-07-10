import { jsx as i } from "react/jsx-runtime";
import { FiCameraOff as l, FiVideo as t, FiFile as f } from "react-icons/fi";
import { isImageUrl as c, isVideoUrl as d } from "../../ui/Upload/utils.mjs";
import n from "./TableFields.module.scss.mjs";
const u = (e) => {
  const { thumbUrl: o, url: s } = e || {}, m = o || s;
  let r = /* @__PURE__ */ i(l, {});
  return m && (c(e) ? r = /* @__PURE__ */ i("img", { src: m }) : d(e) ? r = o ? /* @__PURE__ */ i("img", { src: o }) : /* @__PURE__ */ i(t, {}) : r = /* @__PURE__ */ i(f, {})), /* @__PURE__ */ i("div", { className: n.file, children: r });
};
export {
  u as FileField
};
