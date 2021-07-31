import React, { useCallback } from 'react'

type FormProps = {
    onSubmit?: () => void
}

const noop = () => {}

export const Form: React.FC<FormProps> = ({ children, onSubmit = noop }) => {
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()

            onSubmit()
        },
        [onSubmit],
    )

    return <form onSubmit={handleSubmit}>{children}</form>
}
