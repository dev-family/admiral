import { FormItemProps } from '../Item.js';
import { TabsType } from '../../ui/Tabs/interfaces.js';
import { TextInputProps } from './TextInput.js';
import { EditorInputProps } from './EditorInput.js';
import { MultilineTextInputProps } from './MultilineTextInput.js';
type FieldMap = {
    editor: EditorInputProps;
    text: TextInputProps;
    multilineText: MultilineTextInputProps;
};
type FieldProps<K extends keyof FieldMap> = {
    field: K;
    props?: Omit<FieldMap[K], 'label' | 'error' | 'showError' | 'required' | 'columnSpan' | 'onLabelClick' | 'labelAs' | 'name'>;
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
export declare const TranslatableInput: {
    <K extends keyof FieldMap>(props: FieldProps<K> & TranslatableInputType & FormItemProps): import("react/jsx-runtime").JSX.Element;
    inputName: string;
};
export {};
