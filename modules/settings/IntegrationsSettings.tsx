import React from 'react';
import { Integration, IntegrationStatus } from '../../shared/types/index';
import { PuzzlePieceIcon } from '../../components/ui/icons/Icons';

interface IntegrationsSettingsProps {
    integrations: Integration[];
    onConnect: (id: string) => void;
    onDisconnect: (id: string) => void;
}

const StatusIndicator: React.FC<{ status: IntegrationStatus }> = ({ status }) => {
    const baseClasses = "flex items-center text-xs font-medium";
    const statusInfo = {
        Active: {
            classes: "text-green-700 dark:text-green-400",
            dot: "bg-green-500",
            text: "Active"
        },
        Disconnected: {
            classes: "text-gray-500 dark:text-gray-400",
            dot: "bg-gray-400",
            text: "Disconnected"
        },
        Error: {
            classes: "text-red-700 dark:text-red-400",
            dot: "bg-red-500",
            text: "Error"
        }
    };
    const current = statusInfo[status];
    return (
        <div className={`${baseClasses} ${current.classes}`}>
            <span className={`h-2 w-2 rounded-full mr-2 ${current.dot}`}></span>
            {current.text}
        </div>
    );
};


const IntegrationsSettings: React.FC<IntegrationsSettingsProps> = ({ integrations, onConnect, onDisconnect }) => {
    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                    <PuzzlePieceIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Integrations & Connected Services</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Connect third-party services to streamline your workflow.</p>
                </div>
            </div>
            
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrations.map(integration => (
                        <div key={integration.id} className="bg-white dark:bg-gray-800/50 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-start space-x-4">
                                    <img src={integration.logoUrl} alt={`${integration.name} logo`} className="h-12 w-12 object-contain" />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{integration.name}</h4>
                                        <StatusIndicator status={integration.status} />
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 min-h-[60px]">{integration.description}</p>
                                {integration.status === 'Active' && integration.connectedSince && (
                                     <p className="mt-2 text-xs text-gray-400">Connected since: {integration.connectedSince}</p>
                                )}
                            </div>
                            <div className="mt-5 flex justify-end">
                                {integration.status === 'Disconnected' ? (
                                    <button 
                                        onClick={() => onConnect(integration.id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
                                    >
                                        Connect
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onDisconnect(integration.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
                                    >
                                        Disconnect
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IntegrationsSettings;