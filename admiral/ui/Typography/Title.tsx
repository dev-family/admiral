import React from 'react'
import Base from './Base'
import { BlockProps } from './interfaces'
import { tupleNum } from '../../utils/type'

const TITLE_LEVELS = tupleNum(1, 2, 3, 4, 5)
type TitleLevelType = (typeof TITLE_LEVELS)[number]

export type TitleProps = Omit<
    BlockProps & {
        level?: TitleLevelType
    },
    'strong'
>

function Title({ ref, ...props }: TitleProps & { ref?: React.Ref<HTMLHeadingElement> }) {
    const { level = 1, ...restProps } = props
    let component: React.ElementType

    if (TITLE_LEVELS.indexOf(level) !== -1) {
        component = `h${level}`
    } else {
        component = 'h1'
    }

    return <Base ref={ref} {...restProps} component={component} />
}

export default Title
