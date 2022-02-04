import React from 'react'

type InputSize = 'XS' | 'S' | 'M' | 'L'

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: InputSize
    type?: 'text' | 'tel' | 'password'
    borderless?: boolean
    alert?: boolean
}
