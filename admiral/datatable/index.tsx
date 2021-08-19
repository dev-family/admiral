import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardFooter, Paginator } from '@/admiral/ui'

export type DataTableProps = {
    url: string
    options: {
        label: string
        dataKey?: string
        render?: (item: any) => React.ReactNode
        align?: 'left' | 'right'
    }[]
}

export const DataTable: React.FC<DataTableProps> = ({ url, options }) => {
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({ page: 1, totalPages: 10 })

    async function fetch(url: string, page: number) {
        const response = await axios.get(url, { params: { page } })

        setData(response.data.data)
        setPagination((pagination) => ({ ...pagination, totalPages: response.data.last_page }))
    }

    useEffect(() => {
        fetch(url, pagination.page)
    }, [url, pagination.page])

    return (
        <Card>
            <table className="table card-table table-vcenter text-nowrap datatable">
                <thead>
                    <tr>
                        {options.map(({ label, align = 'left' }) => (
                            <th style={{ textAlign: align }}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            {options.map(({ dataKey, render, align = 'left' }) => (
                                <td style={{ textAlign: align }}>
                                    {render ? render(item) : dataKey ? item[dataKey] : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <CardFooter className="d-flex align-items-end">
                <Paginator
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onChange={(page) => setPagination((pagination) => ({ ...pagination, page }))}
                />
            </CardFooter>
        </Card>
    )
}
