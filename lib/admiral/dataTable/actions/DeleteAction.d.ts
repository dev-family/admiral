import React from 'react';
import { ButtonProps } from '../../ui/Button/interfaces';
import { PopconfirmLocale } from '../../ui/Popconfirm/interfaces';
export interface DeleteActionLocale extends PopconfirmLocale {
    title: string;
}
export declare type DeleteActionProps = {
    resource: string;
    id: string | number;
    buttonProps?: ButtonProps;
    locale?: DeleteActionLocale;
};
export declare const DeleteAction: React.FC<DeleteActionProps>;
