import React from 'react'
import { Button, Notification, Page } from '../../admiral'
import { FiClock } from 'react-icons/fi'

const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lobortis nibh. Maecenas magna orci, tempor a porttitor a, facilisis ut ligula.'

export default function NotificationPage() {
    return (
        <Page title="Notification">
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr)',
                    gridGap: '24px',
                    marginBottom: '24px',
                }}
            >
                <h2>Basic</h2>
                <Button
                    onClick={() =>
                        Notification({
                            message: 'Notification Title',
                            description: text,
                        })
                    }
                >
                    Open notification
                </Button>

                <h2>Placement</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        onClick={() =>
                            Notification({
                                placement: 'top',
                                message: 'Notification Title',
                            })
                        }
                    >
                        Top
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                placement: 'topLeft',
                                message: 'Notification Title',
                            })
                        }
                    >
                        TopLeft
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                placement: 'topRight',
                                message: 'Notification Title',
                            })
                        }
                    >
                        TopRight
                    </Button>
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        onClick={() =>
                            Notification({
                                placement: 'bottom',
                                message: 'Notification Title',
                            })
                        }
                    >
                        Bottom
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                placement: 'bottomLeft',
                                message: 'Notification Title',
                            })
                        }
                    >
                        BottomLeft
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                placement: 'bottomRight',
                                message: 'Notification Title',
                            })
                        }
                    >
                        BottomRight
                    </Button>
                </div>

                <h2>Notification with icon</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Button
                        onClick={() =>
                            Notification({
                                type: 'success',
                                message: 'Notification Title',
                            })
                        }
                    >
                        Success
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                type: 'info',
                                message: 'Notification Title',
                            })
                        }
                    >
                        Info
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                type: 'warning',
                                message: 'Notification Title',
                            })
                        }
                    >
                        Warning
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                type: 'error',
                                message: 'Notification Title',
                            })
                        }
                    >
                        Error
                    </Button>
                    <Button
                        onClick={() =>
                            Notification({
                                message: 'Notification Title',
                                icon: <FiClock color="#0aa5ff" />,
                            })
                        }
                    >
                        Custom icon
                    </Button>
                </div>

                <h2>Closable</h2>
                <Button
                    onClick={() =>
                        Notification({
                            message: 'Notification Title',
                            closable: false,
                        })
                    }
                >
                    Without close icon
                </Button>

                <h2>Duration</h2>
                <Button
                    onClick={() =>
                        Notification({
                            message: 'Notification Title',
                            duration: 0,
                        })
                    }
                >
                    Open notification
                </Button>
            </div>
        </Page>
    )
}
