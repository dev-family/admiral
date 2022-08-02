import React from 'react';
import { GetFormDataResult } from '../dataProvider';
import { FieldValues, FormContextValue } from './FormContext';
import Item from './Item';
import Error from './Error';
import { Locale } from './interfaces';
export declare type FormProps = {
    locale?: Locale;
    className?: string;
    redirect?: string;
    fetchInitialData?: () => Promise<GetFormDataResult>;
    submitData?: (values: any) => Promise<any>;
    children: React.ReactNode;
};
export declare type FormRef = {
    values: Record<any, any>;
};
declare const InternalForm: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormRef>>;
export declare type ControlledChildFormProps = FormContextValue<FieldValues> & {
    as?: string | React.JSXElementConstructor<any>;
    className?: string;
};
declare const ChildForm: React.FC<ControlledChildFormProps>;
declare const Fields: React.FC<{
    singleColumn?: boolean;
}>;
declare const Footer: React.FC<{
    className?: string;
}>;
declare const Submit: React.FC<{
    className?: string;
}>;
declare type FormType = typeof InternalForm;
interface FormInterface extends FormType {
    Error: typeof Error;
    Fields: typeof Fields;
    Item: typeof Item;
    Footer: typeof Footer;
    Submit: typeof Submit;
    ChildForm: typeof ChildForm;
}
export declare const Form: FormInterface;
export {};
