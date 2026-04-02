import { jsx as a } from "react/jsx-runtime";
import { useCallback as c } from "react";
import { useForm as _ } from "../FormContext.mjs";
import { Form as k } from "../Form.mjs";
import { Upload as x } from "../../ui/Upload/index.mjs";
const A = function({
  name: o,
  label: i,
  required: u,
  columnSpan: p,
  children: V,
  disabled: j,
  onChange: t,
  ...m
}) {
  var e;
  const { values: n, errors: f, setValues: d, locale: g } = _(), D = g.fields.upload, l = n[o], b = Array.isArray(l) ? l : l ? [l] : [], I = (e = f[o]) == null ? void 0 : e[0], v = c(
    ({ fileList: r }) => {
      const s = r ?? [];
      d((L) => ({ ...L, [o]: s })), t == null || t(s);
    },
    [o, t]
  ), y = c((r) => {
    r == null || r.preventDefault();
  }, []);
  return /* @__PURE__ */ a(
    k.Item,
    {
      label: i,
      onLabelClick: y,
      required: u,
      error: I,
      columnSpan: p,
      children: /* @__PURE__ */ a(
        x.Dragger,
        {
          ...m,
          locale: D,
          fileList: b,
          onChange: v
        }
      )
    }
  );
};
A.inputName = "DraggerInput";
export {
  A as DraggerInput
};
