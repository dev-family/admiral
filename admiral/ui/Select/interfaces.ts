import { SelectProps as RcSelectProps, BaseSelectRef } from 'rc-select'
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select'
import { OptionProps } from 'rc-select/lib/Option'

type RawValue = string | number

export type { OptionProps, BaseSelectRef as RefSelectProps, BaseOptionType, DefaultOptionType }
export type SelectSizeType = 'L' | 'M' | 'S' | 'XS'

export interface LabeledValue {
    key?: string
    value: RawValue
    label: React.ReactNode
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export interface SelectProps<
    ValueType = any,
    OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<
        RcSelectProps<ValueType, OptionType>,
        | 'mode'
        | 'getInputElement'
        | 'getRawInputElement'
        | 'backfill'
        | 'inputIcon'
        | 'clearIcon'
        | 'removeIcon'
        | 'menuItemSelectedIcon'
        | 'prefixCls'
    > {
    size?: SelectSizeType
    mode?: 'multiple' | 'tags'
    borderless?: boolean
    alert?: boolean
    locale?: SelectLocale
}

export interface SelectLocale {
    notFound: string
}
