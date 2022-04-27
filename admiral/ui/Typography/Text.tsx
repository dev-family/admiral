import React, { forwardRef } from 'react'
import Base from './Base'
import type { BlockProps } from './interfaces'

export interface TextProps extends BlockProps {}

const Text: React.ForwardRefRenderFunction<HTMLSpanElement, TextProps> = (props, ref) => {
    return <Base ref={ref} {...props} component="span" />
}

export default forwardRef(Text)
