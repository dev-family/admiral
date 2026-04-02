import { Locale as RcPickerLocale } from 'rc-picker/lib/interface';
import type { PickerProps as RCPickerProps, RangePickerProps as RCRangePickerProps, PickerRef as RCPickerRef } from 'rc-picker';
type SizeType = 'L' | 'M' | 'S' | 'XS';
export type DateOutputFormat = 'iso' | 'utc';
export declare function toArray<T>(list: T | T[]): T[];
type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'hideHeader' | 'components' | 'prefixCls'> & {
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
export type PickerLocale = {
    lang: RcPickerLocale & AdditionalPickerLocaleLangProps;
} & AdditionalPickerLocaleProps;
export type AdditionalPickerLocaleProps = {
    dateFormat?: string;
    dateTimeFormat?: string;
    weekFormat?: string;
    monthFormat?: string;
};
export type AdditionalPickerLocaleLangProps = {
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
export type PickerProps<DateType extends object> = InjectDefaultProps<RCPickerProps<DateType>>;
export type PickerDateProps<DateType extends object> = PickerProps<DateType>;
export type PickerTimeProps<DateType extends object> = PickerProps<DateType>;
export type PickerRangeProps<DateType extends object> = InjectDefaultProps<RCRangePickerProps<DateType> & {
    showTime?: boolean;
}>;
export type PickerRangeValue<DateType> = [DateType | null, DateType | null] | null;
export interface CommonPickerMethods {
    focus: () => void;
    blur: () => void;
}
export type PickerRef<_P> = React.Ref<RCPickerRef & CommonPickerMethods>;
export type DatePickRef<DateType extends object> = PickerRef<PickerProps<DateType>>;
export {};
