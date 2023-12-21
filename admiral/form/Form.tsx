import React, {
    useState,
    useEffect,
    FormEvent,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react'
import { GetFormDataResult } from '../dataProvider'
import { useHistory } from 'react-router-dom'
import { FieldValues, FormContextValue, FormProvider, useForm } from './FormContext'
import { Button, Notification } from '../ui'
import styles from './Form.module.scss'
import Item from './Item'
import Error from './Error'
import cn from 'classnames'
import { isObject } from '../utils/helpers'
import { useSafeSetState } from '../utils/hooks'
import { Locale } from './interfaces'
import { enUS } from './locale'
import { RouterLocationState } from '../router/interfaces'

export type FormProps = {
    locale?: Locale
    className?: string
    redirect?: string | boolean
    fetchInitialData?: () => Promise<GetFormDataResult>
    submitData?: (values: any) => Promise<any>
    children: React.ReactNode
}

export type FormRef = {
    values: Record<any, any>
    handleSubmit: (e?: FormEvent) => Promise<void>
}

const InternalForm = forwardRef<FormRef, FormProps>(
    ({ locale = enUS, className, fetchInitialData, submitData, redirect, children }, ref) => {
        const mounted = useRef(false)
        const [values, setValues] = useState<Record<any, any>>({})
        const [options, setOptions] = useState<Record<any, any>>({})
        const [errors, setErrors] = useState({})
        const [isSubmitting, setIsSubmitting] = useSafeSetState(false)
        const [isFetching, setIsFetching] = useSafeSetState(true)
        const history = useHistory<RouterLocationState>()

        async function _fetchInitialData() {
            try {
                const response = await fetchInitialData!()
                if (isObject(response.data)) setValues({ ...response.data })
                if (isObject(response.values)) setOptions({ ...response.values })
            } catch (error) {
                mounted.current &&
                    setErrors((prev) => ({ ...prev, cathed: ['Fetch initial data error'] }))
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
            mounted.current = true

            return () => {
                mounted.current = false
            }
        }, [])

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
                    history.goBack()
                } else if (redirect) {
                    history.push({
                        pathname: redirect,
                        // update table when drawer saved and closed
                        state: { update: { dataTable: true } },
                    })
                    return
                }

                mounted.current && setErrors({})
            } catch (e: any) {
                mounted.current &&
                    setErrors(e.response.status === 422 ? e.response.data.errors : {})

                Notification({
                    message: e.response.data.message ?? locale.serverErrorMessage,
                    type: 'error',
                })
            }
            setIsSubmitting(false)
        }

        return (
            <FormProvider
                value={{
                    locale,
                    values,
                    setValues,
                    options,
                    setOptions,
                    errors,
                    setErrors,
                    isSubmitting,
                    isFetching,
                }}
            >
                <form onSubmit={handleSubmit} className={cn(className)}>
                    {children}
                </form>
            </FormProvider>
        )
    },
)

export type ControlledChildFormProps = FormContextValue<FieldValues> & {
    as?: string | React.JSXElementConstructor<any>
    className?: string
}

const ChildForm: React.FC<ControlledChildFormProps> = ({
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
}) => {
    return (
        <FormProvider
            value={{
                values,
                setValues,
                options,
                setOptions,
                errors,
                setErrors,
                isSubmitting,
                isFetching,
                locale,
            }}
        >
            <Component className={cn(className)}>{children}</Component>
        </FormProvider>
    )
}

const Fields: React.FC<{ singleColumn?: boolean }> = ({ children, singleColumn = false }) => {
    return (
        <div className={cn(styles.items, { [styles.items__Column]: singleColumn })}>{children}</div>
    )
}

const Footer: React.FC<{ className?: string }> = ({ className, children }) => {
    return <div className={cn(styles.footer, className)}>{children}</div>
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
    ChildForm: typeof ChildForm
}

export const Form = InternalForm as FormInterface
Form.Error = Error
Form.Fields = Fields
Form.Item = Item
Form.Footer = Footer
Form.Submit = Submit
Form.ChildForm = ChildForm
