import React, { useState, memo, useRef, useCallback } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import styles from './Input.module.scss'
import { InputProps } from './interfaces'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Input from './Input'

function Password({ ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
    const [visible, setVisible] = useState(false)
    const disabled = props.disabled ?? false

    const onVisibleChange = useCallback(() => {
        if (disabled) {
            return
        }

        setVisible((prev) => !prev)
    }, [disabled])

    const internalRef = useRef<HTMLInputElement>(null)
    const mergedRef = useMergeRefs([internalRef, ref ?? null])

    return (
        <Input
            ref={mergedRef}
            {...props}
            type={visible ? 'text' : 'password'}
            suffix={
                <button type="button" className={styles.toggle} onClick={onVisibleChange}>
                    {visible ? <FiEye /> : <FiEyeOff />}
                </button>
            }
        />
    )
}

export default memo(Password) as typeof Password
