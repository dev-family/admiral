import { enUs as enUsPopconfirmLocale } from '../../ui/Popconfirm/locale/enUS'
import { PopconfirmLocaleType } from '../../ui/Popconfirm/interfaces'

export type DataTableType = {
    title: string
} & PopconfirmLocaleType

export const enUs: DataTableType = {
    title: 'Are you sure you want to delete?',
    ...enUsPopconfirmLocale,
}
