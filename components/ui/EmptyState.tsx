import React from 'react';

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message }) => {
    return (
        <div className="text-center py-12 px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <div className="h-6 w-6 text-gray-400 dark:text-gray-500">
                    {icon}
                </div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
    );
};

export default EmptyState;