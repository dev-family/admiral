import { Page } from '@/admiral/ui/Page'
import { Button } from '@consta/uikit/Button'
import React from 'react'

const Table: React.FC = ({ children }) => {
    return <div>{children}</div>
}

const Home: React.FC = () => {
    return (
        <Page title="Главная">
            <Button label="Кнопочка" />
        </Page>
    )
}

export default Home
