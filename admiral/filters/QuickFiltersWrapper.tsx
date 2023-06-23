import React, { useEffect, useRef } from 'react'
import { Form } from '../form'
import { QuickFilters } from './QuickFilters'
import { GetFiltersFormDataResult } from '../dataProvider'

const QuickFiltersWrapper = () => {
    const formRef = useRef<React.ElementRef<typeof Form>>(null)

    return (
        <Form ref={formRef}>
            <Form.Fields singleColumn>
                <QuickFilters />
            </Form.Fields>
        </Form>
    )
}

export default QuickFiltersWrapper
