import d from "axios";
import { Notification as u } from "../../ui/Notification/Notification.mjs";
async function i(t) {
  var a;
  try {
    const o = t == null ? void 0 : t.name, n = o && o.split(".")[1] || null;
    let e = c(t == null ? void 0 : t.type);
    const s = await d.get((t == null ? void 0 : t.url) || "", { responseType: "blob" });
    e || (e = c((a = s == null ? void 0 : s.data) == null ? void 0 : a.type));
    const r = n ? o : `download_file.${e}`;
    m(s.data, r);
  } catch (o) {
    const { statusText: n, status: e } = (o == null ? void 0 : o.response) ?? {};
    u({
      message: `error status: ${e}, message: ${n || "unknown"}`,
      type: "error"
    });
  }
}
function m(t, a) {
  const o = URL.createObjectURL(t), n = document.createElement("a");
  n.href = o, n.download = a || "download", document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(o);
}
function c(t) {
  return t && t.split("/")[1] || null;
}
export {
  i as default
};
