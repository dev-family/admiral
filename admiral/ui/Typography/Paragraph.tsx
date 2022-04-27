import React, { forwardRef } from 'react'
import Base from './Base'
import { BlockProps } from './interfaces'

export interface ParagraphProps extends BlockProps {}

const Paragraph: React.ForwardRefRenderFunction<HTMLDivElement, ParagraphProps> = (props, ref) => (
    <Base ref={ref} {...props} component="div" />
)

export default forwardRef(Paragraph)
