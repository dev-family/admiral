import React from 'react'
import type { InputProps } from '../../ui/Input/interfaces'
import { FormItemProps } from '../Item'
export interface PasswordInputProps extends InputProps, FormItemProps {
    name: string
}
export declare const PasswordInput: React.FC<PasswordInputProps>
