import React, { useState, useEffect, FormEvent } from 'react'
import { GetOneResult } from '../dataProvider'
import { useHistory } from 'react-router-dom'
import { FormProvider, useForm } from './FormContext'
import { Button } from '../ui'
import styles from './Form.module.scss'
import Item from './Item'
import Error from './Error'
import cn from 'classnames'
import { isObject } from '../utils/helpers'
import { useSafeSetState } from '../utils/hooks'

export type FormProps = {
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
    const [errors, setErrors] = useSafeSetState({})
    const [isSubmitting, setIsSubmitting] = useSafeSetState(false)
    const [isFetching, setIsFetching] = useSafeSetState(true)
    const history = useHistory()

    async function _fetchInitialData() {
        try {
            const response = await fetchInitialData!()
            if (isObject(response.data)) setValues((prev) => ({ ...prev, ...response.data }))
            if (isObject(response.values)) setOptions((prev) => ({ ...prev, ...response.values }))
        } catch (error) {
            setErrors({ cathed: ['Fetch initial data error'] })
        } finally {
            setIsFetching(false)
        }
    }

    useEffect(() => {
        if (typeof fetchInitialData === 'function') {
            _fetchInitialData()
        } else {
            setIsFetching(false)
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
        <FormProvider
            value={{ values, setValues, options, errors, setErrors, isSubmitting, isFetching }}
        >
            <form onSubmit={handleSubmit}>{children}</form>
        </FormProvider>
    )
}

const Fields: React.FC<{ singleColumn?: boolean }> = ({ children, singleColumn = false }) => {
    return (
        <div className={cn(styles.items, { [styles.items__Column]: singleColumn })}>{children}</div>
    )
}

const Footer: React.FC = ({ children }) => {
    return <div className={styles.footer}>{children}</div>
}

const Submit: React.FC<{ className?: string }> = ({ className, children }) => {
    const { isSubmitting, isFetching } = useForm()

    return (
        <Button
            className={className}
            type="submit"
            disabled={isFetching || isSubmitting}
            loading={isSubmitting}
        >
            {children}
        </Button>
    )
}

type FormType = typeof InternalForm
interface FormInterface extends FormType {
    Error: typeof Error
    Fields: typeof Fields
    Item: typeof Item
    Footer: typeof Footer
    Submit: typeof Submit
}

export const Form = InternalForm as FormInterface
Form.Error = Error
Form.Fields = Fields
Form.Item = Item
Form.Footer = Footer
Form.Submit = Submit
