import { Page } from '@/admiral/ui/Page'
import React from 'react'

const Table: React.FC = ({ children }) => {
    return <div>{children}</div>
}

const Home: React.FC = () => {
    return <Page title="Главная"></Page>
}

export default Home
