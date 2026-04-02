const t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null;
export {
  t as isObject
};
