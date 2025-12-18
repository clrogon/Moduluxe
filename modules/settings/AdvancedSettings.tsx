
import React from 'react';
import { useMockData } from '../../core/hooks/useMockData';
import { ArrowDownTrayIcon, TrashIcon, ExclamationCircleIcon } from '../../components/ui/icons/Icons';

const AdvancedSettings: React.FC = () => {
    const { seedDatabase, isDemoMode } = useMockData();

    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
                    <ExclamationCircleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Advanced Settings</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage database connections and data seeding. Proceed with caution.</p>
                </div>
            </div>

            <div className="p-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Data Seeding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {isDemoMode 
                            ? "You are currently in Demo Mode. Resetting will clear your local changes and revert to default sample data."
                            : "You are connected to a live database. Clicking this will populate your database with sample data (Properties, Users, Contracts). Useful for initial setup."}
                    </p>
                    
                    <button
                        onClick={seedDatabase}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                            isDemoMode 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isDemoMode ? (
                            <>
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Reset Demo Data
                            </>
                        ) : (
                            <>
                                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                                Seed Database with Defaults
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSettings;
