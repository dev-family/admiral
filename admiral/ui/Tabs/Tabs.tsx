import RcTabs from 'rc-tabs'
import { FiMoreHorizontal } from 'react-icons/fi'
import cn from 'classnames'
import { TabsProps } from './interfaces'
import { getPopupContainer } from '../../utils/helpers'
import styles from './Tabs.module.scss'

export function Tabs({ type, className, size, centered, columnSpan = 1, ...props }: TabsProps) {
    return (
        <RcTabs
            {...props}
            className={cn(
                styles.tabs,
                {
                    [styles.tabs__Card]: type === 'card',
                    [styles.tabs__Centered]: centered,
                    [styles.tabs__SizeS]: size === 'S',
                    [styles.tabs__SizeL]: size === 'L',
                    [styles.tabs__ColumnSpanTwo]: columnSpan === 2,
                },
                className,
            )}
            more={{ icon: <FiMoreHorizontal /> }}
            prefixCls="tabs"
            getPopupContainer={getPopupContainer}
        />
    )
}
