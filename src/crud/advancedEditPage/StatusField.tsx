import { Select, useDataProvider } from '../../../admiral'
import React, { useCallback, useState } from 'react'

const StatusField: React.FC<{ resource: string; value?: boolean; id: number }> = ({
    resource,
    value,
    id,
}) => {
    const { update } = useDataProvider()
    const [active, setActive] = useState(value ?? false)

    const updateData = useCallback((values) => {
        return update(resource, { data: values, id })
    }, [])

    const onChange = (value: boolean) => {
        const prevValue = active
        setActive(value)
        updateData({ active: value }).catch(() => setActive(prevValue))
    }

    return (
        <Select size="S" value={active} onChange={onChange}>
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
        </Select>
    )
}

export default StatusField
