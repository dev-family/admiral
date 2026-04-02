function R(t, n) {
  const e = t.uid !== void 0 ? "uid" : "name", r = n.filter((i) => i[e] !== t[e]);
  return r.length === n.length ? null : r;
}
const x = (t = "") => {
  const n = t.split("/"), r = n[n.length - 1].split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(r) || [""])[0];
}, w = (t) => t.indexOf("image/") === 0, $ = (t) => {
  if (t.type && !t.thumbUrl)
    return w(t.type);
  const n = t.thumbUrl || t.url || "", e = x(n);
  return /^data:image\//.test(n) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(e) ? !0 : !(/^data:/.test(n) || e);
}, U = (t) => t.indexOf("video/") === 0, j = (t) => {
  if (t.type && !t.thumbUrl)
    return U(t.type);
  const n = t.thumbUrl || t.url || "", e = x(n);
  return /(avi|mp4|webm|ogm|ogv|ogg)$/i.test(e) ? !0 : !e;
}, s = 200;
function C(t) {
  return new Promise((n) => {
    if (!t.type || !w(t.type)) {
      n("");
      return;
    }
    const e = document.createElement("canvas");
    e.width = s, e.height = s, e.style.cssText = `position: fixed; left: 0; top: 0; width: ${s}px; height: ${s}px; z-index: 9999; display: none;`, document.body.appendChild(e);
    const r = e.getContext("2d"), i = new Image();
    i.onload = () => {
      I(r, i, 0, 0, s, s);
      const a = e.toDataURL();
      document.body.removeChild(e), n(a);
    }, i.src = window.URL.createObjectURL(t);
  });
}
function I(t, n, e, r, i, a, c, o) {
  arguments.length === 2 && (e = r = 0, i = t.canvas.width, a = t.canvas.height), c = typeof c == "number" ? c : 0.5, o = typeof o == "number" ? o : 0.5, c < 0 && (c = 0), o < 0 && (o = 0), c > 1 && (c = 1), o > 1 && (o = 1);
  const u = n.width, m = n.height, v = Math.min(i / u, a / m);
  let g = u * v, h = m * v, y, b, d, l, p = 1;
  g < i && (p = i / g), Math.abs(p - 1) < 1e-14 && h < a && (p = a / h), g *= p, h *= p, d = u / (g / i), l = m / (h / a), y = (u - d) * c, b = (m - l) * o, y < 0 && (y = 0), b < 0 && (b = 0), d > u && (d = u), l > m && (l = m), t.drawImage(n, y, b, d, l, e, r, i, a);
}
export {
  $ as isImageUrl,
  j as isVideoUrl,
  C as previewImage,
  R as removeFileItem
};
