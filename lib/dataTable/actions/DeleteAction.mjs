import { jsx as e } from "react/jsx-runtime";
import { useCallback as p } from "react";
import { FiTrash as l } from "react-icons/fi";
import { useDataTable as h } from "../DataTableContext.mjs";
import { useDataProvider as u } from "../../dataProvider/DataProviderContext.mjs";
import { Popconfirm as d } from "../../ui/Popconfirm/Popconfirm.mjs";
import { enUS as D } from "../locale/enUS.mjs";
import { Notification as g } from "../../ui/Notification/Notification.mjs";
import y from "../../ui/Button/Button.mjs";
function k({ resource: o, id: r, buttonProps: t, locale: i }) {
  const { title: m, ...a } = i ?? D, { deleteOne: n } = u(), { refresh: c } = h(), s = p(async () => {
    try {
      await n(o, { id: r }), c();
    } catch (f) {
      g({
        message: f.response.data.message,
        type: "error"
      });
    }
  }, []);
  return /* @__PURE__ */ e(
    d,
    {
      title: m,
      placement: "left",
      onConfirm: s,
      locale: a,
      children: /* @__PURE__ */ e(y, { view: "clear", size: "S", iconRight: /* @__PURE__ */ e(l, {}), ...t })
    }
  );
}
export {
  k as DeleteAction
};
