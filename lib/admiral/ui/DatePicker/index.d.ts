/// <reference types="react" />
import { PickerProps, PickerDateProps, PickerTimeProps } from './generatePicker/interfaces';
export declare type DatePickerProps = PickerProps<Date>;
export declare type MonthPickerProps = Omit<PickerDateProps<Date>, 'picker'>;
export declare type WeekPickerProps = Omit<PickerDateProps<Date>, 'picker'>;
export declare type TimePickerProps = Omit<PickerTimeProps<Date>, 'picker'>;
export declare const DatePicker: import("./generatePicker/interfaces").PickerComponentClass<PickerProps<Date>, unknown>;
export declare const TimePicker: (props: TimePickerProps) => JSX.Element;
export declare const MonthPicker: (props: TimePickerProps) => JSX.Element;
export declare const WeekPicker: (props: TimePickerProps) => JSX.Element;
export declare const QuarterPicker: (props: TimePickerProps) => JSX.Element;
export declare const YearPicker: (props: TimePickerProps) => JSX.Element;
