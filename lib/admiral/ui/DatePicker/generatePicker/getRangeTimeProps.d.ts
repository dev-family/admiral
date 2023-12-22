import { PickerMode } from 'rc-picker/lib/interface';
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
export declare function getRangeTimeProps<DateType>(props: {
    format?: string;
    picker?: PickerMode;
} & Omit<SharedTimeProps<DateType>, 'defaultValue' | 'disabledTime'>): SharedTimeProps<DateType> | {
    showTime: SharedTimeProps<DateType>;
};
