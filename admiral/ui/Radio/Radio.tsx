import React, { forwardRef, memo } from 'react'
import { Checkbox } from '../Checkbox/'
import { RadioProps } from './interfaces'

const InternalRadio: React.ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
    { children, ...restProps },
    ref,
) => {
    return (
        <Checkbox ref={ref} type="radio" {...restProps}>
            {children}
        </Checkbox>
    )
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(InternalRadio)
export default memo(Radio) as typeof Radio
