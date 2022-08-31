import React from 'react';
import { ButtonProps } from '../../ui/Button/interfaces';
export declare type DeleteActionProps = {
    resource: string;
    id: string | number;
    buttonProps?: ButtonProps;
};
export declare const DeleteAction: React.FC<DeleteActionProps>;
