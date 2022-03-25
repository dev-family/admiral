import { PickerProps, PickerDateProps } from './generatePicker/interfaces'
export declare type DatePickerProps = PickerProps<Date>
export declare type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export declare type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export declare const DatePicker: import('./generatePicker/interfaces').PickerComponentClass<
    PickerProps<Date>,
    unknown
> & {
    WeekPicker: import('./generatePicker/interfaces').PickerComponentClass<
        Omit<PickerDateProps<Date>, 'picker'>,
        unknown
    >
    MonthPicker: import('./generatePicker/interfaces').PickerComponentClass<
        Omit<PickerDateProps<Date>, 'picker'>,
        unknown
    >
    YearPicker: import('./generatePicker/interfaces').PickerComponentClass<
        Omit<PickerDateProps<Date>, 'picker'>,
        unknown
    >
    TimePicker: import('./generatePicker/interfaces').PickerComponentClass<
        import('./generatePicker/interfaces').PickerTimeProps<Date>,
        unknown
    >
    QuarterPicker: import('./generatePicker/interfaces').PickerComponentClass<
        import('./generatePicker/interfaces').PickerTimeProps<Date>,
        unknown
    >
}
