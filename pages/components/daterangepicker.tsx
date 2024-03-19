import React, { useState } from 'react'
import { Page, RangePicker, PickerLocale, PickerRangeValue } from '../../admiral'
import parseISO from 'date-fns/parseISO'
import isBefore from 'date-fns/isBefore'
import endOfToday from 'date-fns/endOfToday'
import CalendarLocale from 'rc-picker/lib/locale/es_ES'

const locale: PickerLocale = {
    lang: {
        placeholder: 'Selecciona una fecha',
        yearPlaceholder: 'Selecciona un año',
        quarterPlaceholder: 'Selecciona un trimestre',
        monthPlaceholder: 'Selecciona un mes',
        weekPlaceholder: 'Selecciona una semana',
        rangePlaceholder: ['Fecha de inicio', 'Fecha de fin'],
        rangeYearPlaceholder: ['Año de inicio', 'Año de fin'],
        rangeMonthPlaceholder: ['Mes de inicio', 'Mes de fin'],
        rangeWeekPlaceholder: ['Semana de inicio', 'Semana de fin'],
        ...CalendarLocale,
        locale: 'es',
    },
}

function range(start: number, end: number) {
    const result = []
    for (let i = start; i < end; i++) {
        result.push(i)
    }
    return result
}

export default function DateRangePickerPage() {
    const [value, setValue] = useState<PickerRangeValue<Date> | null>([
        parseISO('2022-02-08'),
        parseISO('2022-02-10'),
    ])

    function onChange(dates: PickerRangeValue<Date>, dateString: [string, string]) {
        console.log(dates, dateString)
    }

    function onChangeControlled(dates: PickerRangeValue<Date>, dateString: [string, string]) {
        console.log(dates, dateString)
        setValue(dates)
    }

    function disabledDate(current: Date) {
        // Can not select days before today and today
        return current && current < endOfToday()
    }

    function disabledDateTime() {
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        }
    }

    return (
        <Page title="DateRangepicker">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Sizes</h2>
                <RangePicker onChange={onChange} size="L" />
                <RangePicker onChange={onChange} />
                <RangePicker onChange={onChange} size="S" />
                <RangePicker onChange={onChange} size="XS" />
                <h2>Alert</h2>
                <RangePicker onChange={onChange} alert />
                <h2>Borderless</h2>
                <RangePicker onChange={onChange} borderless />
                <h2>Disabled</h2>
                <RangePicker onChange={onChange} disabled />
                <h2>Picker types</h2>
                <h3>Week</h3>
                <RangePicker onChange={onChange} picker="week" />
                <h3>Month</h3>
                <RangePicker onChange={onChange} picker="month" />
                <h3>Quarter</h3>
                <RangePicker onChange={onChange} picker="quarter" />
                <h3>Year</h3>
                <RangePicker onChange={onChange} picker="year" />
                <h3>Time</h3>
                <RangePicker onChange={onChange} picker="time" />

                <h2>Show time</h2>
                <RangePicker showTime onChange={onChange} />
                <h2>Disabled date/time</h2>
                <RangePicker
                    showTime
                    onChange={onChange}
                    disabledTime={disabledDateTime}
                    disabledDate={disabledDate}
                />

                <h2>Disabled Dates</h2>
                <RangePicker
                    disabledDate={(current) => {
                        return isBefore(current, Date.now())
                    }}
                />
                <h2>Controlled</h2>
                <RangePicker
                    value={value}
                    onChange={onChangeControlled}
                    disabledDate={(current) => {
                        return isBefore(current, Date.now())
                    }}
                />

                <h2>Locale</h2>
                <RangePicker onChange={onChange} locale={locale} />
            </div>
        </Page>
    )
}
