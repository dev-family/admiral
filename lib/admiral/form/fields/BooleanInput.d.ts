import React from 'react';
import type { SwitchProps } from '../../ui/Switch/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface BooleanInputProps extends SwitchProps, FormItemProps {
    name: string;
    onChange?: (value: boolean) => void;
}
export declare const BooleanInput: InputComponentWithName<React.FC<BooleanInputProps>>;
