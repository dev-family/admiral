import { jsx as a } from "react/jsx-runtime";
import { useCallback as i } from "react";
import { useForm as _ } from "../FormContext.mjs";
import { Form as k } from "../Form.mjs";
import { Upload as x } from "../../ui/Upload/index.mjs";
import { withFieldRules as A } from "../fieldRules.mjs";
const c = function({
  name: o,
  label: p,
  required: u,
  columnSpan: m,
  children: h,
  disabled: j,
  onChange: t,
  ...n
}) {
  var e;
  const { values: f, errors: d, setValues: g, locale: D } = _(), b = D.fields.upload, s = f[o], I = Array.isArray(s) ? s : s ? [s] : [], v = (e = d[o]) == null ? void 0 : e[0], y = i(
    ({ fileList: r }) => {
      const l = r ?? [];
      g((L) => ({ ...L, [o]: l })), t == null || t(l);
    },
    [o, t]
  ), F = i((r) => {
    r == null || r.preventDefault();
  }, []);
  return /* @__PURE__ */ a(
    k.Item,
    {
      label: p,
      onLabelClick: F,
      required: u,
      error: v,
      columnSpan: m,
      children: /* @__PURE__ */ a(
        x.Dragger,
        {
          ...n,
          locale: b,
          fileList: I,
          onChange: y
        }
      )
    }
  );
};
c.inputName = "DraggerInput";
const z = A(c, { supportsDisabled: !1 });
export {
  z as DraggerInput
};
