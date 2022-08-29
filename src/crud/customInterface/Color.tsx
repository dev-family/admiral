import React, { useCallback, useState, useEffect } from 'react'
import { Input, ColorPickerInput, useForm, Form } from '../../../admiral'
import styles from './Theme.module.scss'
import tinycolor from 'tinycolor2'

const Color = ({ title, name }: { name: string; title: string }) => {
    const { values, errors, setErrors, setValues } = useForm()
    const [value, setValue] = useState(values[name])
    const error = errors[name]?.[0]

    useEffect(() => {
        setErrors((errors) => ({ ...errors }))
    }, [setErrors])

    useEffect(() => {
        if (values[name] && !tinycolor.equals(values[name], value)) {
            setValue(values[name])
        }
    }, [values[name]])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => {
            const color = e.target.value
            setValue(color)
            if (tinycolor(color).isValid()) {
                setErrors((errors) => {
                    delete errors[name]
                    return errors
                })
                setValues((values: any) => ({ ...values, [name]: color }))
            } else {
                setErrors((errors) => ({ ...errors, [name]: ['Недействительный цвет'] }))
                setValues((values: any) => ({ ...values, [name]: null }))
            }
        },
        [setErrors, setValues],
    )

    return (
        <div className={styles.color}>
            <div className={styles.color_Title}>{title}</div>
            <div className={styles.color_Row}>
                <ColorPickerInput name={name} showError={false} />
                <Input alert={!!error} value={value} onChange={onChange} />
            </div>
            <Form.Error error={error} />
        </div>
    )
}

export default Color
