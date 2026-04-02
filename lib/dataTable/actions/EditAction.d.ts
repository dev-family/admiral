import { ButtonProps } from '../../ui/Button/interfaces';
export type EditActionProps = {
    pathname: string;
    buttonProps?: ButtonProps;
    behavior?: 'default' | 'backgroundRoute';
    mainRoutePath?: string;
};
export declare function EditAction({ buttonProps, pathname, behavior, mainRoutePath, }: EditActionProps): import("react/jsx-runtime").JSX.Element;
