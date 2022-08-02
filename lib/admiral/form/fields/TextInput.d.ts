import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface TextInputProps extends InputProps, FormItemProps {
    name: string;
}
export declare const TextInput: InputComponentWithName<React.FC<TextInputProps>>;
