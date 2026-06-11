import React from 'react';
import type { SwitchProps } from '../../ui/Switch/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface BooleanInputProps extends SwitchProps, FormItemProps {
    name: string;
    onChange?: (value: boolean) => void;
}
export declare const BooleanInput: InputComponentWithName<(props: BooleanInputProps) => React.JSX.Element>;
