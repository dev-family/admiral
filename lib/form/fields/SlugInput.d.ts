import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface SlugInputProps extends InputProps, FormItemProps {
    name: string;
    from: string;
    slugLang?: string;
    options?: SlygifyOptions;
    onChange?: (value: any) => void;
}
export type SlygifyOptions = {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
};
export declare const SlugInput: InputComponentWithName<(props: SlugInputProps) => React.JSX.Element>;
