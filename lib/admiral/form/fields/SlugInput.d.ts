import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface SlugInputProps extends InputProps, FormItemProps {
    name: string;
    from: string;
    options?: SlygifyOptions;
}
export declare type SlygifyOptions = {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
};
export declare const SlugInput: InputComponentWithName<React.FC<SlugInputProps>>;
