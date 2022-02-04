import React, { useState, useEffect, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { FormProvider, useForm } from './FormContext'
import { Button } from '@/admiral/ui'
import styles from './Form.module.scss'
import Item from './Item'

type FormProps = {
    action: string
    redirect?: string
    hasInitialData?: boolean
}

const InternalForm: React.FC<FormProps> = ({
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
            const response: AxiosResponse<any> = await axios.post(action, values)

            if (redirect) {
                history.push(redirect)
                return
            }

            setErrors({})
        } catch (e: any) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
        setIsSubmitting(false)
    }

    return (
        <FormProvider value={{ values, setValues, errors, isSubmitting }}>
            <form onSubmit={handleSubmit}>{children}</form>
        </FormProvider>
    )
}

const Footer: React.FC = ({ children }) => {
    return <div className={styles.footer}>{children}</div>
}

const Submit: React.FC = ({ children }) => {
    const { isSubmitting } = useForm()

    return (
        <Button type="submit" loading={isSubmitting}>
            {children}
        </Button>
    )
}

type FormType = typeof InternalForm
interface FormInterface extends FormType {
    Item: typeof Item
    Footer: typeof Footer
    Submit: typeof Submit
}

export const Form = InternalForm as FormInterface
Form.Item = Item
Form.Footer = Footer
Form.Submit = Submit
