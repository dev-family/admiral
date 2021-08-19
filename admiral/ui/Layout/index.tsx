import React from 'react'

export const Layout: React.FC = ({ children }) => {
    return (
        <div className="wrapper" style={{ background: 'var(--color-bg-default)', height: '100vh' }}>
            {children}
        </div>
    )
}
