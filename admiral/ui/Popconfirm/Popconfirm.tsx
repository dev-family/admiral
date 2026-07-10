import React, { useState } from 'react'
import { Button } from '../Button'
import { Tooltip } from '../Tooltip'
import { PopconfirmLocale, PopconfirmProps } from './interfaces'
import styles from './Popconfirm.module.scss'
import { enUS } from './locale'

const defaultLocale = enUS

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

    const _onConfirm = (_e: React.MouseEvent<Element>) => {
        if (onConfirm) onConfirm()
        setOpen(false)
    }

    const _onCancel = (_e: React.MouseEvent<Element>) => {
        setOpen(false)
        if (onCancel) onCancel()
    }

    return (
        <Tooltip
            arrow={true}
            interactive
            trigger="click"
            open={open}
            onOpenChange={setOpen}
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
            {children as React.ReactElement<any>}
        </Tooltip>
    )
}
