import React from 'react';
import { ButtonProps } from '../../ui/Button/interfaces';
export declare type EditActionProps = {
    pathname: string;
    buttonProps?: ButtonProps;
    behavior?: 'default' | 'backgroundRoute';
    mainRoutePath?: string;
};
export declare const EditAction: React.FC<EditActionProps>;
