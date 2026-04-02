import React from 'react';
export interface ErrorBoundaryProps {
    fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    children?: React.ReactNode;
}
interface ErrorBoundaryState {
    error: Error | null;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState;
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): React.ReactNode;
}
export {};
