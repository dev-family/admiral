import type { GenerateConfig } from 'rc-picker/lib/generate/index';
import '../DatePicker.scss';
declare function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    ({ ref, ...props }: Omit<import("rc-picker").PickerProps<any>, "locale" | "generateConfig" | "hideHeader" | "components" | "prefixCls"> & {
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
export default generatePicker;
