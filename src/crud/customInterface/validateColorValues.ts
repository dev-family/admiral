import tinycolor from 'tinycolor2'

export default function validateColorValues(values: Record<string, any>): Record<string, any> {
    const validated = Object.entries(values).reduce((acc, [key, val]) => {
        if (tinycolor(val).isValid()) {
            const format: any = tinycolor(val).getFormat()
            acc[key] = tinycolor(val).toString(format)
        } else {
            acc[key] = val
        }
        return acc
    }, {} as Record<string, any>)

    return validated
}
