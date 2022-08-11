type ColorInputType = string | RGB | RGBA | HSL | HSLA

interface Alpha {
    a: number
}

interface RGB {
    r: number
    g: number
    b: number
}

export interface RGBA extends RGB, Alpha {}

interface HSL {
    h: number
    s: number
    l: number
}

export interface HSLA extends HSL, Alpha {}

export type ColorPickerSizeType = 'XS' | 'S' | 'M' | 'L'

export type ColorPickerProps = {
    value?: ColorInputType
    onChange?: (color: ColorPickerResult) => void
    onChangeComplete?: (color: ColorPickerResult) => void
    initialOpen?: boolean
    size?: ColorPickerSizeType
    disabled?: boolean
    alert?: boolean
    appendTo?: () => HTMLElement
}

export interface ColorPickerResult {
    hex: string
    hex8: string
    rgb: RGBA
    rgbString: string
    hsl: HSLA
    hslString: string
}
