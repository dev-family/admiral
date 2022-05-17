import React from 'react'
import { Page, TimePicker } from '../../admiral'

export default function TimePickerPage() {
    function onChange(date: Date | null, dateString: string) {
        console.log(date, dateString)
    }

    return (
        <Page title="Timepicker">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Default</h2>
                <TimePicker onChange={onChange} />
                <h2>Interval option</h2>
                <TimePicker minuteStep={15} secondStep={10} onChange={onChange} />
                <h2>Hour and minute</h2>
                <TimePicker format="HH:mm" onChange={onChange} />
                <h2>12 hours</h2>
                <TimePicker use12Hours onChange={onChange} />
                <TimePicker use12Hours format="h:mm a" onChange={onChange} />
            </div>
        </Page>
    )
}
