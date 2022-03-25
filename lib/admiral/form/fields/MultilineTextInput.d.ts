import React from 'react'
import type { TextareaProps } from '../../ui/Textarea/interfaces'
import { FormItemProps } from '../Item'
export interface MultilineTextInputProps extends TextareaProps, FormItemProps {
    name: string
}
export declare const MultilineTextInput: React.FC<MultilineTextInputProps>
