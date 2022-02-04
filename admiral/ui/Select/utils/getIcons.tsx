import React from 'react'
import { FiChevronDown, FiX, FiLoader, FiSearch, FiCheck } from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function getIcons({
    loading,
    multiple,
    prefixCls,
}: {
    loading?: boolean
    multiple?: boolean
    prefixCls: string
}) {
    // Clear Icon
    let clearIcon = <AiFillCloseCircle />

    // Arrow item icon
    const suffixCls = `${prefixCls}-suffix`
    const spinCls = `${prefixCls}-spin`
    let suffixIcon = loading ? (
        <FiLoader className={spinCls} />
    ) : (
        ({ open, showSearch }: { open: boolean; showSearch: boolean }) => {
            if (open && showSearch) {
                return <FiSearch className={suffixCls} />
            }
            return <FiChevronDown className={suffixCls} />
        }
    )

    // Checked item icon
    let itemIcon = multiple ? <FiCheck /> : null

    // Remove icon
    let removeIcon = <FiX />

    return {
        clearIcon,
        suffixIcon,
        itemIcon,
        removeIcon,
    }
}
