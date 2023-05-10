import React from 'react'

export type InputSizeType = 'XS' | 'S' | 'M' | 'L'

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: InputSizeType
    type?: 'text' | 'tel' | 'password' | 'search'
    borderless?: boolean
    alert?: boolean
    suffix?: React.ReactNode
}
