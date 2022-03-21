import { PickerMode } from 'rc-picker/lib/interface'
import { PickerLocale } from './generatePicker/interfaces'

export function getPlaceholder(
    picker: PickerMode | undefined,
    locale: PickerLocale,
    customizePlaceholder?: string,
): string {
    if (customizePlaceholder !== undefined) {
        return customizePlaceholder
    }

    if (picker === 'year' && locale.lang.yearPlaceholder) {
        return locale.lang.yearPlaceholder
    }
    if (picker === 'quarter' && locale.lang.quarterPlaceholder) {
        return locale.lang.quarterPlaceholder
    }
    if (picker === 'month' && locale.lang.monthPlaceholder) {
        return locale.lang.monthPlaceholder
    }
    if (picker === 'week' && locale.lang.weekPlaceholder) {
        return locale.lang.weekPlaceholder
    }
    return locale.lang.placeholder
}
