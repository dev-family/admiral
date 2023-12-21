import { CRUDLocale } from './crud/interfaces';
import { DataTableType } from './dataTable/locale';
import { FiltersLocale } from './filters/interfaces';
import { Locale as FormLocale } from './form/interfaces';
import { PickerLocale } from './ui/DatePicker/generatePicker/interfaces';
import { LayoutLocale } from './ui/Layout/interfaces';
import { PaginationLocale } from './ui/Pagination/interfaces';
import { PopconfirmLocaleType } from './ui/Popconfirm/interfaces';
import { SelectLocale } from './ui/Select/interfaces';
import { UploadLocale } from './ui/Upload/interfaces';
declare type AdmiralLocale = {
    CRUD: CRUDLocale;
    table: DataTableType;
    filters: FiltersLocale;
    form: FormLocale;
    ui: {
        datePicker: PickerLocale;
        layout: LayoutLocale;
        pagination: PaginationLocale;
        popconfirm: PopconfirmLocaleType;
        select: SelectLocale;
        upload: UploadLocale;
    };
};
export declare type AdmiralLocales = {
    en: AdmiralLocale;
    ru: {};
};
export declare const admiralLocales: AdmiralLocales;
export {};
