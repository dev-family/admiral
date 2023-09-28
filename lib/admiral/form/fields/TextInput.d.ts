import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface TextInputProps extends InputProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const TextInput: InputComponentWithName<React.FC<TextInputProps>>;
