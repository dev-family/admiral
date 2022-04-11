import React from 'react'
declare const cardSpaces: ['m', 'xs', 's', 'l', 'xl', '2xl', '3xl', '4xl', '5xl']
export declare type CardSpaceType = typeof cardSpaces[number]
declare const cardForms: ['round', 'square']
export declare type CardFormType = typeof cardForms[number]
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    verticalSpace?: CardSpaceType
    horizontalSpace?: CardSpaceType
    form?: CardFormType
    shadow?: boolean
    component?: string | React.JSXElementConstructor<any>
    children?: React.ReactNode
}
export {}
