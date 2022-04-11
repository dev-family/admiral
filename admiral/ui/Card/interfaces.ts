import React from 'react'
import { tuple } from '../../utils/type'

const cardSpaces = tuple('m', 'xs', 's', 'l', 'xl', '2xl', '3xl', '4xl', '5xl')
export type CardSpaceType = typeof cardSpaces[number]

const cardForms = tuple('round', 'square')
export type CardFormType = typeof cardForms[number]

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    verticalSpace?: CardSpaceType
    horizontalSpace?: CardSpaceType
    form?: CardFormType
    shadow?: boolean
    component?: string | React.JSXElementConstructor<any>
    children?: React.ReactNode
}
