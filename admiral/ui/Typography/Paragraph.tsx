import React from 'react'
import Base from './Base'
import { BlockProps } from './interfaces'

export interface ParagraphProps extends BlockProps {}

function Paragraph({ ref, ...props }: ParagraphProps & { ref?: React.Ref<HTMLDivElement> }) {
    return <Base ref={ref} {...props} component="div" />
}

export default Paragraph
