import { useState } from 'react'
import { Page, Tabs, TabsPosition, TabsSizeType } from '../../admiral'

const positions: TabsPosition[] = ['top', 'bottom', 'left', 'right']
const sizes: TabsSizeType[] = ['L', 'M', 'S']

const contentItems = [
    { key: '1', label: 'Tab 1', children: 'Content of Tab Pane 1' },
    { key: '2', label: 'Tab 2', children: 'Content of Tab Pane 2' },
    { key: '3', label: 'Tab 3', children: 'Content of Tab Pane 3' },
]

const shortItems = [
    { key: '1', label: 'Tab 1', children: 'Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Tab 2' },
    { key: '3', label: 'Tab 3', children: 'Tab 3' },
]

const disabledItems = [
    { key: '1', label: 'Tab 1', children: 'Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Tab 2', disabled: true },
    { key: '3', label: 'Tab 3', children: 'Tab 3' },
]

const slideItems = Array.from({ length: 30 }, (_, i) => ({
    key: String(i),
    label: `Tab-${i}`,
    children: `Content of tab ${i}`,
    disabled: i === 28,
}))

export default function TabsPage() {
    const [pos, setPos] = useState<TabsPosition>('top')
    const [size, setSize] = useState<TabsSizeType>('M')

    const onChange = (key: string) => {
        console.log(key)
    }

    return (
        <Page title="Tabs">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr)',
                    gridGap: '24px',
                }}
            >
                <h2>Types and positions</h2>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {positions.map((i) => (
                        <label
                            key={i}
                            style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                        >
                            <input
                                type="radio"
                                name="position"
                                value={i}
                                checked={pos === i}
                                onChange={(e) => setPos(e.target.value as TabsPosition)}
                            />
                            {i}
                        </label>
                    ))}
                </div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    tabPosition={pos}
                    items={contentItems}
                />
                <Tabs defaultActiveKey="1" type="card" tabPosition={pos} items={shortItems} />

                <h2>Disabled</h2>
                <Tabs defaultActiveKey="1" items={disabledItems} />

                <h2>Centered</h2>
                <Tabs defaultActiveKey="1" centered items={shortItems} />

                <h2>Slide</h2>
                <Tabs defaultActiveKey="1" items={slideItems} />

                <h2>Sizes</h2>
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
                                onChange={(e) => setSize(e.target.value as TabsSizeType)}
                            />
                            {i}
                        </label>
                    ))}
                </div>
                <Tabs defaultActiveKey="1" onChange={onChange} size={size} items={contentItems} />
                <Tabs
                    defaultActiveKey="1"
                    onChange={onChange}
                    type="card"
                    size={size}
                    items={contentItems}
                />
            </div>
        </Page>
    )
}
