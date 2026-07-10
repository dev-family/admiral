import React from 'react';
import { BlockProps } from './interfaces.js';
export interface ParagraphProps extends BlockProps {
}
declare function Paragraph({ ref, ...props }: ParagraphProps & {
    ref?: React.Ref<HTMLDivElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Paragraph;
