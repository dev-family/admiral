import axios, { AxiosResponse } from 'axios'
import React, { useState, useCallback, createContext, FormEvent } from 'react'
import { useContext } from 'react'
import { Button } from '@/admiral/ui'
import cln from 'classnames'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

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

type FormProps = {
    action: string
    redirect?: string
    hasInitialData?: boolean
}

export const Form: React.FC<FormProps> = ({
    children,
    action,
    redirect,
    hasInitialData = false,
}) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const history = useHistory()

    async function fetchInitialData(url: string) {
        const response = await axios.get(url)
        setValues(response.data)
    }

    useEffect(() => {
        if (hasInitialData) {
            fetchInitialData(action)
        }
    }, [action, hasInitialData])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            const response = await axios.post(action, values)

            if (redirect) {
                history.push(redirect)
            }

            setErrors({})
        } catch (e) {
            if (e.response.status == 422) {
                setErrors(e.response.data.errors)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <FormContext.Provider value={{ values, setValues, errors, isSubmitting }}>
            <form onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider>
    )
}

type InputProps = {
    name: string
    label: string
    required?: boolean
    placeholder?: string
    type?: 'text' | 'password'
}

export const Input: React.FC<InputProps> = ({
    name,
    required = false,
    label,
    placeholder = label,
    type = 'text',
}) => {
    const form = useContext(FormContext)
    const onChange = useCallback((e) => {
        form.setValues((values: any) => ({ ...values, [name]: e.target.value }))
    }, [])
    const error = form.errors[name]?.[0]

    return (
        <div className="mb-3">
            <label className={cln('form-label', { required })}>{label}</label>
            <input
                type={type}
                className={cln('form-control', { 'is-invalid': !!error })}
                placeholder={placeholder}
                value={form.values[name]}
                onChange={onChange}
            />
            {!!error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export const Submit: React.FC = ({ children }) => {
    const form = useContext(FormContext)

    return <Button isLoading={form.isSubmitting}>{children}</Button>
}
