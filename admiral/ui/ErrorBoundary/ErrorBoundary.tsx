import React from 'react'

export interface ErrorBoundaryProps {
    fallback?: React.ReactNode | ((error: Error) => React.ReactNode)
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
    children?: React.ReactNode
}

interface ErrorBoundaryState {
    error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { error: null }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.props.onError?.(error, errorInfo)
    }

    render() {
        if (this.state.error) {
            const { fallback } = this.props
            if (typeof fallback === 'function') {
                return fallback(this.state.error)
            }
            return fallback ?? null
        }
        return this.props.children
    }
}
