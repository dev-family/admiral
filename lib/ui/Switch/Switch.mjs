import { jsx as s } from "react/jsx-runtime";
import { useRef as u } from "react";
import w from "rc-switch";
import { AiOutlineLoading as S } from "react-icons/ai";
import { useMergeRefs as g } from "@floating-ui/react";
import t from "classnames";
import i from "./Switch.module.scss.mjs";
function $({
  prefixCls: c,
  size: o = "M",
  loading: r,
  className: m = "",
  disabled: n,
  ref: f,
  ...l
}) {
  const a = u(null), p = g([a, f ?? null]), e = t("switch", c), d = /* @__PURE__ */ s("div", { className: `${e}-handle`, children: r && /* @__PURE__ */ s(S, { className: `${e}-loading-icon` }) }), h = t(
    i.switch,
    {
      [i.switch__SizeS]: o === "S",
      [i.switch__SizeL]: o === "L"
    },
    m
  );
  return /* @__PURE__ */ s(
    w,
    {
      ...l,
      prefixCls: e,
      className: h,
      disabled: n || r,
      ref: p,
      loadingIcon: d
    }
  );
}
export {
  $ as Switch
};
