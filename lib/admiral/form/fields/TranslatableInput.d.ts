/// <reference types="react" />
import { FormItemProps } from '../Item';
import { TabsType } from '../../ui/Tabs/interfaces';
import { TextInputProps } from './TextInput';
import { EditorInputProps } from './EditorInput';
import { MultilineTextInputProps } from './MultilineTextInput';
declare type FieldMap = {
    editor: EditorInputProps;
    text: TextInputProps;
    multilineText: MultilineTextInputProps;
};
declare type FieldProps<K extends keyof FieldMap> = {
    field: K;
    props?: Omit<FieldMap[K], 'label' | 'error' | 'showError' | 'required' | 'columnSpan' | 'onLabelClick' | 'labelAs' | 'name'>;
};
declare type LanguageType = {
    label: string;
    value: string;
};
declare type TranslatableInputType = {
    name: string;
    placeholder?: string | undefined;
    languages: LanguageType[];
    tabType?: TabsType;
};
export declare const TranslatableInput: {
    <K extends keyof FieldMap>(props: FieldProps<K> & TranslatableInputType & FormItemProps): JSX.Element;
    inputName: string;
};
export {};
