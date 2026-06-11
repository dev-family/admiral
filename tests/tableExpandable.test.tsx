import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table } from '../admiral/ui/Table'

describe('Table expandable', () => {
    test('forwards the expandable config to rc-table', () => {
        render(
            <Table
                rowKey="id"
                dataSource={[{ id: 1, name: 'Alpha' }]}
                columns={[{ title: 'Name', dataIndex: 'name', key: 'name' }]}
                expandable={{
                    defaultExpandedRowKeys: [1],
                    expandedRowRender: (record) => <div>expanded {record.name}</div>,
                }}
            />,
        )

        expect(screen.getByText('expanded Alpha')).toBeTruthy()
    })
})
