import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { ColorPicker } from '../../ui'
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'

export interface ColorPickerInputProps
    extends ColorPickerProps,
        Omit<FormItemProps, 'isQuickFilter'> {
    name: string
    outputValue?: keyof ColorPickerResult
}

export const ColorPickerInput: InputComponentWithName<React.FC<ColorPickerInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    showError,
    outputValue = 'rgbString',
    ...colorPickerProps
}) => {
    const getPopupContainer = usePopupContainer()
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
            showError={showError}
            columnSpan={columnSpan}
            onLabelClick={onLabelClick}
        >
            <ColorPicker
                appendTo={getPopupContainer}
                {...colorPickerProps}
                value={value}
                onChange={onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

ColorPickerInput.inputName = 'ColorPickerInput'
