/// <reference types="react" />
import { SelectProps as RcSelectProps, BaseSelectRef } from 'rc-select';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select';
import { OptionProps } from 'rc-select/lib/Option';
declare type RawValue = string | number;
export type { OptionProps, BaseSelectRef as RefSelectProps, BaseOptionType, DefaultOptionType };
export declare type SelectSizeType = 'L' | 'M' | 'S' | 'XS';
export interface LabeledValue {
    key?: string;
    value: RawValue;
    label: React.ReactNode;
}
export declare type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined;
export interface SelectProps<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType> extends Omit<RcSelectProps<ValueType, OptionType>, 'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill' | 'inputIcon' | 'clearIcon' | 'removeIcon' | 'menuItemSelectedIcon' | 'getPopupContainer' | 'prefixCls'> {
    size?: SelectSizeType;
    mode?: 'multiple' | 'tags';
    borderless?: boolean;
    alert?: boolean;
}
