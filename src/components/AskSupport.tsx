import React from 'react'
import { Button } from '../../admiral'

const AskSupport = () => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '6px',
                flexDirection: 'column',
            }}
        >
            You can add custom component here:
            <Button style={{ width: '100%' }} type="button" view="secondary">
                Ask for support
            </Button>
        </div>
    )
}

export default AskSupport
