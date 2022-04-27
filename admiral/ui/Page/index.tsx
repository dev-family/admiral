import React from 'react'
import { Card } from '../Card'
import { Typography } from '../Typography'
import styles from './Page.module.scss'

const { Title } = Typography

export type PageProps = {
    title: string
    actions?: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children, title, actions }) => {
    return (
        <div className={styles.page}>
            <Card>
                <Title className={styles.title}>{title}</Title>

                <div className={styles.actions}>{actions}</div>

                <div>{children}</div>
            </Card>
        </div>
    )
}
