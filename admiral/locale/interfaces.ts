import { Locale as FormLocale } from '../form/interfaces'
import { FiltersLocale } from '../filters/interfaces'
import { DeleteActionLocale } from '../dataTable/actions'
import { AuthLocale } from '../auth/interfaces'
import { CRUDActionsLocale } from '../crud/interfaces'
import { PaginationLocale } from '../ui/Pagination/interfaces'
import { TableLocale } from '../ui/Table/interfaces'

export type AdmiralLocaleKey = 'ruRU' | 'enUS'

export interface AdmiralLocale {
    actions: CRUDActionsLocale
    filters: FiltersLocale
    form: FormLocale
    table: TableLocale
    pagination: PaginationLocale
    popconfirm: DeleteActionLocale
    auth: AuthLocale
}

export type AdmiralLocales = {
    [key in AdmiralLocaleKey]?: AdmiralLocale
}
