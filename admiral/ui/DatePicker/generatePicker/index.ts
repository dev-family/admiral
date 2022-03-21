import { GenerateConfig } from 'rc-picker/lib/generate/index'
import generateSinglePicker from './generateSinglePicker'
import '../DatePicker.scss'

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
    // =========================== Picker ===========================
    const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker } =
        generateSinglePicker(generateConfig)

    // =========================== Export ===========================
    type MergedDatePickerType = typeof DatePicker & {
        WeekPicker: typeof WeekPicker
        MonthPicker: typeof MonthPicker
        YearPicker: typeof YearPicker
        TimePicker: typeof TimePicker
        QuarterPicker: typeof QuarterPicker
    }

    const MergedDatePicker = DatePicker as MergedDatePickerType
    MergedDatePicker.WeekPicker = WeekPicker
    MergedDatePicker.MonthPicker = MonthPicker
    MergedDatePicker.YearPicker = YearPicker
    MergedDatePicker.TimePicker = TimePicker
    MergedDatePicker.QuarterPicker = QuarterPicker

    return MergedDatePicker
}

export default generatePicker
