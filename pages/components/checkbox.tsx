import React from 'react'
import { Page, Checkbox } from '../../admiral'

export default function CheckboxPage() {
    return (
        <Page title="Checkbox">
            <Checkbox>Checkbox</Checkbox>
            <br />
            <Checkbox disabled>Checkbox disabled</Checkbox>
            <br />
            <Checkbox checked disabled>
                Checkbox checked disabled
            </Checkbox>
            <br />
            <Checkbox size="l">Checkbox large</Checkbox>
            <br />
            <Checkbox size="l" disabled>
                Checkbox large disabled
            </Checkbox>
            <br />
            <Checkbox size="l" checked disabled>
                Checkbox large checked disabled
            </Checkbox>
            <br />
            <Checkbox view="ghost">Ghost Checkbox</Checkbox>
            <br />
            <Checkbox view="ghost" disabled>
                Ghost Checkbox disabled
            </Checkbox>
            <br />
            <Checkbox view="ghost" checked disabled>
                Ghost Checkbox checked disabled
            </Checkbox>
            <br />
            <Checkbox view="ghost" size="l">
                Ghost Checkbox large
            </Checkbox>
            <br />
            <Checkbox view="ghost" size="l" disabled>
                Ghost Checkbox large disabled
            </Checkbox>
            <br />
            <Checkbox view="ghost" size="l" checked disabled>
                Ghost Checkbox large checked disabled
            </Checkbox>
            <br />
        </Page>
    )
}
