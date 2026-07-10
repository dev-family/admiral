import { jsx as t } from "react/jsx-runtime";
import { useContext as s, createContext as n } from "react";
import { enUS as i } from "./locale/enUS.mjs";
const o = n({
  values: {},
  options: {},
  errors: {},
  setErrors: () => {
  },
  setValues: () => {
  },
  setOptions: () => {
  },
  isSubmitting: !1,
  isFetching: !0,
  locale: i
});
function f({
  children: r,
  value: e
}) {
  return /* @__PURE__ */ t(o.Provider, { value: e, children: r });
}
function p() {
  const r = s(
    o
  );
  if (!r)
    throw new Error("useForm must be used under FormProvider");
  return r;
}
export {
  f as FormProvider,
  p as useForm
};
