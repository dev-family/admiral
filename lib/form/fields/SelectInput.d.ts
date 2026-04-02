import React from 'react';
import type { SelectProps } from '../../ui/Select/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
declare const OptGroup: import("rc-select/lib/OptGroup").OptionGroupFC, Option: import("rc-select/lib/Option").OptionFC;
export interface SelectInputProps extends SelectProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
declare const InternalSelectInput: InputComponentWithName<(props: SelectInputProps) => React.JSX.Element>;
export declare const SelectInput: typeof InternalSelectInput & {
    Option: typeof Option;
    OptGroup: typeof OptGroup;
};
export {};
