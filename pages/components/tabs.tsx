import React, { useState } from 'react'
import { Page, Tabs, TabsPosition, TabsSizeType } from '../../admiral'

const positions: TabsPosition[] = ['top', 'bottom', 'left', 'right']
const sizes: TabsSizeType[] = ['L', 'M', 'S']

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
                <Tabs defaultActiveKey="1" onChange={onChange} tabPosition={pos}>
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </Tabs.TabPane>
                </Tabs>
                <Tabs defaultActiveKey="1" type="card" tabPosition={pos}>
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Tab 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Tab 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">
                        Tab 3
                    </Tabs.TabPane>
                </Tabs>

                <h2>Disabled</h2>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Tab 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" disabled key="2">
                        Tab 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">
                        Tab 3
                    </Tabs.TabPane>
                </Tabs>

                <h2>Centered</h2>
                <Tabs defaultActiveKey="1" centered>
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Tab 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Tab 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">
                        Tab 3
                    </Tabs.TabPane>
                </Tabs>

                <h2>Slide</h2>
                <Tabs defaultActiveKey="1">
                    {[...Array.from({ length: 30 }, (_, i) => i)].map((i) => (
                        <Tabs.TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
                            Content of tab {i}
                        </Tabs.TabPane>
                    ))}
                </Tabs>

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
                <Tabs defaultActiveKey="1" onChange={onChange} size={size}>
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </Tabs.TabPane>
                </Tabs>
                <Tabs defaultActiveKey="1" onChange={onChange} type="card" size={size}>
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Page>
    )
}
