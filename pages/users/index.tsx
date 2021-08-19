import { DataTable } from '@/admiral/datatable'
import { Page } from '@/admiral/ui'
import { Link } from 'react-router-dom'
import React from 'react'

export default () => {
    return (
        <Page
            title="Users"
            actions={
                <Link className="btn" to="users/create">
                    New User
                </Link>
            }
        >
            <DataTable
                url="http://localhost/api/users"
                options={[
                    {
                        label: '#',
                        dataKey: 'id',
                    },
                    {
                        label: 'Name',
                        dataKey: 'name',
                    },
                    {
                        label: 'Email',
                        dataKey: 'email',
                    },
                    {
                        label: 'Actions',
                        align: 'right',
                        render({ id }) {
                            return (
                                <Link className="btn btn-primary btn-sm" to={`users/${id}`}>
                                    Edit
                                </Link>
                            )
                        },
                    },
                ]}
            />
        </Page>
    )
}
