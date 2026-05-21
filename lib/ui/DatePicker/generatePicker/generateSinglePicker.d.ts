import React from 'react';
import type { GenerateConfig } from 'rc-picker/es/generate/index';
import { CommonPickerMethods } from './interfaces';
export default function generatePicker<DateType extends object>(generateConfig: GenerateConfig<DateType>): {
    DatePicker: {
        ({ ref, ...props }: Omit<import("rc-picker").PickerProps<DateType>, "locale" | "generateConfig" | "hideHeader" | "components" | "prefixCls"> & {
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
