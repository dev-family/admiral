import { PickerMode } from 'rc-picker/lib/interface';
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel';
export declare function getTimeProps<DateType>(props: {
    format?: string;
    picker?: PickerMode;
} & SharedTimeProps<DateType>): SharedTimeProps<DateType> | {
    showTime: SharedTimeProps<DateType>;
};
