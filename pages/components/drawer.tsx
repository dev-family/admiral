import React, { useState, useCallback } from 'react'
import { Page, Drawer, Button, Checkbox } from '../../admiral'
import type { DrawerProps } from '../../admiral'

type DrawerPlacement = DrawerProps['placement']

export default function DrawerPage() {
    const [visible, show, close] = useDrawer()
    const [options, setOptions] = useState<Partial<DrawerProps>>({
        placement: 'right',
        showMask: true,
    })
    const { placement, title, footer, showMask } = options

    const placements: DrawerPlacement[] = ['left', 'right', 'top', 'bottom']

    return (
        <Page title="Drawer">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Options</h2>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {placements.map((i) => (
                        <label
                            key={i}
                            style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
                        >
                            <input
                                type="radio"
                                name="placement"
                                value={i}
                                checked={placement === i}
                                onChange={(e) =>
                                    setOptions((prev) => ({
                                        ...prev,
                                        placement: e.target.value as DrawerPlacement,
                                    }))
                                }
                            />
                            {i}
                        </label>
                    ))}
                </div>
                <Checkbox
                    checked={!!options.showMask}
                    onChange={(e) =>
                        setOptions((prev) => ({
                            ...prev,
                            showMask: e.target.checked,
                        }))
                    }
                >
                    Show mask
                </Checkbox>
                <Checkbox
                    checked={!!options.title}
                    onChange={(e) =>
                        setOptions((prev) => ({
                            ...prev,
                            title: e.target.checked ? "I'm header" : null,
                        }))
                    }
                >
                    With Header
                </Checkbox>
                <Checkbox
                    checked={!!options.footer}
                    onChange={(e) =>
                        setOptions((prev) => ({
                            ...prev,
                            footer: e.target.checked ? "I'm footer" : null,
                        }))
                    }
                >
                    With Footer
                </Checkbox>

                <Button type="button" onClick={show}>
                    Open
                </Button>
                <Drawer
                    placement={placement}
                    visible={visible}
                    onClose={close}
                    title={title}
                    footer={footer}
                    showMask={showMask}
                >
                    {content}
                </Drawer>
            </div>
        </Page>
    )
}

const useDrawer = (): [boolean, () => void, () => void] => {
    const [visible, setVisible] = useState(false)

    const show = useCallback(() => {
        setVisible(true)
    }, [])

    const close = useCallback(() => {
        setVisible(false)
    }, [])

    return [visible, show, close]
}

const content =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula sem tincidunt ligula scelerisque, sit amet imperdiet metus maximus. Aliquam lacus sapien, faucibus vel maximus at, lacinia at ante. Ut pulvinar leo a ultricies rhoncus. Ut vel nisi sed sapien consectetur accumsan. In efficitur nunc orci, sed sagittis lacus tempus ut. Fusce ullamcorper orci metus, non aliquet nisl fringilla eu. In quis ex sed risus facilisis tristique tempor eget sem. Nullam tincidunt tristique sem, id mattis tellus ullamcorper vel. Cras tempor molestie nunc, at pharetra eros posuere vel. Integer sed sapien euismod, bibendum odio eu, mattis metus. Cras placerat ligula in ipsum dignissim, vel lobortis purus malesuada. Donec varius leo vitae nulla lobortis, sit amet dignissim nibh aliquet. Donec imperdiet eleifend tellus nec fringilla. Mauris posuere iaculis massa vitae ultricies. In tempor arcu nec fringilla dictum. Aenean nec mollis ante, in facilisis odio. Duis imperdiet quis nibh ac maximus. Aliquam interdum lorem magna, sit amet efficitur justo tincidunt in. Sed sodales vestibulum bibendum. Etiam blandit ex id nunc iaculis bibendum. Fusce tempor facilisis ex, eget posuere lacus tempus sed. Sed sed placerat lectus. Donec mattis justo quis velit auctor posuere sed non erat. Sed cursus ac turpis at sagittis. Morbi ullamcorper pulvinar bibendum. Vestibulum ultricies eu nulla ut molestie. Proin lacinia urna ex, at imperdiet odio consequat ut. Nunc molestie mi non luctus commodo. Integer nec vulputate justo, id tincidunt est. Vestibulum volutpat ipsum urna, nec scelerisque lorem faucibus quis. Etiam imperdiet magna ante. Phasellus pharetra nunc ac urna malesuada, non dignissim ex venenatis. Suspendisse potenti. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent quis nulla quis ligula porttitor laoreet. Aliquam eu dolor justo. Suspendisse tincidunt aliquam scelerisque. Aliquam vitae tempus velit, sit amet aliquet ex. Morbi cursus ipsum sit amet purus tempus placerat. Vestibulum pharetra vestibulum erat. Mauris pulvinar est vel nulla tincidunt interdum. Sed libero erat, dapibus in ex fringilla, aliquet fermentum nibh. Sed nibh turpis, finibus ac enim a, elementum tristique lacus. Nulla ut condimentum tellus. In hac habitasse platea dictumst. Donec elit odio, placerat ac elit vel, vehicula faucibus felis. Aliquam mi magna, efficitur vitae elit at, convallis vulputate dolor. Aenean aliquet ultricies turpis, quis volutpat est. Quisque id tempor urna. Ut mattis consequat neque vitae lobortis. Vivamus ornare nunc ac massa eleifend placerat. Ut tincidunt semper nisi et porttitor. Integer vel justo nisi. Donec in semper ex, ut aliquam est. Proin sagittis finibus metus, id tincidunt tortor rhoncus quis. Phasellus tempus nulla et ornare bibendum.'
