import React from 'react'
import { Card } from '../Card'
import styles from './Page.module.scss'

export type PageProps = {
    title: string
    actions?: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children, title, actions }) => {
    return (
        <div className={styles.page}>
            <Card>
                <h2 className={styles.title}>{title}</h2>

                <div className={styles.actions}>{actions}</div>

                <div>{children}</div>
            </Card>
        </div>
    )
}
