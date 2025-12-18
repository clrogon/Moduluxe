
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ExclamationCircleIcon } from '../../components/ui/icons/Icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // In a real app, log to Sentry/LogRocket here
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-red-100 dark:border-red-900/30">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
            <ExclamationCircleIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            We encountered an unexpected error in this module.
          </p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-lg overflow-auto mb-6 text-left">
             <code className="text-xs text-red-600 dark:text-red-400 font-mono">
                {this.state.error?.toString()}
             </code>
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
