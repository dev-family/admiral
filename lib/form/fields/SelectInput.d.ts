import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
import { FieldRuleProps } from '../fieldRules.js';
declare const OptGroup: import("rc-select/lib/OptGroup").OptionGroupFC, Option: import("rc-select/lib/Option").OptionFC;
export interface SelectInputProps extends SelectProps, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const SelectInput: InputComponentWithName<(props: SelectInputProps) => React.JSX.Element | null> & {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
};
export {};
