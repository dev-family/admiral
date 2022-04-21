import React from 'react';
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces';
import { FormItemProps } from '../Item';
export interface ColorPickerInputProps extends ColorPickerProps, FormItemProps {
    name: string;
    outputValue?: keyof ColorPickerResult;
}
export declare const ColorPickerInput: React.FC<ColorPickerInputProps>;
