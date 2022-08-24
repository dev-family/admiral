import React from 'react'
import { Typography } from '../../../admiral'

const { Title, Paragraph, Text } = Typography

const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lobortis nibh. Maecenas magna orci, tempor a porttitor a, facilisis ut ligula. Phasellus orci mi, tempor in eros ut, malesuada placerat diam. Vestibulum lectus neque, lacinia ac blandit sit amet, lacinia in nibh. Maecenas tristique quam mollis porta vehicula. Phasellus tellus nunc, iaculis in mauris vel, pharetra consequat dui. Aenean scelerisque tempus ante, non dictum augue finibus non.'

const CustomTab = () => {
    return (
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
                {text.substring(0, 40)}
                <Text code>Code 1 example</Text> and <Text code>Code 2 example</Text>),{' '}
                {text.substring(40)}
            </Paragraph>
        </Typography>
    )
}

export default CustomTab
