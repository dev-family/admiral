import type { GenerateConfig } from 'rc-picker/es/generate/index';
declare function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    ({ ref, ...props }: Omit<Omit<import("rc-picker").RangePickerProps<any>, "onChange" | "format" | "showTime"> & {
        onChange?: ((values: import("rc-picker/es/PickerInput/RangePicker").NoUndefinedRangeValueType<any> | null, dateStrings: [string, string]) => void) | undefined;
        format?: string | string[];
        showTime?: boolean;
    }, "prefixCls" | "locale" | "generateConfig" | "hideHeader" | "components"> & {
        locale?: import("./interfaces.js").PickerLocale;
        size?: import("./interfaces.js").SizeType;
        borderless?: boolean;
        alert?: boolean;
        dateOutputFormat?: import("./interfaces.js").DateOutputFormat;
    } & {
        ref?: React.Ref<import("./interfaces.js").CommonPickerMethods>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default generateRangePicker;
