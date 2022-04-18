import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerProps, PickerDateProps, PickerTimeProps, PickerComponentClass } from './interfaces';
export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    DatePicker: PickerComponentClass<PickerProps<DateType>, unknown>;
    WeekPicker: PickerComponentClass<Omit<PickerDateProps<DateType>, "picker">, unknown>;
    MonthPicker: PickerComponentClass<Omit<PickerDateProps<DateType>, "picker">, unknown>;
    YearPicker: PickerComponentClass<Omit<PickerDateProps<DateType>, "picker">, unknown>;
    TimePicker: PickerComponentClass<PickerTimeProps<DateType>, unknown>;
    QuarterPicker: PickerComponentClass<PickerTimeProps<DateType>, unknown>;
};
