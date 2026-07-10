function t(e, r) {
  return "key" in e && e.key !== void 0 && e.key !== null ? e.key : e.dataIndex ? Array.isArray(e.dataIndex) ? e.dataIndex.join(".") : e.dataIndex : r;
}
function a(e, r) {
  return `${e}`;
}
export {
  t as getColumnKey,
  a as getColumnPos
};
