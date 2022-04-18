import React, { useMemo } from 'react'
import { useThemeVars, ThemeVars } from '@consta/uikit/useThemeVars'

const _useThemeVars = (): { vars: ThemeVars; varsInline: string } => {
    const vars = useThemeVars()

    const varsInline = useMemo(() => {
        const {
            color: { primary: color },
            control,
            font,
            shadow,
            size: sizeVars,
            space,
        } = vars

        return Object.entries({
            ...color,
            ...control,
            ...font,
            ...shadow,
            ...sizeVars,
            ...space,
        })
            .map((item) => item.join(': '))
            .join('; ')
    }, [vars])

    return { vars, varsInline }
}

export default _useThemeVars
