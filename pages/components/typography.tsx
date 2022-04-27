import React from 'react'
import { Page, Typography } from '../../admiral'
const { Title, Text, Paragraph } = Typography

const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lobortis nibh. Maecenas magna orci, tempor a porttitor a, facilisis ut ligula. Phasellus orci mi, tempor in eros ut, malesuada placerat diam. Vestibulum lectus neque, lacinia ac blandit sit amet, lacinia in nibh. Maecenas tristique quam mollis porta vehicula. Phasellus tellus nunc, iaculis in mauris vel, pharetra consequat dui. Aenean scelerisque tempus ante, non dictum augue finibus non.'

export default function TypographyPage() {
    return (
        <Page title="Typography">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <div>
                    <Title>h1. My Title</Title>
                    <Title level={2}>h2. My Title</Title>
                    <Title level={3}>h3. My Title</Title>
                    <Title level={4}>h4. My Title</Title>
                    <Title level={5}>h5. My Title</Title>
                </div>

                <Text>My Text (default)</Text>
                <Text type="secondary">My Text (secondary)</Text>
                <Text type="success">My Text (success)</Text>
                <Text type="warning">My Text (warning)</Text>
                <Text type="danger">My Text (danger)</Text>
                <Text mark>My Text (mark)</Text>
                <Text code>My Text (code)</Text>
                <Text underline>My Text (underline)</Text>
                <Text delete>My Text (delete)</Text>
                <Text strong>My Text (strong)</Text>
                <Text italic>My Text (italic)</Text>

                <Typography>
                    <Title type="success">Introduction</Title>
                    <Paragraph type="secondary">{text}</Paragraph>
                    <Paragraph>
                        <p>
                            {text.substring(0, 50)}
                            <Text strong>{text.substring(50)}</Text>
                        </p>
                        <p>
                            {text.substring(0, 70)}
                            <Text strong italic>
                                {text.substring(70)}
                            </Text>
                        </p>
                        {text.substring(0, 50)}
                        <Text italic>{text.substring(50)}</Text>
                    </Paragraph>
                    <Title level={2}>Lorem Ipsum</Title>
                    <Paragraph>
                        <h2>Lorem Ipsum</h2>
                        {text.substring(0, 40)}
                        <Text code>Code 1 example</Text> and <Text code>Code 2 example</Text>),{' '}
                        {text.substring(40)}
                    </Paragraph>
                </Typography>
            </div>
        </Page>
    )
}
