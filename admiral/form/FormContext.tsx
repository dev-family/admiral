import React, { useContext, createContext } from 'react'

type FormContextValue = {
    values: Record<string, any>
    errors: Record<string, string[]>
    setValues: (values: any) => void
    isSubmitting: boolean
}

const FormContext = createContext<FormContextValue>({
    values: {},
    errors: {},
    setValues: () => {},
    isSubmitting: false,
})

export const FormProvider: React.FC<{ value: FormContextValue }> = ({ value, children }) => {
    return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useForm() {
    return useContext(FormContext)
}
