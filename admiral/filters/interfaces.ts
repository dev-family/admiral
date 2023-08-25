import { Locale as FormLocale } from '../form/interfaces'

export type FiltersLocale = { title: string; clear: string; submit: string }

export type Locale = {
    filters: FiltersLocale
    form: FormLocale
}
