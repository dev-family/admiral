import React, { useState } from 'react'
import { Page, Pagination } from '../../admiral'

export default function PaginationPage() {
    const [pagination, setPagination] = useState({ current: 3 })
    const onPaginationChange = (page: number) => {
        setPagination((prev) => ({ ...prev, current: page }))
    }

    return (
        <Page title="Pagination">
            <h3>• Default</h3>
            <br />
            <Pagination
                current={pagination.current}
                total={250}
                onChange={onPaginationChange}
                showTotal={(total) => `Total ${total} items`}
                showTitle={false}
            />
            <br />
            <h3>• Small</h3>
            <br />
            <Pagination
                current={pagination.current}
                total={25000}
                onChange={onPaginationChange}
                showTitle={false}
                size="small"
            />
            <br />
            <h3>• ShowQuickJumper</h3>
            <br />
            <Pagination
                locale="enUs"
                showQuickJumper
                current={pagination.current}
                total={25000}
                onChange={onPaginationChange}
                showTitle={false}
            />
            <br />
            <Pagination
                showQuickJumper
                current={pagination.current}
                total={25000}
                onChange={onPaginationChange}
                showTitle={false}
                size="small"
            />
            <br />
            <h3>• Simple</h3>
            <br />
            <Pagination
                simple
                current={pagination.current}
                total={25000}
                onChange={onPaginationChange}
                showTitle={false}
            />
            <br />
            <Pagination
                simple
                disabled
                current={pagination.current}
                total={25000}
                onChange={onPaginationChange}
                showTitle={false}
                size="small"
            />
        </Page>
    )
}
