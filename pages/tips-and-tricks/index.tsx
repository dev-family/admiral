import React from 'react'
import { Page, Button } from '../../admiral'
import { Link } from 'react-router-dom'

export default function ComponentsPage() {
    return (
        <Page title="Tips & Tricks">
            <div style={{ display: 'grid', gridGap: '24px' }}>
                <Link to="tips-and-tricks/editor-js">
                    <Button component="span">Editor JS</Button>
                </Link>
            </div>
        </Page>
    )
}
