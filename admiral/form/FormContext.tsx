import React, { useContext, createContext } from 'react'
import { OptionType } from '../dataProvider'

export type FormErrorsType = Record<string, string[]>
export type FieldValues = Record<string, any>

export type FormContextValue<TFieldValues extends FieldValues> = {
    values: TFieldValues
    options: Record<string, OptionType[]>
    errors: Record<string, string[]>
    setErrors: React.Dispatch<React.SetStateAction<FormErrorsType>>
    setValues: React.Dispatch<React.SetStateAction<any>>
    isSubmitting: boolean
    isFetching: boolean
}

const FormContext = createContext<FormContextValue<FieldValues>>({
    values: {},
    options: {},
    errors: {},
    setErrors: () => {},
    setValues: () => {},
    isSubmitting: false,
    isFetching: true,
})

export type FormProviderProps<TFieldValues extends FieldValues> = {
    value: FormContextValue<TFieldValues>
}

export function FormProvider<TFieldValues extends FieldValues>({
    children,
    value,
}: React.PropsWithChildren<FormProviderProps<TFieldValues>>) {
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useForm<TFieldValues extends FieldValues>() {
    const context = useContext<FormContextValue<TFieldValues>>(
        FormContext as unknown as React.Context<FormContextValue<TFieldValues>>,
    )
    if (!context) {
        throw new Error('useForm must be used under FormProvider')
    }
    return context
}
