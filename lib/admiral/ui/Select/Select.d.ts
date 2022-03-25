import React from 'react'
import { Option, OptGroup, BaseSelectRef } from 'rc-select'
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select'
import { SelectProps } from './interfaces'
import './Select.scss'
export declare const Select: (<
    ValueType = any,
    OptionType extends DefaultOptionType | BaseOptionType = DefaultOptionType,
>(
    props: SelectProps<ValueType, OptionType> & {
        children?: React.ReactNode
    } & {
        ref?: React.Ref<BaseSelectRef> | undefined
    },
) => React.ReactElement) & {
    Option: typeof Option
    OptGroup: typeof OptGroup
}
