import type { ReactNode } from 'react'
import { Locale as FormLocale } from '../form/interfaces'
import { Locale as FiltersLocale } from '../filters/interfaces'
import { ColumnsType, TableLocale } from '../ui/Table/interfaces'
import { DrawerProps } from '../ui/Drawer/interfaces'
import { PaginationLocale } from '../ui/Pagination/interfaces'

export type CRUDLocale = {
    actions: CRUDActionsLocale
    filters: FiltersLocale
    form: FormLocale
    table: TableLocale
    pagination: PaginationLocale
}

export type CRUDActionsLocale = {
    submit: string
    back: string
    tableColumn: string
    paginationTotal: (total: number) => string
}

export type CRUDConfig<RecordType> = {
    path: string
    actions?: React.ReactNode
    resource: string
    index: {
        title: string
        newButtonText: string
        filterButtonText: string
        tableColumns: ColumnsType<RecordType>
    }
    table?: { dndRows?: boolean }
    form: {
        create: {
            fields: React.ReactNode
        }
        edit: {
            fields: React.ReactNode
        }
    }
    create: {
        title: string
    }
    update: {
        title: (id: string) => string
        view?: 'page' | 'drawer'
        drawer?: DrawerProps & { routePath?: (path: string) => string }
    }
    locale?: CRUDLocale
    filter?: { fields: JSX.Element }
    topContent?: ReactNode
    bottomContent?: ReactNode
}
