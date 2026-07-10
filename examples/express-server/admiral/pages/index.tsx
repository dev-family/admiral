import { Page, Card } from '@devfamily/admiral'
import React from 'react'

const Home: React.FC = () => {
    return (
        <Page title="Main">
            <Card>
                <h2>Example Card</h2>
                <p>This is an example card. You can use it to display information.</p>
            </Card>
        </Page>
    )
}

export default Home
