import React from 'react';
import { OptionType } from '../dataProvider';
export declare type FormErrorsType = Record<string, string[]>;
export declare type FormContextValue = {
    values: Record<string, any>;
    options: Record<string, OptionType[]>;
    errors: Record<string, string[]>;
    setErrors: React.Dispatch<React.SetStateAction<FormErrorsType>>;
    setValues: React.Dispatch<React.SetStateAction<any>>;
    isSubmitting: boolean;
    isFetching: boolean;
};
export declare const FormProvider: React.FC<{
    value: FormContextValue;
}>;
export declare function useForm(): FormContextValue;
