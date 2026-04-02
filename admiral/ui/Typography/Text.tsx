import React from 'react'
import Base from './Base'
import type { BlockProps } from './interfaces'

export interface TextProps extends BlockProps {}

function Text({ ref, ...props }: TextProps & { ref?: React.Ref<HTMLSpanElement> }) {
    return <Base ref={ref} {...props} component="span" />
}

export default Text
