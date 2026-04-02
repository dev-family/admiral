import React from 'react';
import { PickerProps, PickerDateProps, PickerTimeProps } from './generatePicker/interfaces';
export type DatePickerProps = PickerProps<Date>;
export type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>;
export type TimePickerProps = Omit<PickerTimeProps<Date>, 'picker'>;
export declare const DatePicker: {
    ({ ref, ...props }: Omit<import("rc-picker").PickerProps<any>, "locale" | "generateConfig" | "hideHeader" | "components" | "prefixCls"> & {
        locale?: import("./generatePicker/interfaces").PickerLocale;
        size?: "XS" | "S" | "M" | "L";
        borderless?: boolean;
        alert?: boolean;
        dateOutputFormat?: import("./generatePicker/interfaces").DateOutputFormat;
    } & {
        ref?: React.Ref<import("./generatePicker/interfaces").CommonPickerMethods>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const RangePicker: {
    ({ ref, ...props }: Omit<import("rc-picker").RangePickerProps<any> & {
        showTime?: boolean;
    }, "locale" | "generateConfig" | "hideHeader" | "components" | "prefixCls"> & {
        locale?: import("./generatePicker/interfaces").PickerLocale;
        size?: "XS" | "S" | "M" | "L";
        borderless?: boolean;
        alert?: boolean;
        dateOutputFormat?: import("./generatePicker/interfaces").DateOutputFormat;
    } & {
        ref?: React.Ref<import("./generatePicker/interfaces").CommonPickerMethods>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const TimePicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const MonthPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const WeekPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const QuarterPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const YearPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
