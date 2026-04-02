import React from 'react';
import { OptionType } from '../dataProvider';
import { Locale } from './interfaces';
export type FormErrorsType = Record<string, string[]>;
export type FieldValues = Record<string, any>;
export type FormContextValue<TFieldValues extends FieldValues> = {
    values: TFieldValues;
    options: Record<string, OptionType[]>;
    errors: Record<string, string[]>;
    setErrors: React.Dispatch<React.SetStateAction<FormErrorsType>>;
    setValues: React.Dispatch<React.SetStateAction<any>>;
    setOptions: React.Dispatch<React.SetStateAction<any>>;
    isSubmitting: boolean;
    isFetching: boolean;
    locale: Locale;
};
export type FormProviderProps<TFieldValues extends FieldValues> = {
    value: FormContextValue<TFieldValues>;
};
export declare function FormProvider<TFieldValues extends FieldValues>({ children, value, }: React.PropsWithChildren<FormProviderProps<TFieldValues>>): import("react/jsx-runtime").JSX.Element;
export declare function useForm<TFieldValues extends FieldValues>(): FormContextValue<TFieldValues>;
