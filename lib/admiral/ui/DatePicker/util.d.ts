import { PickerMode } from 'rc-picker/lib/interface'
import { PickerLocale } from './generatePicker/interfaces'
export declare function getPlaceholder(
    picker: PickerMode | undefined,
    locale: PickerLocale,
    customizePlaceholder?: string,
): string
