import React from 'react'
import { Page, Button } from '../../admiral'
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
                <Link to="components/switch">
                    <Button component="span">Switch</Button>
                </Link>
                <Link to="components/textarea">
                    <Button component="span">Textarea</Button>
                </Link>
                <Link to="components/datepicker">
                    <Button component="span">DatePicker</Button>
                </Link>
                <Link to="components/upload">
                    <Button component="span">Upload</Button>
                </Link>
                <Link to="components/card">
                    <Button component="span">Card</Button>
                </Link>
            </div>
        </Page>
    )
}
