import React from 'react'
import { FiInfo, FiArrowUpRight } from 'react-icons/fi'
import { Typography } from '../../../admiral'

import styles from './PageTopContent.module.scss'

interface Props {
    title: string
    descr?: string | JSX.Element
    link?: {
        text: string
        href: string
    }
}

const PageTopContent = ({ title, descr, link }: Props) => {
    return (
        <section className={styles.section}>
            <header className={styles.section__header}>
                <div className={styles.section__header_icon__wrapper}>
                    <FiInfo size="20px" className={styles.section__header_icon} />
                </div>
                <Typography.Title level={4} className={styles.title}>
                    {title}
                </Typography.Title>
            </header>
            <Typography.Paragraph className={styles.section__descr}>{descr}</Typography.Paragraph>
            {link ? (
                <div className={styles.section__link}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.text}
                    </a>
                    <FiArrowUpRight size="14px" className={styles.section__header_icon} />
                </div>
            ) : (
                <></>
            )}
        </section>
    )
}

export default PageTopContent
