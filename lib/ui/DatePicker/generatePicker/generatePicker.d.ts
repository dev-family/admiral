import type { GenerateConfig } from 'rc-picker/es/generate/index';
declare function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    ({ ref, ...props }: Omit<Omit<import("rc-picker").PickerProps<any>, "onChange" | "multiple" | "format" | "showTime"> & {
        onChange?: ((date: any, dateString: string) => void) | undefined;
        format?: string | string[];
        showTime?: boolean | Partial<Omit<import("rc-picker/es/interface").SharedTimeProps<any>, "hoverRangeValue" | "hoverValue" | "onHover">> | undefined;
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
export default generatePicker;
