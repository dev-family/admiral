import React, { useContext, createContext } from 'react'
import { OptionType } from '../dataProvider'

export type FormErrorsType = Record<string, string[]>

export type FormContextValue = {
    values: Record<string, any>
    options: Record<string, OptionType[]>
    errors: Record<string, string[]>
    setErrors: React.Dispatch<React.SetStateAction<FormErrorsType>>
    setValues: React.Dispatch<React.SetStateAction<any>>
    isSubmitting: boolean
    isFetching: boolean
}

const FormContext = createContext<FormContextValue>({
    values: {},
    options: {},
    errors: {},
    setErrors: () => {},
    setValues: () => {},
    isSubmitting: false,
    isFetching: true,
})

export const FormProvider: React.FC<{ value: FormContextValue }> = ({ value, children }) => {
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useForm() {
    return useContext(FormContext)
}
