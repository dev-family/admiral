import React from 'react';
import type { EditorProps } from '../../ui/Editor/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface EditorInputProps extends EditorProps, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const EditorInput: (props: EditorInputProps) => React.JSX.Element | null;
