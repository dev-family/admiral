import React from 'react';
import type { GenerateConfig } from 'rc-picker/es/generate/index';
import { CommonPickerMethods } from './interfaces.js';
export default function generatePicker<DateType extends object>(generateConfig: GenerateConfig<DateType>): {
    DatePicker: {
        ({ ref, ...props }: Omit<Omit<import("rc-picker").PickerProps<DateType>, "onChange" | "multiple" | "format" | "showTime"> & {
            onChange?: ((date: DateType | null, dateString: string) => void) | undefined;
            format?: string | string[];
            showTime?: boolean | Partial<Omit<import("rc-picker/es/interface").SharedTimeProps<DateType>, "hoverRangeValue" | "hoverValue" | "onHover">> | undefined;
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
