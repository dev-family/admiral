import React from 'react'
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'
import generatePicker from './generatePicker'
import { PickerProps, PickerDateProps, PickerTimeProps } from './generatePicker/interfaces'

export type DatePickerProps = PickerProps<Date>
export type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>
export type TimePickerProps = Omit<PickerTimeProps<Date>, 'picker'>

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

export const TimePicker = (props: TimePickerProps) => <DatePicker {...props} picker="time" />
export const MonthPicker = (props: TimePickerProps) => <DatePicker {...props} picker="month" />
export const WeekPicker = (props: TimePickerProps) => <DatePicker {...props} picker="week" />
export const QuarterPicker = (props: TimePickerProps) => <DatePicker {...props} picker="quarter" />
export const YearPicker = (props: TimePickerProps) => <DatePicker {...props} picker="year" />
