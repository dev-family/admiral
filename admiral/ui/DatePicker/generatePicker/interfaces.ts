import type { ComponentClass, ForwardedRef, Component } from 'react'
import { RangeValue, Locale as RcPickerLocale } from 'rc-picker/lib/interface'

import {
    PickerBaseProps as RCPickerBaseProps,
    PickerDateProps as RCPickerDateProps,
    PickerTimeProps as RCPickerTimeProps,
} from 'rc-picker/lib/Picker'
import { RangePickerProps } from 'rc-picker'

type SizeType = 'L' | 'M' | 'S' | 'XS'

export function toArray<T>(list: T | T[]): T[] {
    if (!list) {
        return []
    }
    return Array.isArray(list) ? list : [list]
}

type InjectDefaultProps<Props> = Omit<
    Props,
    'locale' | 'generateConfig' | 'hideHeader' | 'components' | 'prefixCls'
> & {
    locale?: PickerLocale
    size?: SizeType
    borderless?: boolean
    alert?: boolean
}

export interface TimePickerLocale {
    placeholder?: string
    rangePlaceholder?: [string, string]
}

export type PickerLocale = {
    lang: RcPickerLocale & AdditionalPickerLocaleLangProps
} & AdditionalPickerLocaleProps

export type AdditionalPickerLocaleProps = {
    dateFormat?: string
    dateTimeFormat?: string
    weekFormat?: string
    monthFormat?: string
}

export type AdditionalPickerLocaleLangProps = {
    placeholder: string
    yearPlaceholder?: string
    quarterPlaceholder?: string
    monthPlaceholder?: string
    weekPlaceholder?: string
    rangeYearPlaceholder?: [string, string]
    rangeMonthPlaceholder?: [string, string]
    rangeWeekPlaceholder?: [string, string]
    rangePlaceholder?: [string, string]
}

// Picker Props
export type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>
export type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>
export type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>
export type PickerRangeProps<DateType> = InjectDefaultProps<
    RangePickerProps<DateType> & { showTime?: boolean }
>

export type PickerProps<DateType> =
    | PickerBaseProps<DateType>
    | PickerDateProps<DateType>
    | PickerTimeProps<DateType>

export type PickerRangeValue<DateType> = RangeValue<DateType>
export interface CommonPickerMethods {
    focus: () => void
    blur: () => void
}

export interface PickerComponentClass<P = {}, S = unknown> extends ComponentClass<P, S> {
    new (...args: ConstructorParameters<ComponentClass<P, S>>): InstanceType<ComponentClass<P, S>> &
        CommonPickerMethods
}

export type PickerRef<P> = ForwardedRef<Component<P> & CommonPickerMethods>

export type DatePickRef<DateType> = PickerRef<PickerProps<DateType>>
