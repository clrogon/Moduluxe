import React, { useState } from 'react';
import { useMockData } from '../../core/hooks/useMockData';
import { PersistenceStrategyRegistry } from '../../core/domain/persistence/PersistenceStrategyRegistry';
import { ArrowDownTrayIcon, TrashIcon, ExclamationCircleIcon, CheckCircleIcon } from '../../components/ui/icons/Icons';
import { useToast } from '../../core/context/ToastContext';

const AdvancedSettings: React.FC = () => {
    const { seedDatabase, isDemoMode, rehydrateActiveStrategy } = useMockData();
    const { showToast } = useToast();
    
    const registry = PersistenceStrategyRegistry.getInstance();
    const strategies = registry.getAllStrategies();
    const [activeStrategyId, setActiveStrategyId] = useState(registry.getActiveStrategy().id);

    const handleStrategyChange = async (strategyId: string) => {
        registry.setActiveStrategy(strategyId);
        setActiveStrategyId(strategyId);
        
        // Instantly reload active collection stores from the newly selected Strategy
        await rehydrateActiveStrategy();
        showToast('success', `Active database strategy swapped to: ${registry.getActiveStrategy().name}`);
    };

    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                    <ExclamationCircleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Advanced settings</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Administer persistence strategies, manage database connection contracts, or seed initial demo records safely.
                    </p>
                </div>
            </div>

            {/* Strategy Selection Segment */}
            <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Active Database Strategy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Swap the application's domain persistence engine. Changes take effect immediately.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {strategies.map((strat) => {
                        const isSelected = activeStrategyId === strat.id;
                        return (
                            <button
                                key={strat.id}
                                onClick={() => handleStrategyChange(strat.id)}
                                className={`text-left p-5 rounded-xl border-2 transition-all flex flex-col justify-between h-full relative ${
                                    isSelected
                                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                {isSelected && (
                                    <div className="absolute top-4 right-4 text-blue-600 dark:text-blue-400">
                                        <CheckCircleIcon className="h-6 w-6" />
                                    </div>
                                )}
                                <div>
                                    <h5 className="font-bold text-gray-900 dark:text-gray-50 text-base flex items-center pr-8">
                                        {strat.name}
                                    </h5>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                                        {strat.description}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        isSelected 
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' 
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                    }`}>
                                        {isSelected ? 'Active connection' : 'Select Strategy'}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Seed Actions Segment */}
            <div className="p-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Seed default sandbox parameters</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Re-creates initial mock parameters (properties, contracts, clients) on your active database stream.
                    </p>
                    
                    <button
                        onClick={seedDatabase}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors`}
                    >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                        Seed current DB strategy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSettings;
