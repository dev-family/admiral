import React from 'react'
import { Page, Switch } from '../../admiral'

const labelStyleBase = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    cursor: 'pointer',
}
const styleSizeS = {
    ...labelStyleBase,
    fontSize: 'var(--size-text-s)',
}

const styleSizeM = {
    ...labelStyleBase,
    fontSize: 'var(--size-text-m)',
}

const styleSizeL = {
    ...labelStyleBase,
    fontSize: 'var(--size-text-l)',
}

export default function SwitchPage() {
    function onChange(checked: boolean) {
        console.log(`switch to ${checked}`)
    }

    return (
        <Page title="Switch">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <label style={styleSizeS}>
                    <Switch defaultChecked onChange={onChange} size="S" />
                    size S
                </label>
                <label style={styleSizeS}>
                    <Switch defaultChecked onChange={onChange} size="S" disabled />
                    size S disabled
                </label>
                <label style={styleSizeS}>
                    <Switch defaultChecked onChange={onChange} size="S" loading />
                    size S loading
                </label>
                <label style={styleSizeM}>
                    <Switch defaultChecked onChange={onChange} />
                    size M
                </label>
                <label style={styleSizeM}>
                    <Switch defaultChecked onChange={onChange} disabled />
                    size M disabled
                </label>
                <label style={styleSizeM}>
                    <Switch defaultChecked onChange={onChange} loading />
                    size M loading
                </label>
                <label style={styleSizeL}>
                    <Switch defaultChecked onChange={onChange} size="L" />
                    size L
                </label>
                <label style={styleSizeL}>
                    <Switch defaultChecked onChange={onChange} size="L" disabled />
                    size L disabled
                </label>
                <label style={styleSizeL}>
                    <Switch defaultChecked onChange={onChange} size="L" loading />
                    size L loading
                </label>
            </div>
        </Page>
    )
}
