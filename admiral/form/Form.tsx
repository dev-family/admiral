import React, { useState, useEffect, useMemo, FormEvent, useImperativeHandle } from 'react'
import { GetFormDataResult } from '../dataProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { FieldValues, FormContextValue, FormProvider, useForm } from './FormContext'
import { Button, Notification } from '../ui'
import styles from './Form.module.scss'
import Item from './Item'
import Error from './Error'
import cn from 'classnames'
import { isObject } from '../utils/helpers'
import { Locale } from './interfaces'
import { enUS } from './locale'
import { RouterLocationState } from '../router/interfaces'
import { getNavigationFrom, clearNavigationFrom } from '../utils/helpers/navigationState'

export type FormProps = {
    locale?: Locale
    className?: string
    redirect?: string | boolean
    fetchInitialData?: () => Promise<GetFormDataResult>
    submitData?: (values: any) => Promise<any>
    children: React.ReactNode
}

export type FormRef = {
    values: Record<string, any>
    handleSubmit: (e?: FormEvent) => Promise<void>
}

function InternalForm({
    locale = enUS,
    className,
    fetchInitialData,
    submitData,
    redirect,
    children,
    ref,
}: FormProps & { ref?: React.Ref<FormRef> }) {
    const [values, setValues] = useState<Record<string, any>>({})
    const [options, setOptions] = useState<Record<string, any>>({})
    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    async function _fetchInitialData() {
        try {
            const response = await fetchInitialData!()
            if (isObject(response.data)) setValues({ ...response.data })
            if (isObject(response.values)) setOptions({ ...response.values })
        } catch {
            setErrors((prev) => ({ ...prev, _global: ['Fetch initial data error'] }))
        } finally {
            setIsFetching(false)
        }
    }

    useImperativeHandle(
        ref,
        () => ({
            values,
            handleSubmit,
        }),
        [values, handleSubmit],
    )

    useEffect(() => {
        if (typeof fetchInitialData === 'function') {
            _fetchInitialData()
        } else {
            setIsFetching(false)
        }
    }, [fetchInitialData])

    async function handleSubmit(e?: FormEvent) {
        e?.preventDefault()

        setIsSubmitting(true)
        try {
            await submitData?.(values)

            Notification({
                message: locale.successMessage,
                type: 'success',
            })
            if (redirect === true) {
                const { state } = location as { state: RouterLocationState }
                const fromLocation = getNavigationFrom(state?.from)

                if (fromLocation) {
                    clearNavigationFrom()
                    // Redirect to the saved location with query params
                    navigate(
                        { pathname: fromLocation.pathname, search: fromLocation.search },
                        { state: { update: { dataTable: true } } },
                    )
                } else {
                    // Fallback to goBack if no saved location
                    navigate(-1)
                }
            } else if (redirect) {
                navigate(
                    { pathname: redirect },
                    // update table when drawer saved and closed
                    { state: { update: { dataTable: true } } },
                )
                return
            }

            setErrors({})
        } catch (e: any) {
            setErrors(e.response?.status === 422 ? e.response.data.errors : {})

            Notification({
                message: e.response?.data?.message ?? locale.serverErrorMessage,
                type: 'error',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const formContextValue = useMemo(
        () => ({
            locale,
            values,
            setValues,
            options,
            setOptions,
            errors,
            setErrors,
            isSubmitting,
            isFetching,
        }),
        [locale, values, options, errors, isSubmitting, isFetching],
    )

    const globalError = errors._global?.[0]

    return (
        <FormProvider value={formContextValue}>
            <form onSubmit={handleSubmit} className={cn(className)}>
                {globalError && <Error error={globalError} />}
                {children}
            </form>
        </FormProvider>
    )
}

export type ControlledChildFormProps = FormContextValue<FieldValues> & {
    as?: string | React.JSXElementConstructor<any>
    className?: string
}

function ChildForm({
    as: Component = 'div',
    className,
    values,
    setValues,
    options,
    setOptions,
    errors,
    setErrors,
    isFetching,
    isSubmitting,
    locale,
    children,
}: ControlledChildFormProps & { children?: React.ReactNode }) {
    const childContextValue = useMemo(
        () => ({
            values,
            setValues,
            options,
            setOptions,
            errors,
            setErrors,
            isSubmitting,
            isFetching,
            locale,
        }),
        [values, options, errors, isSubmitting, isFetching, locale],
    )

    return (
        <FormProvider value={childContextValue}>
            <Component className={cn(className)}>{children}</Component>
        </FormProvider>
    )
}

function Fields({
    children,
    singleColumn = false,
}: {
    singleColumn?: boolean
    children?: React.ReactNode
}) {
    return (
        <div className={cn(styles.items, { [styles.items__Column]: singleColumn })}>{children}</div>
    )
}

function Footer({ className, children }: { className?: string; children?: React.ReactNode }) {
    return <div className={cn(styles.footer, className)}>{children}</div>
}

function Submit({ className, children }: { className?: string; children?: React.ReactNode }) {
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
    ChildForm: typeof ChildForm
}

export const Form = InternalForm as FormInterface
Form.Error = Error
Form.Fields = Fields
Form.Item = Item
Form.Footer = Footer
Form.Submit = Submit
Form.ChildForm = ChildForm
