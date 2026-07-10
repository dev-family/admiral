import React from 'react';
import { FormItemProps } from '../Item.js';
import { TabsType } from '../../ui/Tabs/interfaces.js';
import { TextInputProps } from './TextInput.js';
import { EditorInputProps } from './EditorInput.js';
import { MultilineTextInputProps } from './MultilineTextInput.js';
import { FieldRuleProps } from '../fieldRules.js';
type FieldMap = {
    editor: EditorInputProps;
    text: TextInputProps;
    multilineText: MultilineTextInputProps;
};
type FieldProps<K extends keyof FieldMap> = {
    field: K;
    props?: Omit<FieldMap[K], 'label' | 'error' | 'showError' | 'required' | 'columnSpan' | 'onLabelClick' | 'labelAs' | 'name' | keyof FieldRuleProps>;
};
type LanguageType = {
    label: string;
    value: string;
};
type TranslatableInputType = {
    name: string;
    placeholder?: string | undefined;
    languages: LanguageType[];
    tabType?: TabsType;
};
/**
 * Public generic signature of TranslatableInput — preserved across the HOC wrap
 * (which is itself non-generic at runtime). The runtime wrap is identical to
 * every other field; only the type is cast back so `field` / `props` stay
 * type-checked at call sites, and the `inputName` static survives the cast.
 */
type TranslatableInputComponent = (<K extends keyof FieldMap>(props: FieldProps<K> & TranslatableInputType & FormItemProps & Omit<FieldRuleProps, 'disabledWhen'>) => React.JSX.Element | null) & {
    inputName: 'TranslatableInput';
};
export declare const TranslatableInput: TranslatableInputComponent;
export {};
