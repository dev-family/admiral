function n(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
export {
  n as toArray
};
