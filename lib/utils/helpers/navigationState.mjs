const n = "admiral_navigation_from";
function o(a) {
  try {
    const e = {
      pathname: a.pathname,
      search: a.search || "",
      timestamp: Date.now()
    };
    sessionStorage.setItem(n, JSON.stringify(e));
  } catch (e) {
    console.warn("Failed to save navigation state:", e);
  }
}
function s(a) {
  if (a != null && a.pathname)
    return {
      pathname: a.pathname,
      search: a.search || ""
    };
  try {
    const e = sessionStorage.getItem(n);
    if (!e) return null;
    const t = JSON.parse(e), r = 3600 * 1e3;
    return Date.now() - t.timestamp > r ? (i(), null) : {
      pathname: t.pathname,
      search: t.search
    };
  } catch (e) {
    return console.warn("Failed to retrieve navigation state:", e), null;
  }
}
function i() {
  try {
    sessionStorage.removeItem(n);
  } catch (a) {
    console.warn("Failed to clear navigation state:", a);
  }
}
export {
  i as clearNavigationFrom,
  s as getNavigationFrom,
  o as saveNavigationFrom
};
