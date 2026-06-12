import React, { useState, useEffect, useMemo, SubmitEvent, useImperativeHandle } from 'react'
import { GetFormDataResult } from '../dataProvider'
import { useNavigate } from 'react-router-dom'
import { FieldValues, FormContextValue, FormProvider, useForm } from './FormContext'
import { Button, Notification } from '../ui'
import styles from './Form.module.scss'
import Item from './Item'
import FormTabs from './FormTabs'
import Error from './Error'
import cn from 'classnames'
import { isObject } from '../utils/helpers'
import { useLatestRequest } from '../utils/hooks'
import { Locale } from './interfaces'
import { enUS } from './locale'
import useTypedLocation from '../router/useTypedLocation'
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
    setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>
    handleSubmit: (e?: SubmitEvent<HTMLFormElement>) => Promise<boolean>
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
    const location = useTypedLocation()

    useImperativeHandle(ref, () => ({
        values,
        setValues,
        handleSubmit,
    }))

    // Out-of-order responses (fetchInitialData changed mid-flight) must not
    // overwrite newer ones.
    const beginRequest = useLatestRequest()

    useEffect(() => {
        if (typeof fetchInitialData !== 'function') {
            setIsFetching(false)
            return
        }

        const isCurrent = beginRequest()
        const run = async () => {
            setIsFetching(true)
            try {
                const response = await fetchInitialData()
                if (!isCurrent()) return
                if (isObject(response.data)) setValues({ ...response.data })
                if (isObject(response.values)) setOptions({ ...response.values })
            } catch {
                if (isCurrent()) {
                    setErrors((prev) => ({ ...prev, _global: ['Fetch initial data error'] }))
                }
            } finally {
                if (isCurrent()) {
                    setIsFetching(false)
                }
            }
        }
        run()
    }, [fetchInitialData, beginRequest])

    async function handleSubmit(e?: SubmitEvent<HTMLFormElement>): Promise<boolean> {
        e?.preventDefault()

        setIsSubmitting(true)
        try {
            await submitData?.(values)

            Notification({
                message: locale.successMessage,
                type: 'success',
            })
            if (redirect === true) {
                const fromLocation = getNavigationFrom(location.state?.from)

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
                return true
            }

            setErrors({})
            return true
        } catch (e) {
            const response = (
                e as {
                    response?: { status?: number; data?: { errors?: unknown; message?: string } }
                }
            )?.response
            setErrors(
                response?.status === 422
                    ? ((response.data?.errors ?? {}) as Record<string, string[]>)
                    : {},
            )

            Notification({
                message: response?.data?.message ?? locale.serverErrorMessage,
                type: 'error',
            })
            return false
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
    Tabs: typeof FormTabs
    Footer: typeof Footer
    Submit: typeof Submit
    ChildForm: typeof ChildForm
}

export const Form = InternalForm as FormInterface
Form.Error = Error
Form.Fields = Fields
Form.Item = Item
Form.Tabs = FormTabs
Form.Footer = Footer
Form.Submit = Submit
Form.ChildForm = ChildForm
