import React, { useState } from 'react'
import { FiClock, FiMinus, FiPlus, FiRefreshCw } from 'react-icons/fi'
import {
    Page,
    Badge,
    BadgeViewType,
    BadgeSizeType,
    BadgeStatusType,
    Switch,
    Button,
} from '../../admiral'

const statuses: BadgeStatusType[] = ['normal', 'success', 'error', 'warning', 'system']
const views: BadgeViewType[] = ['filled', 'stroked']
const sizes: BadgeSizeType[] = ['XS', 'S', 'M', 'L']

const Avatar = () => {
    return (
        <div
            style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--control-radius)',
                background: 'var(--color-bg-secondary)',
            }}
        />
    )
}

export default function BadgePage() {
    const [status, setStatus] = useState<BadgeStatusType>('normal')
    const [size, setSize] = useState<BadgeSizeType>('M')
    const [view, setView] = useState<BadgeViewType>('filled')

    const [show, setShow] = useState(true)
    const onChange = (checked: boolean) => {
        setShow(checked)
    }

    const [count, setCount] = useState(5)

    const increase = () => {
        setCount(count + 1)
    }

    const decline = () => {
        let newCount = count - 1
        if (newCount < 0) {
            newCount = 0
        }
        setCount(newCount)
    }

    const random = () => {
        const newCount = Math.floor(Math.random() * 100)
        setCount(newCount)
    }

    return (
        <Page title="Badge">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Basic</h2>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {sizes.map((i) => (
                        <label
                            key={i}
                            style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                        >
                            <input
                                type="radio"
                                name="size"
                                value={i}
                                checked={size === i}
                                onChange={(e) => setSize(e.target.value as BadgeSizeType)}
                            />
                            {i}
                        </label>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {statuses.map((i) => (
                        <label
                            key={i}
                            style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                        >
                            <input
                                type="radio"
                                name="status"
                                value={i}
                                checked={status === i}
                                onChange={(e) => setStatus(e.target.value as BadgeStatusType)}
                            />
                            {i}
                        </label>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {views.map((i) => (
                        <label
                            key={i}
                            style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                        >
                            <input
                                type="radio"
                                name="view"
                                value={i}
                                checked={view === i}
                                onChange={(e) => setView(e.target.value as BadgeViewType)}
                            />
                            {i}
                        </label>
                    ))}
                </div>

                <Badge count={5} size={size} view={view} status={status}>
                    <Avatar />
                </Badge>
                <Badge count={0} showZero size={size} view={view} status={status}>
                    <Avatar />
                </Badge>
                <Badge
                    count={<FiClock style={{ color: '#f5222d', width: 20, height: 20 }} />}
                    size={size}
                    view={view}
                    status={status}
                >
                    <Avatar />
                </Badge>

                <h2>No children</h2>
                <Badge count={25} size={size} view={view} status={status} />
                <Badge count={109} size={size} view={view} status={status} />

                <h2>Overflow count</h2>
                <Badge count={99} size={size} view={view} status={status}>
                    <Avatar />
                </Badge>
                <Badge count={100} size={size} view={view} status={status}>
                    <Avatar />
                </Badge>
                <Badge count={99} overflowCount={10} size={size} view={view} status={status}>
                    <Avatar />
                </Badge>
                <Badge count={1000} overflowCount={999} size={size} view={view} status={status}>
                    <Avatar />
                </Badge>

                <h2>Dot</h2>
                <Switch onChange={onChange} checked={show} />
                <Badge dot={show} size={size} view={view} status={status}>
                    <Avatar />
                </Badge>
                <Badge dot={show} size={size} view={view} status={status} />

                <h2>Animation</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Badge count={count} size={size} view={view} status={status} />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                            view="secondary"
                            size="XS"
                            iconLeft={<FiMinus />}
                            onClick={decline}
                        />
                        <Button
                            view="secondary"
                            size="XS"
                            iconLeft={<FiPlus />}
                            onClick={increase}
                        />
                        <Button
                            view="secondary"
                            size="XS"
                            iconLeft={<FiRefreshCw />}
                            onClick={random}
                        />
                    </div>
                </div>
            </div>
        </Page>
    )
}
