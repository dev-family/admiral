import React from 'react';
import type { GenerateConfig } from 'rc-picker/es/generate/index';
import { CommonPickerMethods } from './interfaces';
export default function generateSingleRangePicker<DateType extends object>(generateConfig: GenerateConfig<DateType>): {
    DateRangePicker: {
        ({ ref, ...props }: Omit<import("rc-picker").RangePickerProps<DateType> & {
            showTime?: boolean;
        }, "locale" | "generateConfig" | "hideHeader" | "components" | "prefixCls"> & {
            locale?: import("./interfaces").PickerLocale;
            size?: "XS" | "S" | "M" | "L";
            borderless?: boolean;
            alert?: boolean;
            dateOutputFormat?: import("./interfaces").DateOutputFormat;
        } & {
            ref?: React.Ref<CommonPickerMethods>;
        }): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
};
