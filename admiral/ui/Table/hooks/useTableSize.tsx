import React, { useMemo } from 'react'
import useSize from '../../../utils/hooks/useSize'

export default function useTableSize(target: React.RefObject<HTMLElement | null>) {
    const refSize = useSize(target)
    const overlayStyle = useMemo(() => ({ width: refSize?.width ?? 0 }), [refSize?.width])

    return overlayStyle
}
