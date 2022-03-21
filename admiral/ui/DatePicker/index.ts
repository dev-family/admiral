import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'
import generatePicker from './generatePicker'
import { PickerProps, PickerDateProps } from './generatePicker/interfaces'

export type DatePickerProps = PickerProps<Date>
export type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)
