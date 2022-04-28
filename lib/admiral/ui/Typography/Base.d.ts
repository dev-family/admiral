import React from 'react';
import { BlockProps } from './interfaces';
interface InternalBlockProps extends BlockProps {
    component: string;
}
declare const Base: React.ForwardRefExoticComponent<InternalBlockProps & React.RefAttributes<unknown>>;
export default Base;
