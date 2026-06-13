import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface SlugInputProps extends InputProps, FormItemProps, Omit<FieldRuleProps, 'disabledWhen'> {
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
export declare const SlugInput: (props: SlugInputProps) => React.JSX.Element | null;
