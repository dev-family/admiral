import React from 'react';
import { FormItemProps } from '../Item';
import type { RadioGroupProps } from '../../ui/Radio/interfaces';
import { InputComponentWithName } from '../interfaces';
export interface RadioInputProps extends RadioGroupProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const RadioInput: InputComponentWithName<React.FC<RadioInputProps>>;
