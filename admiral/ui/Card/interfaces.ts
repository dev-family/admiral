import React from 'react'

export type CardSpaceType = 'm' | 'xs' | 's' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type CardFormType = 'round' | 'square'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    verticalSpace?: CardSpaceType
    horizontalSpace?: CardSpaceType
    form?: CardFormType
    shadow?: boolean
    component?: string | React.JSXElementConstructor<any>
    children?: React.ReactNode
}
