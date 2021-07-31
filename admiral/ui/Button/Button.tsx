import React from 'react'
import cln from 'classnames'

type ButtonProps = {
    isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false }) => {
    return (
        <button className={cln('btn', 'btn-primary', { 'btn-loading': isLoading })}>
            {children}
        </button>
    )
}
