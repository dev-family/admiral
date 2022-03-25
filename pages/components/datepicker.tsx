import React, { useState } from 'react'
import { Page, DatePicker } from '../../admiral'
import parseISO from 'date-fns/parseISO'
import isBefore from 'date-fns/isBefore'

export default function DatePickerPage() {
    const [value, setValue] = useState<Date | null>(parseISO('2022-02-08'))

    function onChange(date: Date | null, dateString: string) {
        console.log(date, dateString)
    }

    function onChangeControlled(date: Date | null, dateString: string) {
        console.log(date?.toISOString(), dateString)
        setValue(date)
    }

    return (
        <Page title="Datepicker">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Sizes</h2>
                <DatePicker onChange={onChange} size="L" />
                <DatePicker onChange={onChange} />
                <DatePicker onChange={onChange} size="S" />
                <DatePicker onChange={onChange} size="XS" />
                <h2>Alert</h2>
                <DatePicker onChange={onChange} alert />
                <h2>Borderless</h2>
                <DatePicker onChange={onChange} borderless />
                <h2>Disabled</h2>
                <DatePicker onChange={onChange} disabled />
                <h2>Picker types</h2>
                <DatePicker picker="month" />
                <DatePicker picker="quarter" />
                <DatePicker picker="year" />
                <h2>Disabled Dates</h2>
                <DatePicker
                    disabledDate={(current) => {
                        return isBefore(current, Date.now())
                    }}
                />
                <h2>Controlled</h2>
                <DatePicker
                    value={value}
                    onChange={onChangeControlled}
                    disabledDate={(current) => {
                        return isBefore(current, Date.now())
                    }}
                />
            </div>
        </Page>
    )
}
