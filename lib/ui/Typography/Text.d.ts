import React from 'react';
import type { BlockProps } from './interfaces';
export interface TextProps extends BlockProps {
}
declare function Text({ ref, ...props }: TextProps & {
    ref?: React.Ref<HTMLSpanElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Text;
