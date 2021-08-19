import { Form, Input, Submit } from '@/admiral/form'
import { Card, CardBody, Page } from '@/admiral/ui'
import React from 'react'

export default () => (
    <Page title="New User">
        <Card>
            <CardBody>
                <Form action="http://localhost/api/users" redirect="/users">
                    <Input name="name" label="Name" required />
                    <Input name="email" label="Email" required />
                    <Input type="password" name="password" label="Password" required />
                    <Submit>Create</Submit>
                </Form>
            </CardBody>
        </Card>
    </Page>
)
