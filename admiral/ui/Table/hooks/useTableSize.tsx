import React, { useMemo } from 'react'
import { useSize } from 'ahooks'
import type { BasicTarget } from 'ahooks/lib/utils/domTarget'

export default function useTableSize(target: BasicTarget) {
    const refSize = useSize(target)
    const overlayStyle = useMemo(() => ({ width: refSize?.width ?? 0 }), [refSize?.width])

    return overlayStyle
}
