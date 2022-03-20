import React from 'react'
import { Page, Button } from '@/admiral/ui'
import { Link } from 'react-router-dom'

export default function ComponentsPage() {
    return (
        <Page title="Компоненты">
            <div style={{ display: 'grid', gridGap: '24px' }}>
                <Link to="components/table">
                    <Button component="span">Table</Button>
                </Link>
                <Link to="components/checkbox">
                    <Button component="span">Checkbox</Button>
                </Link>
                <Link to="components/pagination">
                    <Button component="span">Pagination</Button>
                </Link>
            </div>
        </Page>
    )
}
