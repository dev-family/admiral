function a(e, r, n) {
  return n !== void 0 ? n : e === "year" && r.lang.yearPlaceholder ? r.lang.yearPlaceholder : e === "quarter" && r.lang.quarterPlaceholder ? r.lang.quarterPlaceholder : e === "month" && r.lang.monthPlaceholder ? r.lang.monthPlaceholder : e === "week" && r.lang.weekPlaceholder ? r.lang.weekPlaceholder : r.lang.placeholder;
}
export {
  a as getPlaceholder
};
