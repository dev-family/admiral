import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { ColorPicker } from '../../ui'
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export interface ColorPickerInputProps extends ColorPickerProps, FormItemProps, FieldRuleProps {
    name: string
    outputValue?: keyof ColorPickerResult
    onChange?: (value: any) => void
}

const ColorPickerInputBase: InputComponentWithName<
    (props: ColorPickerInputProps) => React.JSX.Element
> = function ColorPickerInput({
    name,
    label,
    required,
    columnSpan,
    showError,
    outputValue = 'rgbString',
    onChange,
    ...colorPickerProps
}: ColorPickerInputProps) {
    const getPopupContainer = usePopupContainer()
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (value: ColorPickerResult) => {
            setValues((values: any) => ({ ...values, [name]: value[outputValue] }))
            onChange?.(value[outputValue])
        },
        [name, outputValue, onChange],
    )

    // prevent reopen when close picker by clicking on label
    const onLabelClick = useCallback((e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()
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
                onChange={_onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

ColorPickerInputBase.inputName = 'ColorPickerInput'

export const ColorPickerInput = withFieldRules(ColorPickerInputBase)
