import React from 'react'
import { Select } from '../Select'
import type { SelectProps } from '../Select/interfaces'

interface MiniOrMiddleSelectInterface extends React.FC<SelectProps> {
    Option: typeof Select.Option
}

export const MiddleSelect: MiniOrMiddleSelectInterface = (props) => <Select {...props} size="S" />
export const MiniSelect: MiniOrMiddleSelectInterface = (props) => <Select {...props} size="XS" />

MiniSelect.Option = Select.Option
MiddleSelect.Option = Select.Option
