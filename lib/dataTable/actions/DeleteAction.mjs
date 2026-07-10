import { jsx as e } from "react/jsx-runtime";
import { useCallback as h } from "react";
import { FiTrash as u } from "react-icons/fi";
import { useDataTable as d } from "../DataTableContext.mjs";
import { enUS as D } from "../locale/enUS.mjs";
import { useDataProvider as y } from "../../dataProvider/DataProviderContext.mjs";
import { Popconfirm as S } from "../../ui/Popconfirm/Popconfirm.mjs";
import b from "../../ui/Button/Button.mjs";
import { Notification as v } from "../../ui/Notification/Notification.mjs";
function B({ resource: t, id: r, buttonProps: s, locale: c }) {
  const { title: f, ...p } = c ?? D, { deleteOne: i } = y(), { refresh: m } = d(), l = h(async () => {
    var n, a;
    try {
      await i(t, { id: r }), m();
    } catch (o) {
      const g = (a = (n = o == null ? void 0 : o.response) == null ? void 0 : n.data) == null ? void 0 : a.message;
      v({
        message: g ?? (o instanceof Error ? o.message : String(o)),
        type: "error"
      });
    }
  }, [i, t, r, m]);
  return /* @__PURE__ */ e(
    S,
    {
      title: f,
      placement: "left",
      onConfirm: l,
      locale: p,
      children: /* @__PURE__ */ e(b, { view: "clear", size: "S", iconRight: /* @__PURE__ */ e(u, {}), ...s })
    }
  );
}
export {
  B as DeleteAction
};
