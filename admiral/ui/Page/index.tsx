import React from 'react'
import { Card } from '../Card'
import { Typography } from '../Typography'
import styles from './Page.module.scss'

const { Title } = Typography

export type PageProps = {
    title: string
    actions?: React.ReactNode
    topContent?: React.ReactNode
}

export function Page({
    children,
    title,
    actions,
    topContent,
}: PageProps & { children?: React.ReactNode }) {
    return (
        <div className={styles.page}>
            <Card className={styles.card}>
                <Title className={styles.title}>{title}</Title>

                {topContent}

                <div className={styles.actions}>{actions}</div>

                <div>{children}</div>
            </Card>
        </div>
    )
}
