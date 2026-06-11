import { jsx as o } from "react/jsx-runtime";
import { Suspense as t, lazy as i } from "react";
import { Spin as m } from "../Spin/Spin.mjs";
const p = i(() => import("./Editor.mjs")), c = (r) => /* @__PURE__ */ o(t, { fallback: /* @__PURE__ */ o(m, {}), children: /* @__PURE__ */ o(p, { ...r }) });
export {
  c as Editor
};
