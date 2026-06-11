import React from 'react';
import { FormItemProps } from '../Item.js';
import type { RadioGroupProps } from '../../ui/Radio/interfaces.js';
import { InputComponentWithName } from '../interfaces.js';
export interface RadioInputProps extends RadioGroupProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const RadioInput: InputComponentWithName<(props: RadioInputProps) => React.JSX.Element>;
