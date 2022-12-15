import React, { useCallback, useState } from 'react'
import { Button } from '../Button'
import { Tooltip } from '../Tooltip'
import { PopconfirmLocale, PopconfirmProps } from './interfaces'
import styles from './Popconfirm.module.scss'
import { enUs } from './locale'

const defaultLocale = enUs

export const Popconfirm = ({
    title,
    onCancel,
    onConfirm,
    locale,
    initialOpen = false,
    children,
    ...props
}: PopconfirmProps) => {
    const popconfirmLocale = { ...defaultLocale, ...locale } as PopconfirmLocale
    const [open, setOpen] = useState(initialOpen)

    const onToggleOpen = useCallback(() => {
        setOpen((prev) => !prev)
    }, [])

    const _onConfirm = (e: React.MouseEvent<Element>) => {
        if (onConfirm) onConfirm()
        setOpen(false)
    }

    const _onCancel = (e: React.MouseEvent<Element>) => {
        setOpen(false)
        if (onCancel) onCancel()
    }

    return (
        <Tooltip
            arrow={true}
            interactive
            visible={open}
            onClickOutside={onToggleOpen}
            content={
                <div className={styles.content}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.buttons}>
                        <Button onClick={_onCancel} view="secondary" size="XS">
                            {popconfirmLocale.cancelTitle}
                        </Button>
                        <Button onClick={_onConfirm} size="XS">
                            {popconfirmLocale.confirmTitle}
                        </Button>
                    </div>
                </div>
            }
            {...props}
        >
            {React.cloneElement(children as React.ReactElement<any>, {
                onClick: onToggleOpen,
            })}
        </Tooltip>
    )
}
