import { Form, Input } from '@/admiral/form'
import { Card, CardBody, Page } from '@/admiral/ui'
import React from 'react'

export default () => (
    <Page title="New User">
        <Card>
            <CardBody>
                <Form action="http://localhost/api/users" redirect="/users">
                    <Form.Submit>Create</Form.Submit>
                </Form>
            </CardBody>
        </Card>
    </Page>
)
