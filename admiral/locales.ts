import { CRUDLocale } from './crud/interfaces'
import { defaultLocale as CRUDEn } from './crud/locale/LocaleContext'
import { enUs as tableEn, DataTableType } from './dataTable/locale'
import { FiltersLocale } from './filters/interfaces'
import { enUS as filtersLocaleEn } from './filters/locale/enUS'
import { Locale as FormLocale } from './form/interfaces'
import { enUS as formLocaleEn } from './form/locale/enUS'
import datePickerLocaleEn from './ui/DatePicker/locale/en_US'
import { PickerLocale } from './ui/DatePicker/generatePicker/interfaces'
import { enUs as LayoutLocaleEn } from './ui/Layout/locale/enUs'
import { LayoutLocale } from './ui/Layout/interfaces'
import { enUs as paginationLocaleEn } from './ui/Pagination/locales/enUS'
import { PaginationLocale } from './ui/Pagination/interfaces'
import { enUs as PopconfirmLocaleEn } from './ui/Popconfirm/locale'
import { PopconfirmLocaleType } from './ui/Popconfirm/interfaces'
import { enUs as selectLocaleEn } from './ui/Select/locales/enUS'
import { SelectLocale } from './ui/Select/interfaces'
import { enUS as uploadLocaleEn } from './ui/Upload/locales/enUS'
import { UploadLocale } from './ui/Upload/interfaces'

type AdmiralLocale = {
    CRUD: CRUDLocale
    table: DataTableType
    filters: FiltersLocale
    form: FormLocale
    ui: {
        datePicker: PickerLocale
        layout: LayoutLocale
        pagination: PaginationLocale
        popconfirm: PopconfirmLocaleType
        select: SelectLocale
        upload: UploadLocale
    }
}

export type AdmiralLocales = {
    en: AdmiralLocale
    ru: {}
}

export const admiralLocales: AdmiralLocales = {
    en: {
        CRUD: CRUDEn,
        table: tableEn,
        filters: filtersLocaleEn,
        form: formLocaleEn,
        ui: {
            datePicker: datePickerLocaleEn,
            layout: LayoutLocaleEn,
            pagination: paginationLocaleEn,
            popconfirm: PopconfirmLocaleEn,
            select: selectLocaleEn,
            upload: uploadLocaleEn,
        },
    },
    ru: {},
}
