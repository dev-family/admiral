import React from 'react'
import { Page, Card } from '../../admiral'

const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lobortis nibh. Maecenas magna orci, tempor a porttitor a, facilisis ut ligula. Phasellus orci mi, tempor in eros ut, malesuada placerat diam. Vestibulum lectus neque, lacinia ac blandit sit amet, lacinia in nibh. Maecenas tristique quam mollis porta vehicula. Phasellus tellus nunc, iaculis in mauris vel, pharetra consequat dui. Aenean scelerisque tempus ante, non dictum augue finibus non.'

export default function CardPage() {
    return (
        <Page title="Card">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Spaces</h2>
                <Card verticalSpace="xs" horizontalSpace="s">
                    {text}
                </Card>
                <Card>{text}</Card>
                <Card verticalSpace="xl" horizontalSpace="l">
                    {text}
                </Card>
                <Card verticalSpace="2xl" horizontalSpace="5xl">
                    {text}
                </Card>
                <h2>Square Form</h2>
                <Card form="square">{text}</Card>
                <h2>No shadow</h2>
                <Card shadow={false}>{text}</Card>
            </div>
        </Page>
    )
}
