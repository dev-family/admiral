import React, { useEffect, useRef } from 'react'
import { Form } from '../form'
import { QuickFilters } from './QuickFilters'
import { GetFiltersFormDataResult } from '../dataProvider'

interface Props {
    filters?: string[]
}

const QuickFiltersWrapper = ({ filters }: Props) => {
    const formRef = useRef<React.ElementRef<typeof Form>>(null)

    return (
        <Form ref={formRef}>
            <Form.Fields singleColumn>
                <QuickFilters filters={filters} />
            </Form.Fields>
        </Form>
    )
}

export default QuickFiltersWrapper
