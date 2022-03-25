import React from 'react'
import { OptionType } from '../dataProvider'
declare type FormContextValue = {
    values: Record<string, any>
    options: Record<string, OptionType[]>
    errors: Record<string, string[]>
    setValues: (values: any) => void
    isSubmitting: boolean
}
export declare const FormProvider: React.FC<{
    value: FormContextValue
}>
export declare function useForm(): FormContextValue
export {}
