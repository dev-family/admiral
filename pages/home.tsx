import { Page } from '../admiral/ui/Page'
import { Card } from '../admiral/ui/Card'
import React from 'react'

const Table: React.FC = ({ children }) => {
    return <div>{children}</div>
}

const Home: React.FC = ({ children }) => {
    return <Page title="Главная"></Page>
}

export default Home
