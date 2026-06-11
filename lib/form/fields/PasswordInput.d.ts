import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface PasswordInputProps extends Omit<InputProps, 'onChange'>, FormItemProps {
    name: string;
    onChange?: (value: string) => void;
}
export declare const PasswordInput: InputComponentWithName<(props: PasswordInputProps) => React.JSX.Element>;
