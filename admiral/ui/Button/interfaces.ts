import React from 'react'

export type ButtonSizeType = 'XS' | 'S' | 'M' | 'L'
export type ButtonViewType = 'primary' | 'clear' | 'ghost' | 'secondary'

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<any>, 'type'>,
        Omit<React.AnchorHTMLAttributes<any>, 'type'> {
    component?: string | React.JSXElementConstructor<any>
    className?: string
    size?: ButtonSizeType
    view?: ButtonViewType
    loading?: boolean
    disabled?: boolean
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    type?: string
    onClick?: React.EventHandler<React.MouseEvent>
    children?: React.ReactNode
}
