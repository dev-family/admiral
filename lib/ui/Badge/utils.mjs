import r, { isValidElement as o } from "react";
function c(n, t, e) {
  return o(n) ? r.cloneElement(
    n,
    typeof e == "function" ? e(n.props || {}) : e
  ) : t;
}
function f(n, t) {
  return c(n, n, t);
}
export {
  f as cloneElement,
  c as replaceElement
};
