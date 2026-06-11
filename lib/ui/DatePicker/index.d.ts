import React from 'react';
import { PickerProps, PickerDateProps, PickerTimeProps } from './generatePicker/interfaces.js';
export type DatePickerProps = PickerProps<Date>;
export type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>;
export type TimePickerProps = Omit<PickerTimeProps<Date>, 'picker'>;
export declare const DatePicker: {
    ({ ref, ...props }: Omit<Omit<import("rc-picker").PickerProps<any>, "onChange" | "multiple" | "format" | "showTime"> & {
        onChange?: ((date: any, dateString: string) => void) | undefined;
        format?: string | string[];
        showTime?: boolean | Partial<Omit<import("rc-picker/es/interface").SharedTimeProps<any>, "hoverRangeValue" | "hoverValue" | "onHover">> | undefined;
    }, "prefixCls" | "locale" | "generateConfig" | "hideHeader" | "components"> & {
        locale?: import("./generatePicker/interfaces.js").PickerLocale;
        size?: import("./generatePicker/interfaces.js").SizeType;
        borderless?: boolean;
        alert?: boolean;
        dateOutputFormat?: import("./generatePicker/interfaces.js").DateOutputFormat;
    } & {
        ref?: React.Ref<import("./generatePicker/interfaces.js").CommonPickerMethods>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const RangePicker: {
    ({ ref, ...props }: Omit<Omit<import("rc-picker").RangePickerProps<any>, "onChange" | "format" | "showTime"> & {
        onChange?: ((values: import("rc-picker/es/PickerInput/RangePicker").NoUndefinedRangeValueType<any> | null, dateStrings: [string, string]) => void) | undefined;
        format?: string | string[];
        showTime?: boolean;
    }, "prefixCls" | "locale" | "generateConfig" | "hideHeader" | "components"> & {
        locale?: import("./generatePicker/interfaces.js").PickerLocale;
        size?: import("./generatePicker/interfaces.js").SizeType;
        borderless?: boolean;
        alert?: boolean;
        dateOutputFormat?: import("./generatePicker/interfaces.js").DateOutputFormat;
    } & {
        ref?: React.Ref<import("./generatePicker/interfaces.js").CommonPickerMethods>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const TimePicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const MonthPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const WeekPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const QuarterPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export declare const YearPicker: (props: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
