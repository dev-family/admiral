import { enUS as r } from "../../ui/Upload/locales/enUS.mjs";
import { enUS as s } from "../../ui/Select/locales/enUS.mjs";
import { enUS as o } from "../../ui/DatePicker/locales/enUS.mjs";
const t = {
  fields: {
    array: {
      add: "Add",
      remove: "Remove"
    },
    datePicker: o,
    select: s,
    upload: r
  },
  successMessage: "Data saved successfully!",
  serverErrorMessage: "An error occurred on the server.",
  tabErrors: (e) => e === 1 ? "1 error" : `${e} errors`
};
export {
  t as enUS
};
