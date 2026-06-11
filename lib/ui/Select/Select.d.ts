import React from 'react';
import { Option, OptGroup, BaseSelectRef } from 'rc-select';
import type { BaseOptionType, DefaultOptionType } from 'rc-select/es/Select';
import { SelectProps } from './interfaces.js';
export declare const Select: (<ValueType = any, OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> & {
    ref?: React.Ref<BaseSelectRef>;
}) => React.ReactElement) & {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
};
