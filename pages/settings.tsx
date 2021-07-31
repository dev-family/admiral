import { Button, Page, Card, Form, Input, FormGroup } from '../admiral/ui'
import React, { useCallback, useState } from 'react'

const Settings: React.FC = ({ children }) => {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
    })

    return (
        <Page title="Настройки">
            <Card>
                <Form>
                    <FormGroup label="Имя">
                        <Input
                            value={state.firstName}
                            onChange={(firstName) => setState({ ...state, firstName })}
                        />
                    </FormGroup>
                    <FormGroup label="Фамилия" error="test">
                        <Input
                            value={state.lastName}
                            onChange={(lastName) => setState({ ...state, lastName })}
                        />
                    </FormGroup>
                    <Button>Сохранить</Button>
                </Form>
            </Card>
        </Page>
    )
}

export default Settings
