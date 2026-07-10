import React from 'react';
import { ChoiceProps } from './interfaces.js';
declare function InternalChoice({ ref: outerRef, ...props }: ChoiceProps & {
    ref?: React.Ref<HTMLInputElement>;
}): import("react/jsx-runtime").JSX.Element;
declare const Choice: typeof InternalChoice;
declare const _default: typeof Choice;
export default _default;
