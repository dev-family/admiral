import React, { useState } from 'react'
import {
    Page,
    DatePicker,
    TimePicker,
    MonthPicker,
    WeekPicker,
    QuarterPicker,
    YearPicker,
} from '../../admiral'
import parseISO from 'date-fns/parseISO'
import isBefore from 'date-fns/isBefore'
import endOfToday from 'date-fns/endOfToday'
import CalendarLocale from 'rc-picker/lib/locale/ru_RU'
import { PickerLocale } from 'lib/admiral'

const locale: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
        rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
        rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
        ...CalendarLocale,
        locale: 'ru',
    },
}

function range(start: number, end: number) {
    const result = []
    for (let i = start; i < end; i++) {
        result.push(i)
    }
    return result
}

export default function DatePickerPage() {
    const [value, setValue] = useState<Date | null>(parseISO('2022-02-08'))

    function onChange(date: Date | null, dateString: string) {
        console.log(date, dateString)
    }

    function onChangeControlled(date: Date | null, dateString: string) {
        console.log(date?.toISOString(), dateString)
        setValue(date)
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
                <h3>Week</h3>
                <WeekPicker />
                <h3>Month</h3>
                <MonthPicker />
                <h3>Quarter</h3>
                <QuarterPicker />
                <h3>Year</h3>
                <YearPicker />
                <h3>Time</h3>
                <TimePicker onChange={onChange} />

                <h2>Show time</h2>
                <DatePicker showTime onChange={onChange} />
                <h2>Disabled date/time</h2>
                <DatePicker
                    showTime
                    onChange={onChange}
                    disabledTime={disabledDateTime}
                    disabledDate={disabledDate}
                />

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

                <h2>Locale</h2>
                <DatePicker onChange={onChange} locale={locale} />
            </div>
        </Page>
    )
}
