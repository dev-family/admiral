import { ruRU as o } from "../../ui/Upload/locales/ruRU.mjs";
import { ruRU as a } from "../../ui/Select/locales/ruRU.mjs";
import { ruRU as d } from "../../ui/DatePicker/locales/ruRU.mjs";
const u = {
  fields: {
    array: {
      add: "Добавить",
      remove: "Удалить"
    },
    datePicker: d,
    select: a,
    upload: o
  },
  successMessage: "Данные успешно сохранены!",
  serverErrorMessage: "Произошла ошибка на сервере.",
  tabErrors: (r) => {
    const e = r % 10, s = r % 100;
    return e === 1 && s !== 11 ? `${r} ошибка` : e >= 2 && e <= 4 && (s < 12 || s > 14) ? `${r} ошибки` : `${r} ошибок`;
  },
  hiddenFieldError: (r, e) => `${e} (скрытое поле «${r}»)`
};
export {
  u as ruRU
};
