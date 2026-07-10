import React from 'react';
import { BlockProps } from './interfaces.js';
declare const TITLE_LEVELS: [1, 2, 3, 4, 5];
type TitleLevelType = (typeof TITLE_LEVELS)[number];
export type TitleProps = Omit<BlockProps & {
    level?: TitleLevelType;
}, 'strong'>;
declare function Title({ ref, ...props }: TitleProps & {
    ref?: React.Ref<HTMLHeadingElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Title;
