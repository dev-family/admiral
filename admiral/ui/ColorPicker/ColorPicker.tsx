import React, { memo, useCallback, useState, useEffect, useRef } from 'react'
import { RgbaColorPicker, HexColorInput } from 'react-colorful'
import tinycolor, { ColorInputWithoutInstance as ColorInputType } from 'tinycolor2'
import { Tooltip } from '../Tooltip'
import { useMergeRefs } from '@floating-ui/react'
import cn from 'classnames'
import type { RGBA, ColorPickerResult, ColorPickerProps } from './interfaces'
import './ColorPicker.scss'

function ColorPicker({
    initialOpen = false,
    value,
    size = 'M',
    disabled = false,
    alert = false,
    onChange,
    onChangeComplete,
    appendTo,
    ref: pickerRef,
}: ColorPickerProps & { ref?: React.Ref<any> }) {
    const ref = useRef<HTMLButtonElement>(null)
    const mergedRef = useMergeRefs([pickerRef ?? null, ref])
    const [open, setOpen] = useState(initialOpen)
    const [color, setColor] = useState<RGBA>(formatColorToRgb(value))
    const [isValid, setIsValid] = useState(tinycolor(value).isValid())

    useEffect(() => {
        const valueFromProps = value ? formatColorToRgb(value) : formatColorToRgb()
        const equals = tinycolor.equals(valueFromProps, color)
        if (!equals || !isValid) {
            setColor(valueFromProps)
            setIsValid(tinycolor(value).isValid())
        }
    }, [value])

    const handleChange = useCallback(
        (color: RGBA) => {
            setColor(color)
            setIsValid(tinycolor(color).isValid())
            if (onChange) onChange(formatColorOutput(color))
        },
        [onChange],
    )

    const handleChangeComplete = useCallback(
        (color: RGBA) => {
            if (onChangeComplete) onChangeComplete(formatColorOutput(color))
        },
        [onChangeComplete],
    )

    const handleHexChange = useCallback(
        (hex: string) => {
            const color = formatColorToRgb(hex)
            setColor(color)
            setIsValid(tinycolor(color).isValid())
            if (onChange) onChange(formatColorOutput(color))
            if (onChangeComplete) onChangeComplete(formatColorOutput(color))
        },
        [onChange, onChangeComplete],
    )

    const hex = color.a < 1 ? tinycolor(color).toHex8String() : tinycolor(color).toHexString()

    return (
        <Tooltip
            placement="bottom-start"
            invertTheme={false}
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            content={
                <div className="colorPicker">
                    <RgbaColorPicker
                        color={color}
                        onChange={handleChange}
                        onChangeEnd={handleChangeComplete}
                    />
                    <HexColorInput
                        aria-label="hex"
                        color={hex}
                        onChange={handleHexChange}
                        prefixed
                        alpha
                    />
                </div>
            }
            interactive
            disabled={disabled}
            mode="custom"
            root={appendTo}
        >
            <button
                ref={mergedRef}
                className={cn('colorPickerToggle', {
                    colorPickerToggle__SizeL: size === 'L',
                    colorPickerToggle__SizeS: size === 'S',
                    colorPickerToggle__SizeXS: size === 'XS',
                    colorPickerToggle__Alert: alert,
                    colorPickerToggle__Unset: !isValid,
                })}
                type="button"
            >
                <span style={{ backgroundColor: tinycolor(color).toRgbString() }} />
            </button>
        </Tooltip>
    )
}

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
