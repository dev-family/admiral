import React from 'react';
import { GetOneResult } from '../dataProvider';
import Item from './Item';
declare type FormProps = {
    redirect?: string;
    fetchInitialData?: () => Promise<GetOneResult>;
    submitData: (values: any) => Promise<any>;
};
declare const InternalForm: React.FC<FormProps>;
declare const Fields: React.FC<{
    singleColumn?: boolean;
}>;
declare const Footer: React.FC;
declare const Submit: React.FC;
declare type FormType = typeof InternalForm;
interface FormInterface extends FormType {
    Fields: typeof Fields;
    Item: typeof Item;
    Footer: typeof Footer;
    Submit: typeof Submit;
}
export declare const Form: FormInterface;
export {};
