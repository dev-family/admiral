import React, { useState, forwardRef, memo, useRef, useCallback } from 'react'
import mergeRefs from 'react-merge-refs'
import styles from './Input.module.scss'
import { InputProps } from './interfaces'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Input from './Input'

const Password = forwardRef((props: InputProps, inputRef) => {
    const [visible, setVisible] = useState(false)
    const disabled = props.disabled ?? false

    const onVisibleChange = useCallback(() => {
        if (disabled) {
            return
        }

        setVisible((prev) => !prev)
    }, [disabled])

    const ref = useRef<HTMLInputElement>(null)

    return (
        <Input
            ref={mergeRefs([ref, inputRef])}
            {...props}
            type={visible ? 'text' : 'password'}
            suffix={
                <button type="button" className={styles.toggle} onClick={onVisibleChange}>
                    {visible ? <FiEye /> : <FiEyeOff />}
                </button>
            }
        />
    )
})

export default memo(Password) as typeof Password
