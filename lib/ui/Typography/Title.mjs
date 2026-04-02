import { jsx as n } from "react/jsx-runtime";
import s from "./Base.mjs";
import { tupleNum as f } from "../../utils/type.mjs";
const i = f(1, 2, 3, 4, 5);
function c({ ref: o, ...r }) {
  const { level: t = 1, ...m } = r;
  let e;
  return i.indexOf(t) !== -1 ? e = `h${t}` : e = "h1", /* @__PURE__ */ n(s, { ref: o, ...m, component: e });
}
export {
  c as default
};
