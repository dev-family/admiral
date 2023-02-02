import React from 'react';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
import { TabsType } from '../../ui/Tabs/interfaces';
declare type LanguageType = {
    label: string;
    value: string;
};
export interface TranslatableInputProps extends FormItemProps {
    name: string;
    placeholder?: string | undefined;
    languages: LanguageType[];
    tabType?: TabsType;
    field?: 'text' | 'multilineText' | 'editor';
}
export declare const TranslatableInput: InputComponentWithName<React.FC<TranslatableInputProps>>;
export {};
