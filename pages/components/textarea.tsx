import React, { useState, useRef, useEffect } from 'react'
import { Page, Textarea, Input } from '../../admiral'

export default function CheckboxPage() {
    const [value, setValue] = useState('')
    const ref = useRef<HTMLTextAreaElement>()

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
        <Page title="Textarea">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Sizes</h2>
                <Textarea placeholder="Write something..." size="L" />
                <Textarea placeholder="Write something..." />
                <Textarea placeholder="Write something..." size="S" />
                <Textarea placeholder="Write something..." size="XS" />
                <h2>Min / Max Rows</h2>
                <Textarea placeholder="Write something..." minRows={3} maxRows={6} />
                <Textarea placeholder="Write something..." maxRows={1} />
                <Textarea placeholder="Write something..." minRows={3} />
                <h2>Alert</h2>
                <Textarea placeholder="Write something..." alert />
                <h2>Controlled</h2>
                <Input value={value} disabled placeholder="Textarea value" />
                <Textarea
                    placeholder="Write something..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <h2>Autofocus on mount</h2>
                <Textarea placeholder="Write something..." ref={ref} />
                <h2>Clear</h2>
                <Textarea placeholder="Write something..." borderless />
            </div>
        </Page>
    )
}
