import React, { useCallback } from 'react'
import { Page, TextInput, Form, BackButton } from '../../../admiral'
import validateColorValues from './validateColorValues'
import ThemeForm from './ThemeForm'
import type { FormProps, CRUDConfig } from '../../../admiral'
import styles from './Theme.module.scss'

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export interface ThemePageProps
    extends Omit<WithRequired<FormProps, 'submitData'>, 'redirect' | 'children'> {
    path: CRUDConfig<any>['path']
    title: string
}

export default function ThemePage({ path, title, fetchInitialData, submitData }: ThemePageProps) {
    const _onSubmit = useCallback((values) => {
        const validatedValues = validateColorValues(values)
        return submitData(validatedValues)
    }, [])

    return (
        <Page title={title}>
            <Form submitData={_onSubmit} fetchInitialData={fetchInitialData} redirect={path}>
                <TextInput label="Название" name="name" placeholder="Название" />
                <ThemeForm />

                <Form.Footer className={styles.footer}>
                    <BackButton basePath={path}>Назад</BackButton>
                    <Form.Submit>Сохранить</Form.Submit>
                </Form.Footer>
            </Form>
        </Page>
    )
}
