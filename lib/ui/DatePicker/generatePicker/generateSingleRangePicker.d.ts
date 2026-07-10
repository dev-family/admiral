import React from 'react';
import type { GenerateConfig } from 'rc-picker/es/generate/index';
import { CommonPickerMethods } from './interfaces.js';
export default function generateSingleRangePicker<DateType extends object>(generateConfig: GenerateConfig<DateType>): {
    DateRangePicker: {
        ({ ref, ...props }: Omit<Omit<import("rc-picker").RangePickerProps<DateType>, "onChange" | "format" | "showTime"> & {
            onChange?: ((values: import("rc-picker/es/PickerInput/RangePicker").NoUndefinedRangeValueType<DateType> | null, dateStrings: [string, string]) => void) | undefined;
            format?: string | string[];
            showTime?: boolean;
        }, "prefixCls" | "locale" | "generateConfig" | "hideHeader" | "components"> & {
            locale?: import("./interfaces.js").PickerLocale;
            size?: import("./interfaces.js").SizeType;
            borderless?: boolean;
            alert?: boolean;
            dateOutputFormat?: import("./interfaces.js").DateOutputFormat;
        } & {
            ref?: React.Ref<CommonPickerMethods>;
        }): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
};
