import { Locale as FormLocale } from '../form/interfaces.js';
import { FiltersLocale } from '../filters/interfaces.js';
import { DeleteActionLocale } from '../dataTable/actions/index.js';
import { AuthLocale } from '../auth/interfaces.js';
import { CRUDActionsLocale } from '../crud/interfaces.js';
import { PaginationLocale } from '../ui/Pagination/interfaces.js';
import { TableLocale } from '../ui/Table/interfaces.js';
export type AdmiralLocaleKey = 'ruRU' | 'enUS';
export interface AdmiralLocale {
    actions: CRUDActionsLocale;
    filters: FiltersLocale;
    form: FormLocale;
    table: TableLocale;
    pagination: PaginationLocale;
    popconfirm: DeleteActionLocale;
    auth: AuthLocale;
}
export type AdmiralLocales = {
    [key in AdmiralLocaleKey]?: AdmiralLocale;
};
