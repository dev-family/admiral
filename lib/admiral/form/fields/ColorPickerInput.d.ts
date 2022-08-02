import React from 'react';
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface ColorPickerInputProps extends ColorPickerProps, FormItemProps {
    name: string;
    outputValue?: keyof ColorPickerResult;
}
export declare const ColorPickerInput: InputComponentWithName<React.FC<ColorPickerInputProps>>;
