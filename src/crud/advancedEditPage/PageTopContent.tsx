import React from 'react'
import { Typography } from '../../../admiral'

const { Title, Paragraph, Text } = Typography

export default function PageTopContent() {
    return (
        <Typography>
            <Title level={2}>Introduction</Title>
            <Paragraph>
                Блок текста сначала, где я буду расписывать сценарии и вводное слово, что на этой
                странице. Все на английском.
            </Paragraph>
            <Paragraph>
                Тут я хочу показать, что можно делать полностью кастовую страницу редактирования.
            </Paragraph>
            <Paragraph>
                <p>
                    В ней вместо какого-нибудь столбца хочу селект <Text strong>Status</Text>, чтобы
                    показать, что можно прямо из таблицы менять статус. Удобно при работе с заказами
                    например.
                </p>
                <p>
                    В таблице один из столбцов -{' '}
                    <Text italic underline>
                        ссылка кастомная
                    </Text>
                    . Например это будет ссылка на заказы клиента.
                </p>
            </Paragraph>
        </Typography>
    )
}
