import { GenerateConfig } from 'rc-picker/lib/generate/index'
import '../DatePicker.scss'
declare function generatePicker<DateType>(
    generateConfig: GenerateConfig<DateType>,
): import('./interfaces').PickerComponentClass<
    import('./interfaces').PickerProps<DateType>,
    unknown
> & {
    WeekPicker: import('./interfaces').PickerComponentClass<
        Omit<import('./interfaces').PickerDateProps<DateType>, 'picker'>,
        unknown
    >
    MonthPicker: import('./interfaces').PickerComponentClass<
        Omit<import('./interfaces').PickerDateProps<DateType>, 'picker'>,
        unknown
    >
    YearPicker: import('./interfaces').PickerComponentClass<
        Omit<import('./interfaces').PickerDateProps<DateType>, 'picker'>,
        unknown
    >
    TimePicker: import('./interfaces').PickerComponentClass<
        import('./interfaces').PickerTimeProps<DateType>,
        unknown
    >
    QuarterPicker: import('./interfaces').PickerComponentClass<
        import('./interfaces').PickerTimeProps<DateType>,
        unknown
    >
}
export default generatePicker
