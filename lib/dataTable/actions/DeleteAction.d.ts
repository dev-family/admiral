import { ButtonProps } from '../../ui/Button/interfaces.js';
import { PopconfirmLocale } from '../../ui/Popconfirm/interfaces.js';
export interface DeleteActionLocale extends PopconfirmLocale {
    title: string;
}
export type DeleteActionProps = {
    resource: string;
    id: string | number;
    buttonProps?: ButtonProps;
    locale?: DeleteActionLocale;
};
export declare function DeleteAction({ resource, id, buttonProps, locale }: DeleteActionProps): import("react/jsx-runtime").JSX.Element;
