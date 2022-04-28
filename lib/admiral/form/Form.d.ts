import React from 'react';
import { GetOneResult } from '../dataProvider';
import Item from './Item';
import Error from './Error';
export declare type FormProps = {
    redirect?: string;
    fetchInitialData?: () => Promise<GetOneResult>;
    submitData: (values: any) => Promise<any>;
};
declare const InternalForm: React.FC<FormProps>;
declare const Fields: React.FC<{
    singleColumn?: boolean;
}>;
declare const Footer: React.FC;
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
}
export declare const Form: FormInterface;
export {};
