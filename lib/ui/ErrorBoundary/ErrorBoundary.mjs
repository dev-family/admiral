var a = Object.defineProperty;
var p = (e, t, r) => t in e ? a(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var s = (e, t, r) => p(e, typeof t != "symbol" ? t + "" : t, r);
import c from "react";
class h extends c.Component {
  constructor() {
    super(...arguments);
    s(this, "state", { error: null });
  }
  static getDerivedStateFromError(r) {
    return { error: r };
  }
  componentDidCatch(r, i) {
    var o, n;
    (n = (o = this.props).onError) == null || n.call(o, r, i);
  }
  render() {
    if (this.state.error) {
      const { fallback: r } = this.props;
      return typeof r == "function" ? r(this.state.error) : r ?? null;
    }
    return this.props.children;
  }
}
export {
  h as ErrorBoundary
};
