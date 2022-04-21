import React, { useState } from 'react'
import { Page, ColorPicker, Input, Button } from '../../admiral'

const initialValue = {
    rgb: '',
    hsl: '',
    hex: '',
    hex8: '',
}

export default function ColorPickerPage() {
    const [value, setValue] = useState(initialValue)

    return (
        <Page title="Colorpicker">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Sizes</h2>
                <ColorPicker size="L" />
                <ColorPicker />
                <ColorPicker size="S" />
                <ColorPicker size="XS" />
                <h2>Alert</h2>
                <ColorPicker alert />
                <h2>Controlled</h2>
                <Input value={value.hex} disabled placeholder="HEX value" />
                <Input value={value.hex8} disabled placeholder="HEX8 value" />
                <Input value={value.rgb} disabled placeholder="RGB value" />
                <Input value={value.hsl} disabled placeholder="HSL value" />
                <div
                    style={{
                        display: 'flex',
                        gap: '24px',
                    }}
                >
                    <ColorPicker
                        value={value.rgb}
                        onChangeComplete={(color) =>
                            setValue({
                                rgb: color.rgbString,
                                hsl: color.hslString,
                                hex: color.hex,
                                hex8: color.hex8,
                            })
                        }
                    />
                    <Button type="button" onClick={() => setValue(initialValue)}>
                        Clear
                    </Button>
                </div>
            </div>
        </Page>
    )
}
