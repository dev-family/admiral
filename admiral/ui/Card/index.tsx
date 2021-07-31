import cln from 'classnames'
import React from 'react'

export const Card: React.FC = ({ children }) => {
    return <div className="card">{children}</div>
}

export const CardHeader: React.FC = ({ children }) => {
    return <div className="card-header">{children}</div>
}

export const CardBody: React.FC = ({ children }) => {
    return <div className="card-body">{children}</div>
}

type CardFooterProps = {
    className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
    return <div className={cln('card-footer', className)}>{children}</div>
}
