import React, { useMemo } from 'react'
import { FiCameraOff } from 'react-icons/fi'
import { IUser } from '../../mocks/data/users'
import cn from 'classnames'

import styles from './InfoTab.module.scss'

export default function InfoTab({ name, avatar }: IUser) {
    const node = useMemo(() => {
        const { thumbUrl, url } = avatar || {}
        const src = thumbUrl || url
        if (src) {
            return <img src={src} />
        } else {
            return <FiCameraOff />
        }
    }, [avatar])

    return (
        <dl>
            <dt className={styles.title}>Name</dt>
            <dd className={styles.desc}>{name}</dd>
            <dt className={styles.title}>Avatar</dt>
            <dd className={cn(styles.desc, styles.avatar)}>{node}</dd>
        </dl>
    )
}
