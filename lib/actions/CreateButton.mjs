import { jsx as o } from "react/jsx-runtime";
import { FiPlus as e } from "react-icons/fi";
import { useLocation as m, Link as c } from "react-router-dom";
import { saveNavigationFrom as a } from "../utils/helpers/navigationState.mjs";
import s from "../ui/Button/Button.mjs";
const C = ({ basePath: r, children: n }) => {
  const t = m(), i = () => {
    a(t);
  };
  return /* @__PURE__ */ o(
    c,
    {
      to: `${r}/create`,
      state: {
        from: t
      },
      onClick: i,
      children: /* @__PURE__ */ o(s, { component: "span", iconLeft: /* @__PURE__ */ o(e, {}), children: n })
    }
  );
};
export {
  C as CreateButton
};
