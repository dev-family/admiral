import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces';
import { FormItemProps } from '../Item';
export interface TextInputProps extends InputProps, FormItemProps {
    name: string;
}
export declare const TextInput: React.FC<TextInputProps>;
