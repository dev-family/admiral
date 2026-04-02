import { Select } from '../Select'

export function createSizeChangerRender(size: 'S' | 'XS') {
    return (info: {
        disabled: boolean
        size: number
        onSizeChange: (value: string | number) => void
        'aria-label': string
        className: string
        options: { label: string; value: string | number }[]
    }) => (
        <Select
            disabled={info.disabled}
            value={info.size}
            onChange={(value) => info.onSizeChange(value)}
            aria-label={info['aria-label']}
            className={info.className}
            size={size}
            options={info.options.map((opt) => ({
                label: String(opt.value),
                value: opt.value,
            }))}
        />
    )
}
