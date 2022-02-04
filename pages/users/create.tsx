import { Form, TextInput } from '@/admiral/form'
import { Card, CardBody, Page } from '@/admiral/ui'
import React from 'react'

export default () => (
    <Page title="New User">
        <Card>
            <CardBody>
                <Form action="http://localhost/api/users" redirect="/users">
                    <TextInput name="name" label="Name" required />
                    <TextInput name="email" label="Email" required />
                    <TextInput type="password" name="password" label="Password" required />
                    <Form.Submit>Create</Form.Submit>
                </Form>
            </CardBody>
        </Card>
    </Page>
)
