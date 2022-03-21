import type { ComponentClass, ForwardedRef, Component } from 'react'
import { PickerMode, Locale as RcPickerLocale } from 'rc-picker/lib/interface'
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel'
import {
    PickerBaseProps as RCPickerBaseProps,
    PickerDateProps as RCPickerDateProps,
    PickerTimeProps as RCPickerTimeProps,
} from 'rc-picker/lib/Picker'

type SizeType = 'L' | 'M' | 'S' | 'XS'

function toArray<T>(list: T | T[]): T[] {
    if (!list) {
        return []
    }
    return Array.isArray(list) ? list : [list]
}

export function getTimeProps<DateType>(
    props: { format?: string; picker?: PickerMode } & SharedTimeProps<DateType>,
) {
    const { format, picker, showHour, showMinute, showSecond, use12Hours } = props

    const firstFormat = toArray(format)[0]
    const showTimeObj: SharedTimeProps<DateType> = { ...props }

    if (firstFormat && typeof firstFormat === 'string') {
        if (!firstFormat.includes('s') && showSecond === undefined) {
            showTimeObj.showSecond = false
        }
        if (!firstFormat.includes('m') && showMinute === undefined) {
            showTimeObj.showMinute = false
        }
        if (!firstFormat.includes('H') && !firstFormat.includes('h') && showHour === undefined) {
            showTimeObj.showHour = false
        }

        if ((firstFormat.includes('a') || firstFormat.includes('A')) && use12Hours === undefined) {
            showTimeObj.use12Hours = true
        }
    }

    if (picker === 'time') {
        return showTimeObj
    }

    if (typeof firstFormat === 'function') {
        // format of showTime should use default when format is custom format function
        delete showTimeObj.format
    }

    return {
        showTime: showTimeObj,
    }
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

export type PickerProps<DateType> =
    | PickerBaseProps<DateType>
    | PickerDateProps<DateType>
    | PickerTimeProps<DateType>

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
