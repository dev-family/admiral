import type { ComponentClass, ForwardedRef, Component } from 'react';
import { RangeValue, Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import { PickerBaseProps as RCPickerBaseProps, PickerDateProps as RCPickerDateProps, PickerTimeProps as RCPickerTimeProps } from 'rc-picker/lib/Picker';
import { RangePickerProps } from 'rc-picker';
declare type SizeType = 'L' | 'M' | 'S' | 'XS';
export declare type DateOutputFormat = 'iso' | 'utc';
export declare function toArray<T>(list: T | T[]): T[];
declare type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'hideHeader' | 'components' | 'prefixCls'> & {
    locale?: PickerLocale;
    size?: SizeType;
    borderless?: boolean;
    alert?: boolean;
    dateOutputFormat?: DateOutputFormat;
};
export interface TimePickerLocale {
    placeholder?: string;
    rangePlaceholder?: [string, string];
}
export declare type PickerLocale = {
    lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
} & AdditionalPickerLocaleProps;
export declare type AdditionalPickerLocaleProps = {
    dateFormat?: string;
    dateTimeFormat?: string;
    weekFormat?: string;
    monthFormat?: string;
};
export declare type AdditionalPickerLocaleLangProps = {
    placeholder: string;
    yearPlaceholder?: string;
    quarterPlaceholder?: string;
    monthPlaceholder?: string;
    weekPlaceholder?: string;
    rangeYearPlaceholder?: [string, string];
    rangeMonthPlaceholder?: [string, string];
    rangeWeekPlaceholder?: [string, string];
    rangePlaceholder?: [string, string];
};
export declare type PickerBaseProps<DateType> = InjectDefaultProps<RCPickerBaseProps<DateType>>;
export declare type PickerDateProps<DateType> = InjectDefaultProps<RCPickerDateProps<DateType>>;
export declare type PickerTimeProps<DateType> = InjectDefaultProps<RCPickerTimeProps<DateType>>;
export declare type PickerRangeProps<DateType> = InjectDefaultProps<RangePickerProps<DateType> & {
    showTime?: boolean;
}>;
export declare type PickerProps<DateType> = PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>;
export declare type PickerRangeValue<DateType> = RangeValue<DateType>;
export interface CommonPickerMethods {
    focus: () => void;
    blur: () => void;
}
export interface PickerComponentClass<P = {}, S = unknown> extends ComponentClass<P, S> {
    new (...args: ConstructorParameters<ComponentClass<P, S>>): InstanceType<ComponentClass<P, S>> & CommonPickerMethods;
}
export declare type PickerRef<P> = ForwardedRef<Component<P> & CommonPickerMethods>;
export declare type DatePickRef<DateType> = PickerRef<PickerProps<DateType>>;
export {};
