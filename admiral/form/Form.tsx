import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    SubmitEvent,
    useImperativeHandle,
} from 'react'
import { GetFormDataResult } from '../dataProvider'
import { useNavigate } from 'react-router-dom'
import {
    FieldValues,
    FieldChangeBus,
    FieldChangeEvent,
    FormContextValue,
    FormProvider,
    useForm,
} from './FormContext'
import { Button, Notification } from '../ui'
import styles from './Form.module.scss'
import Item from './Item'
import FormTabs from './FormTabs'
import When from './When'
import Error from './Error'
import cn from 'classnames'
import { isObject } from '../utils/helpers'
import { useLatestRequest } from '../utils/hooks'
import { Locale } from './interfaces'
import { enUS } from './locale'
import { matchesField, FormRulesMap } from './rules'
import { scanFormChildren, evaluateVisibility, omitHiddenValues } from './rulesScan'
import useTypedLocation from '../router/useTypedLocation'
import { getNavigationFrom, clearNavigationFrom } from '../utils/helpers/navigationState'

// Stable empty set shared by every form without rules — keeps the context value
// identity-stable so no-rules forms never churn their consumers.
const EMPTY_SET: Set<string> = new Set()

export type FormProps = {
    locale?: Locale
    className?: string
    redirect?: string | boolean
    rules?: FormRulesMap
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
    rules,
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

    // Structure scan is value-independent — re-runs only when the children tree
    // or the rules map changes. Visibility is value-dependent and skipped
    // entirely on the fast path (no rules → null → submit sends `values` as-is).
    const scan = useMemo(() => scanFormChildren(children, rules), [children, rules])
    const evaluation = useMemo(
        () => (scan.hasRules ? evaluateVisibility(scan, values) : null),
        [scan, values],
    )
    const hiddenFields = evaluation?.hiddenPaths ?? EMPTY_SET
    const scannedFields = evaluation?.scannedPaths ?? EMPTY_SET

    // The cascade bus is created once and never replaced: subscriptions made by
    // AjaxSelect (U6) must survive every re-render (a new bus would drop them on
    // each keystroke).
    const fieldChangeRef = useRef<FieldChangeBus | null>(null)
    if (!fieldChangeRef.current) {
        const listeners = new Map<string, Set<(e: FieldChangeEvent) => void>>()
        fieldChangeRef.current = {
            notify: (event) => listeners.get(event.path)?.forEach((cb) => cb(event)),
            subscribe: (path, listener) => {
                let set = listeners.get(path)
                if (!set) {
                    set = new Set()
                    listeners.set(path, set)
                }
                set.add(listener)
                return () => {
                    set!.delete(listener)
                    if (!set!.size) listeners.delete(path)
                }
            },
        }
    }
    const fieldChange = fieldChangeRef.current

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

        // Snapshot the visibility map ONCE at submit time. A rule flipping while
        // the request is in flight must not change the payload or reclassify the
        // 422 — both omit and the error partition read this same snapshot.
        const submitEval = evaluation
        const payload = submitEval
            ? omitHiddenValues(values, submitEval.hiddenPaths, submitEval.keepPaths)
            : values

        setIsSubmitting(true)
        try {
            await submitData?.(payload)

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

            if (response?.status === 422) {
                const rawErrors = (response.data?.errors ?? {}) as Record<string, string[]>

                if (!submitEval) {
                    // No rules → nothing to partition; surface the errors verbatim.
                    setErrors(rawErrors)
                } else {
                    // Partition by the submit snapshot: an error keyed to a hidden
                    // field is moved into `_global` (its value was stripped from
                    // the payload, so an inline message about it would be stale).
                    const hiddenPaths = [...submitEval.hiddenPaths]
                    const globalMessages = [...(rawErrors._global ?? [])]
                    const nextErrors: Record<string, string[]> = {}

                    for (const [key, msgs] of Object.entries(rawErrors)) {
                        if (key === '_global') continue
                        const isHidden = hiddenPaths.some((path) => matchesField(key, path))
                        if (isHidden) {
                            for (const msg of msgs) {
                                globalMessages.push(
                                    (locale.hiddenFieldError ?? enUS.hiddenFieldError!)(key, msg),
                                )
                            }
                            console.warn(
                                `[Admiral] A 422 error targets hidden field "${key}" whose value ` +
                                    `was omitted from the payload; surfacing it in _global: ` +
                                    msgs.join('; '),
                            )
                        } else {
                            nextErrors[key] = msgs
                        }
                    }

                    if (globalMessages.length) nextErrors._global = globalMessages
                    setErrors(nextErrors)
                }
            } else {
                setErrors({})
            }

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
            rules,
            hiddenFields,
            scannedFields,
            scopePath: '',
            fieldChange,
        }),
        [
            locale,
            values,
            options,
            errors,
            isSubmitting,
            isFetching,
            rules,
            hiddenFields,
            scannedFields,
            fieldChange,
        ],
    )

    return (
        <FormProvider value={formContextValue}>
            <form onSubmit={handleSubmit} className={cn(className)}>
                {errors._global?.map((message, i) => (
                    <Error key={i} error={message} />
                ))}
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
    rules,
    hiddenFields,
    scannedFields,
    scopePath,
    fieldChange,
    children,
}: ControlledChildFormProps & { children?: React.ReactNode }) {
    // ChildForm renders inside the parent provider, so `useForm()` reads the
    // parent context. The new context fields are optional props (R13): when a
    // caller omits them — including every existing `<Form.ChildForm>` written
    // against the old prop set — they inherit the parent's values.
    const parent = useForm()
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
            rules: rules ?? parent.rules,
            hiddenFields: hiddenFields ?? parent.hiddenFields,
            scannedFields: scannedFields ?? parent.scannedFields,
            scopePath: scopePath ?? parent.scopePath,
            fieldChange: fieldChange ?? parent.fieldChange,
        }),
        [
            values,
            options,
            errors,
            isSubmitting,
            isFetching,
            locale,
            rules,
            hiddenFields,
            scannedFields,
            scopePath,
            fieldChange,
            parent,
        ],
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
    When: typeof When
    Footer: typeof Footer
    Submit: typeof Submit
    ChildForm: typeof ChildForm
}

export const Form = InternalForm as FormInterface
Form.Error = Error
Form.Fields = Fields
Form.Item = Item
Form.Tabs = FormTabs
Form.When = When
Form.Footer = Footer
Form.Submit = Submit
Form.ChildForm = ChildForm
