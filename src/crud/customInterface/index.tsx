import React, { useCallback } from 'react'
import { Page, Typography, Form } from '../../../admiral'
import validateColorValues from './validateColorValues'
import ThemeForm from './ThemeForm'
import styles from './Theme.module.scss'
import api from '../../api'

function PageTopContent() {
    return (
        <Typography>
            <Typography.Title level={2}>Introduction</Typography.Title>
            <Typography.Paragraph>
                Блок текста сначала, где я буду расписывать сценарии и вводное слово, что на этой
                странице. Все на английском.
            </Typography.Paragraph>
        </Typography>
    )
}

export default function CustomInterfacePage() {
    const fetchInitialData = useCallback(() => {
        return api.getTheme()
    }, [])

    const _onSubmit = useCallback((values) => {
        const validatedValues = validateColorValues(values)
        return api.updateTheme(validatedValues)
    }, [])

    return (
        <Page title="Custom Interface" topContent={<PageTopContent />}>
            <Form submitData={_onSubmit} fetchInitialData={fetchInitialData}>
                <ThemeForm />

                <Form.Footer className={styles.footer}>
                    <Form.Submit>Save</Form.Submit>
                </Form.Footer>
            </Form>
        </Page>
    )
}
