import React, { FormEvent } from 'react';
import { GetFormDataResult } from '../dataProvider';
import { FieldValues, FormContextValue } from './FormContext';
import Item from './Item';
import Error from './Error';
import { Locale } from './interfaces';
export type FormProps = {
    locale?: Locale;
    className?: string;
    redirect?: string | boolean;
    fetchInitialData?: () => Promise<GetFormDataResult>;
    submitData?: (values: any) => Promise<any>;
    children: React.ReactNode;
};
export type FormRef = {
    values: Record<string, any>;
    handleSubmit: (e?: FormEvent) => Promise<void>;
};
declare function InternalForm({ locale, className, fetchInitialData, submitData, redirect, children, ref, }: FormProps & {
    ref?: React.Ref<FormRef>;
}): import("react/jsx-runtime").JSX.Element;
export type ControlledChildFormProps = FormContextValue<FieldValues> & {
    as?: string | React.JSXElementConstructor<any>;
    className?: string;
};
declare function ChildForm({ as: Component, className, values, setValues, options, setOptions, errors, setErrors, isFetching, isSubmitting, locale, children, }: ControlledChildFormProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function Fields({ children, singleColumn, }: {
    singleColumn?: boolean;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function Footer({ className, children }: {
    className?: string;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function Submit({ className, children }: {
    className?: string;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
type FormType = typeof InternalForm;
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
