import React, { memo, useCallback, useState, useEffect, forwardRef, useRef } from 'react'
import { ChromePicker, ColorChangeHandler, Color } from 'react-color'
import tinycolor, { ColorInputWithoutInstance as ColorInputType } from 'tinycolor2'
import { Tooltip } from '../Tooltip'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'
import type { RGBA, ColorPickerResult, ColorPickerProps } from './interfaces'
import './ColorPicker.scss'

const chromePickerStyles = {
    default: {
        body: {
            padding: 'var(--space-m) var(--space-m) var(--space-s)',
        },
    },
}

const ColorPicker = forwardRef(
    (
        {
            initialOpen = false,
            value,
            size = 'M',
            disabled = false,
            alert = false,
            onChange,
            onChangeComplete,
            appendTo,
        }: ColorPickerProps,
        pickerRef,
    ) => {
        const ref = useRef<HTMLButtonElement>(null)
        const [open, setOpen] = useState(initialOpen)
        const [color, setColor] = useState<Color>(formatColorToRgb(value))
        const [isValid, setIsValid] = useState(tinycolor(value).isValid())

        useEffect(() => {
            const valueFromProps = value ? formatColorToRgb(value) : formatColorToRgb()
            const equals = tinycolor.equals(valueFromProps, color)
            if (!equals || !isValid) {
                setColor(valueFromProps)
                setIsValid(tinycolor(value).isValid())
            }
        }, [value])

        const handleChange: ColorChangeHandler = useCallback(
            (color) => {
                setColor(color.rgb)
                setIsValid(tinycolor(color.rgb).isValid())
                if (onChange) onChange(formatColorOutput(color.rgb as RGBA))
            },
            [onChange],
        )

        const handleChangeComplete: ColorChangeHandler = useCallback(
            (color) => {
                if (onChangeComplete) onChangeComplete(formatColorOutput(color.rgb as RGBA))
            },
            [onChangeComplete],
        )

        const onToggleOpen = useCallback(() => setOpen((prev) => !prev), [])

        return (
            <Tooltip
                placement="bottom-start"
                invertTheme={false}
                visible={open}
                onClickOutside={onToggleOpen}
                content={
                    <ChromePicker
                        styles={chromePickerStyles}
                        className="colorPicker"
                        color={color}
                        onChange={handleChange}
                        onChangeComplete={handleChangeComplete}
                    />
                }
                interactive
                disabled={disabled}
                mode="custom"
                appendTo={appendTo}
            >
                <button
                    ref={mergeRefs([pickerRef, ref])}
                    className={cn('colorPickerToggle', {
                        colorPickerToggle__SizeL: size === 'L',
                        colorPickerToggle__SizeS: size === 'S',
                        colorPickerToggle__SizeXS: size === 'XS',
                        colorPickerToggle__Alert: alert,
                        colorPickerToggle__Unset: !isValid,
                    })}
                    type="button"
                    onClick={onToggleOpen}
                >
                    <span style={{ backgroundColor: tinycolor(color).toRgbString() }} />
                </button>
            </Tooltip>
        )
    },
)

export default memo(ColorPicker) as typeof ColorPicker

function formatColorOutput(color: RGBA): ColorPickerResult {
    return {
        hex: tinycolor(color).toHex(),
        hex8: tinycolor(color).toHex8(),
        rgb: tinycolor(color).toRgb(),
        rgbString: tinycolor(color).toRgbString(),
        hsl: tinycolor(color).toHsl(),
        hslString: tinycolor(color).toHslString(),
    }
}

function formatColorToRgb(color?: ColorInputType): RGBA {
    return tinycolor(color).toRgb()
}
