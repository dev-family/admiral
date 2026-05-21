import type { GenerateConfig } from 'rc-picker/es/generate/index';
import '../DatePicker.scss';
declare function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    ({ ref, ...props }: Omit<import("rc-picker").RangePickerProps<any> & {
        showTime?: boolean;
    }, "locale" | "generateConfig" | "hideHeader" | "components" | "prefixCls"> & {
        locale?: import("./interfaces").PickerLocale;
        size?: "XS" | "S" | "M" | "L";
        borderless?: boolean;
        alert?: boolean;
        dateOutputFormat?: import("./interfaces").DateOutputFormat;
    } & {
        ref?: React.Ref<import("./interfaces").CommonPickerMethods>;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default generateRangePicker;
