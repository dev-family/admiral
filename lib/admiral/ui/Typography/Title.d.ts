import React from 'react';
import { BlockProps } from './interfaces';
declare const TITLE_LEVELS: [1, 2, 3, 4, 5];
declare type TitleLevelType = typeof TITLE_LEVELS[number];
export declare type TitleProps = Omit<BlockProps & {
    level?: TitleLevelType;
}, 'strong'>;
declare const _default: React.ForwardRefExoticComponent<TitleProps & React.RefAttributes<HTMLHeadingElement>>;
export default _default;
