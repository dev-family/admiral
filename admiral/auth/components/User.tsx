import React from 'react'
import cn from 'classnames'
import { UserIdentity } from '../../auth/interfaces'
import styles from './User.module.scss'

type UserCardProps = UserIdentity & { collapsed?: boolean }

export const UserCard: React.FC<UserCardProps> = ({
    fullName,
    email,
    avatar,
    collapsed = false,
    children,
}) => {
    const initials = fullName
        ?.split(' ')
        .map((l) => l.trim().charAt(0))
        .splice(0, 2)
        .join('')

    return (
        <div
            className={cn(styles.container, {
                [styles.container__Collapsed]: collapsed,
                [styles.container__Children]: !!children,
            })}
        >
            <div className={styles.avatar}>{avatar ? <img src={avatar} alt="" /> : initials}</div>
            <div>
                <div className={styles.name} title={fullName}>
                    <span>{fullName}</span>
                </div>
                {email && (
                    <a href={`mailto:${email}`} className={styles.email}>
                        <span>{email}</span>
                    </a>
                )}
            </div>
            {!!children && <div>{children}</div>}
        </div>
    )
}
