import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface TextInputProps extends Omit<InputProps, 'onChange'>, FormItemProps {
    name: string;
    onChange?: (value: string) => void;
}
export declare const TextInput: InputComponentWithName<(props: TextInputProps) => React.JSX.Element>;
