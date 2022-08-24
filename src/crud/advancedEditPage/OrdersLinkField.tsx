import React from 'react'
import styles from './OrdersLinkField.module.scss'

const OrdersLinkField: React.FC<{ href: string }> = ({ href }) => {
    return (
        <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
            Orders
        </a>
    )
}

export default OrdersLinkField
