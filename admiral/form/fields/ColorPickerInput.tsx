import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { ColorPicker } from '../../ui'
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces'
import { FormItemProps } from '../Item'

export interface ColorPickerInputProps extends ColorPickerProps, FormItemProps {
    name: string
    outputValue?: keyof ColorPickerResult
}

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    outputValue = 'rgbString',
    ...colorPickerProps
}) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const onChange = useCallback((value: ColorPickerResult) => {
        setValues((values: any) => ({ ...values, [name]: value[outputValue] }))
    }, [])

    // prevent reopen when close picker by clicking on label
    const onLabelClick = useCallback((e) => {
        e?.preventDefault()
    }, [])

    return (
        <Form.Item
            label={label}
            required={required}
            error={error}
            columnSpan={columnSpan}
            onLabelClick={onLabelClick}
        >
            <ColorPicker {...colorPickerProps} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}
