import React, { useCallback, useMemo } from 'react'
import omit from 'rc-util/lib/omit'
import cn from 'classnames'
import RcSelect, { Option, OptGroup, BaseSelectRef } from 'rc-select'
import type { BaseOptionType, DefaultOptionType } from 'rc-select/lib/Select'
import { SelectProps } from './interfaces'
import getIcons from './utils/getIcons'
import './Select.scss'
import { enUs } from './locales'

const prefixCls = 'select'
const defaultLocale = enUs

const InternalSelect = <OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
    {
        mode,
        borderless = false,
        alert = false,
        className,
        dropdownClassName,
        listHeight = 254,
        size = 'M',
        notFoundContent,
        style,
        virtual = true,
        dropdownMatchSelectWidth = true,
        maxTagCount,
        getPopupContainer: customizeGetPopupContainer,
        loading,
        locale,
        onChange,
        ...props
    }: SelectProps<OptionType>,
    ref: React.Ref<BaseSelectRef>,
) => {
    const selectLocale = { ...defaultLocale, ...locale }
    const getPopupContainer = useCallback(
        () => document.querySelector('#root > .Theme') as HTMLDivElement,
        [],
    )

    const isMultiple = mode === 'multiple' || mode === 'tags'
    const listItemHeight = (function calcListItemHeight() {
        if (size === 'L') return 48
        if (size === 'S') return 32
        if (size === 'XS') return 24
        return 40
    })()

    // ===================== Empty =====================
    let mergedNotFound: React.ReactNode = notFoundContent || selectLocale.notFound

    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
        loading,
        multiple: isMultiple,
        prefixCls,
    })

    const selectProps = omit(props as typeof props & { itemIcon: any }, ['itemIcon'])

    const mergedClassName = cn(
        {
            [`${prefixCls}__SizeL`]: size === 'L',
            [`${prefixCls}__SizeS`]: size === 'S',
            [`${prefixCls}__SizeXS`]: size === 'XS',
            [`${prefixCls}__Alert`]: alert,
            [`${prefixCls}__Borderless`]: borderless,
            [`${prefixCls}__MaxTag`]: typeof maxTagCount !== 'undefined',
        },
        className,
    )

    const getValue = (value?: OptionType | null | number) =>
        value || value === 0 ? (Number.isInteger(+value) ? +value : value) : undefined

    const value = selectProps.value
    const selectValue = useMemo(
        () => (value ? (isMultiple ? value.map(getValue) : getValue(value)) : undefined),
        [value],
    )

    const _onChange = useCallback((value, option) => {
        if (onChange) onChange(value ?? null, option)
    }, [])

    return (
        <RcSelect<any, any>
            ref={ref as any}
            virtual={virtual}
            style={style}
            dropdownMatchSelectWidth={dropdownMatchSelectWidth}
            maxTagCount={maxTagCount}
            onChange={_onChange}
            {...selectProps}
            value={selectValue}
            className={mergedClassName}
            animation="slide-up"
            listHeight={listHeight}
            listItemHeight={listItemHeight}
            mode={mode}
            prefixCls={prefixCls}
            inputIcon={suffixIcon}
            menuItemSelectedIcon={itemIcon}
            removeIcon={removeIcon}
            clearIcon={clearIcon}
            notFoundContent={mergedNotFound}
            getPopupContainer={customizeGetPopupContainer || getPopupContainer}
            dropdownClassName={cn(
                {
                    [`${prefixCls}-dropdown__SizeL`]: size === 'L',
                    [`${prefixCls}-dropdown__SizeS`]: size === 'S',
                    [`${prefixCls}-dropdown__SizeXS`]: size === 'XS',
                },
                dropdownClassName,
            )}
        />
    )
}

export const Select = React.forwardRef(InternalSelect) as unknown as (<
    ValueType = any,
    OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
    props: React.PropsWithChildren<SelectProps<ValueType, OptionType>> & {
        ref?: React.Ref<BaseSelectRef>
    },
) => React.ReactElement) & {
    Option: typeof Option
    OptGroup: typeof OptGroup
}

Select.Option = Option
Select.OptGroup = OptGroup
