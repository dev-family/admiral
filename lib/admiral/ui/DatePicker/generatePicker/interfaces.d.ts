import type { ComponentClass, ForwardedRef, Component } from 'react';
import { PickerMode, Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
import { PickerBaseProps as RCPickerBaseProps, PickerDateProps as RCPickerDateProps, PickerTimeProps as RCPickerTimeProps } from 'rc-picker/lib/Picker';
declare type SizeType = 'L' | 'M' | 'S' | 'XS';
export declare function getTimeProps<DateType>(props: {
    format?: string;
    picker?: PickerMode;
} & SharedTimeProps<DateType>): SharedTimeProps<DateType> | {
    showTime: SharedTimeProps<DateType>;
};
declare type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'hideHeader' | 'components' | 'prefixCls'> & {
    locale?: PickerLocale;
    size?: SizeType;
    borderless?: boolean;
    alert?: boolean;
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
export declare type PickerProps<DateType> = PickerBaseProps<DateType> | PickerDateProps<DateType> | PickerTimeProps<DateType>;
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
