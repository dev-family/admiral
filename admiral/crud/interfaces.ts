import { Locale as FormLocale } from '../form/interfaces'
import { Locale as FiltersLocale } from '../filters/interfaces'
import { ColumnsType } from '../ui/Table/interfaces'
import { DrawerProps } from '../ui/Drawer/interfaces'

export type CRUDLocale = {
    filters: FiltersLocale
    form: FormLocale
}

export type CRUDConfig<RecordType> = {
    path: string
    actions?: React.ReactNode
    resource: string
    index: {
        title: string
        newButtonText: string
        filterButtonText: string
        tableOptions: ColumnsType<RecordType>
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
}
