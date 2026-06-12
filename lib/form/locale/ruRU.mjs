import { ruRU as o } from "../../ui/Upload/locales/ruRU.mjs";
import { ruRU as a } from "../../ui/Select/locales/ruRU.mjs";
import { ruRU as m } from "../../ui/DatePicker/locales/ruRU.mjs";
const i = {
  fields: {
    array: {
      add: "Добавить",
      remove: "Удалить"
    },
    datePicker: m,
    select: a,
    upload: o
  },
  successMessage: "Данные успешно сохранены!",
  serverErrorMessage: "Произошла ошибка на сервере.",
  tabErrors: (r) => {
    const e = r % 10, s = r % 100;
    return e === 1 && s !== 11 ? `${r} ошибка` : e >= 2 && e <= 4 && (s < 12 || s > 14) ? `${r} ошибки` : `${r} ошибок`;
  }
};
export {
  i as ruRU
};
