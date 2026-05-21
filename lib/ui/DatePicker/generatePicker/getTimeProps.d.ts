import type { PickerMode, SharedTimeProps } from 'rc-picker/es/interface';
export declare function getTimeProps<DateType extends object>(props: {
    format?: string;
    picker?: PickerMode;
} & SharedTimeProps<DateType>): SharedTimeProps<DateType> | {
    showTime: SharedTimeProps<DateType>;
};
