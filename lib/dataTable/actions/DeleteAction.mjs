import { jsx as e } from "react/jsx-runtime";
import { useCallback as p } from "react";
import { FiTrash as l } from "react-icons/fi";
import { useDataTable as h } from "../DataTableContext.mjs";
import { enUS as u } from "../locale/enUS.mjs";
import { useDataProvider as d } from "../../dataProvider/DataProviderContext.mjs";
import { Popconfirm as D } from "../../ui/Popconfirm/Popconfirm.mjs";
import g from "../../ui/Button/Button.mjs";
import { Notification as y } from "../../ui/Notification/Notification.mjs";
function k({ resource: o, id: r, buttonProps: t, locale: i }) {
  const { title: m, ...a } = i ?? u, { deleteOne: n } = d(), { refresh: c } = h(), s = p(async () => {
    try {
      await n(o, { id: r }), c();
    } catch (f) {
      y({
        message: f.response.data.message,
        type: "error"
      });
    }
  }, []);
  return /* @__PURE__ */ e(
    D,
    {
      title: m,
      placement: "left",
      onConfirm: s,
      locale: a,
      children: /* @__PURE__ */ e(g, { view: "clear", size: "S", iconRight: /* @__PURE__ */ e(l, {}), ...t })
    }
  );
}
export {
  k as DeleteAction
};
