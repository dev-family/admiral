import React, { memo } from 'react'
import { Checkbox } from '../Checkbox/'
import { RadioProps } from './interfaces'

function InternalRadio({
    children,
    ref,
    ...restProps
}: RadioProps & { ref?: React.Ref<HTMLInputElement> }) {
    return (
        <Checkbox ref={ref} type="radio" {...restProps}>
            {children}
        </Checkbox>
    )
}

const Radio = InternalRadio
export default memo(Radio) as typeof Radio
