import React from 'react'
import { IconName } from '@/assets/icons/interfaces'

type ButtonPropSize = 'XS' | 'S' | 'M' | 'L'
type ButtonPropView = 'primary' | 'clear' | 'ghost' | 'secondary'

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<any>, 'type'>,
        Omit<React.AnchorHTMLAttributes<any>, 'type'> {
    component?: string | React.JSXElementConstructor<any>
    className?: string
    size?: ButtonPropSize
    view?: ButtonPropView
    loading?: boolean
    disabled?: boolean
    iconLeft?: IconName
    iconRight?: IconName
    type?: string
    onClick?: React.EventHandler<React.MouseEvent>
    children?: React.ReactNode
}
