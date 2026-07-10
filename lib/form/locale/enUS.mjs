import { enUS as s } from "../../ui/Upload/locales/enUS.mjs";
import { enUS as o } from "../../ui/Select/locales/enUS.mjs";
import { enUS as d } from "../../ui/DatePicker/locales/enUS.mjs";
const t = {
  fields: {
    array: {
      add: "Add",
      remove: "Remove"
    },
    datePicker: d,
    select: o,
    upload: s
  },
  successMessage: "Data saved successfully!",
  serverErrorMessage: "An error occurred on the server.",
  tabErrors: (e) => e === 1 ? "1 error" : `${e} errors`,
  hiddenFieldError: (e, r) => `${r} (hidden field "${e}")`
};
export {
  t as enUS
};
