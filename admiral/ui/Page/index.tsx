import React from 'react'

type PageProps = {
    title: string
    actions?: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children, title, actions }) => {
    return (
        <div className="page-wrapper">
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">{title}</h2>
                        </div>
                        <div className="col-auto ms-auto">
                            <div className="btn-list">{actions}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body">
                <div className="container-xl">{children}</div>
            </div>
        </div>
    )
}
