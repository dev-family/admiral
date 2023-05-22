import React, { useCallback } from 'react'
import { Page, Typography, Form } from '../../../admiral'
import validateColorValues from './validateColorValues'
import ThemeForm from './ThemeForm'
import styles from './Theme.module.scss'
import api from '../../api'
import PageTopContent from '../../components/PageTopContent'

export default function CustomInterfacePage() {
    const fetchInitialData = useCallback(() => {
        return api.getTheme()
    }, [])

    const _onSubmit = useCallback((values) => {
        const validatedValues = validateColorValues(values)
        return api.updateTheme(validatedValues)
    }, [])

    return (
        <Page
            title="Custom Interface"
            topContent={
                <PageTopContent
                    title="With this example, we want to show that the admin panel can be used not only to create CRUDs, but also as a library of ready-made components, in order to implement an absolutely custom interface, without limiting anything."
                    descr={
                        <>
                            <Typography.Paragraph>
                                In one of our projects, we implemented an interface theme builder.
                                Here is an example of how we did it.
                            </Typography.Paragraph>
                        </>
                    }
                    link={{
                        href: '#',
                        text: 'Code to implement the page',
                    }}
                />
            }
        >
            <Form submitData={_onSubmit} fetchInitialData={fetchInitialData}>
                <ThemeForm />

                <Form.Footer className={styles.footer}>
                    <Form.Submit>Save</Form.Submit>
                </Form.Footer>
            </Form>
        </Page>
    )
}
