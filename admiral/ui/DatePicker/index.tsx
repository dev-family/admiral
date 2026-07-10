import React from 'react'
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns'
import type { GenerateConfig } from 'rc-picker/es/generate/index'
import { PickerProps, PickerDateProps, PickerTimeProps } from './generatePicker/interfaces'
import generatePicker from './generatePicker/generatePicker'
import generateRangePicker from './generatePicker/generateRangePicker'

// rc-picker internally generates format strings with `A` for AM/PM (moment/dayjs convention).
// date-fns uses lowercase `a` for AM/PM; uppercase `A` means "milliseconds in day" and throws.
// Patch the locale format/parse to rewrite `A` → `a` before date-fns sees it.
function fixMeridiem(fmt: string): string {
    return fmt.replace(/(?<![a-zA-Z])A(?![a-zA-Z])/g, 'a')
}

const patchedConfig: GenerateConfig<Date> = {
    ...dateFnsGenerateConfig,
    locale: {
        ...dateFnsGenerateConfig.locale,
        format(locale, date, format) {
            return dateFnsGenerateConfig.locale.format(locale, date, fixMeridiem(format))
        },
        parse(locale, text, formats) {
            return dateFnsGenerateConfig.locale.parse(locale, text, formats.map(fixMeridiem))
        },
    },
}

export type DatePickerProps = PickerProps<Date>
export type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type TimePickerProps = Omit<PickerTimeProps<Date>, 'picker'>

export const DatePicker = generatePicker<Date>(patchedConfig)
export const RangePicker = generateRangePicker<Date>(patchedConfig)

const DatePickerAny = DatePicker as React.ComponentType<any>
export const TimePicker = (props: TimePickerProps) => <DatePickerAny {...props} picker="time" />
export const MonthPicker = (props: TimePickerProps) => <DatePickerAny {...props} picker="month" />
export const WeekPicker = (props: TimePickerProps) => <DatePickerAny {...props} picker="week" />
export const QuarterPicker = (props: TimePickerProps) => (
    <DatePickerAny {...props} picker="quarter" />
)
export const YearPicker = (props: TimePickerProps) => <DatePickerAny {...props} picker="year" />
