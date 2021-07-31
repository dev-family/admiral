import { Form, Input, Submit } from '../../admiral/form'
import { Card, CardBody, Page } from '../../admiral/ui'
import React from 'react'

export default ({ id }) => (
    <Page title={`Edit User #${id}`}>
        <Card>
            <CardBody>
                <Form action={`http://localhost/api/users/${id}`} redirect="/users" hasInitialData>
                    <Input name="name" label="Name" required />
                    <Input name="email" label="Email" required />
                    <Input type="password" name="password" label="Password" required />
                    <Submit>Update</Submit>
                </Form>
            </CardBody>
        </Card>
    </Page>
)
