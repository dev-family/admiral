import type { PickerMode, SharedTimeProps } from 'rc-picker/es/interface';
export declare function getRangeTimeProps<DateType extends object>(props: {
    format?: string;
    picker?: PickerMode;
} & Omit<SharedTimeProps<DateType>, 'defaultValue' | 'disabledTime'>): SharedTimeProps<DateType> | {
    showTime: SharedTimeProps<DateType>;
};
