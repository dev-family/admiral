import React from 'react'
import type { SwitchProps } from '../../ui/Switch/interfaces'
import { FormItemProps } from '../Item'
export interface BooleanInputProps extends SwitchProps, FormItemProps {
    name: string
}
export declare const BooleanInput: React.FC<BooleanInputProps>
