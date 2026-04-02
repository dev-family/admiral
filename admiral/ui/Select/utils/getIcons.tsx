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
    const clearIcon = <AiFillCloseCircle />

    // Arrow item icon
    const suffixCls = `${prefixCls}-suffix`
    const spinCls = `${prefixCls}-spin`
    const suffixIcon = loading ? (
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
    const itemIcon = multiple ? <FiCheck /> : null

    // Remove icon
    const removeIcon = <FiX />

    return {
        clearIcon,
        suffixIcon,
        itemIcon,
        removeIcon,
    }
}
