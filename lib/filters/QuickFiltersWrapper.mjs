import { jsx as r } from "react/jsx-runtime";
import { useRef as t } from "react";
import { Form as e } from "../form/Form.mjs";
import { QuickFilters as m } from "./QuickFilters.mjs";
const u = ({ filters: o }) => {
  const i = t(null);
  return /* @__PURE__ */ r(e, { ref: i, children: /* @__PURE__ */ r(e.Fields, { singleColumn: !0, children: /* @__PURE__ */ r(m, { filters: o }) }) });
};
export {
  u as default
};
