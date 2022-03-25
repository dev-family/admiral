import React, { useState, useEffect, FormEvent } from 'react'
import { GetOneResult } from '../dataProvider'
import { useHistory } from 'react-router-dom'
import { FormProvider, useForm } from './FormContext'
import { Button } from '../ui'
import styles from './Form.module.scss'
import Item from './Item'
import { isObject } from '../utils/helpers'

type FormProps = {
    redirect?: string
    fetchInitialData?: () => Promise<GetOneResult>
    submitData: (values: any) => Promise<any>
}

const InternalForm: React.FC<FormProps> = ({
    fetchInitialData,
    submitData,
    redirect,
    children,
}) => {
    const [values, setValues] = useState<Record<any, any>>({})
    const [options, setOptions] = useState<Record<any, any>>({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const history = useHistory()

    async function _fetchInitialData() {
        const response = await fetchInitialData!()
        if (isObject(response.data)) setValues((prev) => ({ ...prev, ...response.data }))
        if (isObject(response.values)) setOptions((prev) => ({ ...prev, ...response.values }))
    }

    useEffect(() => {
        if (typeof fetchInitialData === 'function') {
            _fetchInitialData()
        }
    }, [fetchInitialData])

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        setIsSubmitting(true)
        try {
            await submitData(values)

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
        <FormProvider value={{ values, setValues, options, errors, isSubmitting }}>
            <form onSubmit={handleSubmit}>{children}</form>
        </FormProvider>
    )
}

const Fields: React.FC = ({ children }) => {
    return <div className={styles.items}>{children}</div>
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
    Fields: typeof Fields
    Item: typeof Item
    Footer: typeof Footer
    Submit: typeof Submit
}

export const Form = InternalForm as FormInterface
Form.Fields = Fields
Form.Item = Item
Form.Footer = Footer
Form.Submit = Submit
