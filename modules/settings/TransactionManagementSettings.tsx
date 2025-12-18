import React, { useState, useEffect } from 'react';
import { TransactionManagementSettings } from '../../shared/types/index';
import { FolderCheckIcon } from '../../components/ui/icons/Icons';

interface TransactionManagementSettingsProps {
    settings: TransactionManagementSettings;
    onUpdateSettings: (settings: TransactionManagementSettings) => void;
}

const ToggleSwitch: React.FC<{
    label: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}> = ({ label, description, enabled, onChange }) => (
    <div className="flex items-center justify-between">
        <div>
            <h5 className="font-medium text-gray-800 dark:text-gray-200">{label}</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
        >
            <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    </div>
);

const TransactionManagementSettingsComponent: React.FC<TransactionManagementSettingsProps> = ({ settings, onUpdateSettings }) => {
    const [formData, setFormData] = useState<TransactionManagementSettings>(settings);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateSettings(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-lg">
                    <FolderCheckIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Transaction Management</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure deal workflow and compliance.</p>
                </div>
            </div>
            
            <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Transaction Stages</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize the stages of your deal pipeline. (Editing is a future feature).</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {formData.pipelineStages.map(stage => (
                        <span key={stage} className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                            {stage}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-6 space-y-6">
                 <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Compliance</h4>
                 <ToggleSwitch 
                    label="Require Broker Approval"
                    description="Flag transactions that require broker approval before proceeding."
                    enabled={formData.requireBrokerApproval}
                    onChange={(val) => setFormData(prev => ({...prev, requireBrokerApproval: val}))}
                 />
                 <div>
                    <label htmlFor="alertBeforeDeadlineDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contingency Deadline Alerts</label>
                    <select 
                        id="alertBeforeDeadlineDays" 
                        name="alertBeforeDeadlineDays" 
                        value={formData.alertBeforeDeadlineDays} 
                        onChange={(e) => setFormData(p => ({...p, alertBeforeDeadlineDays: parseInt(e.target.value) as 3|5|7}))}
                        className="mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option value={3}>3 days before</option>
                        <option value={5}>5 days before</option>
                        <option value={7}>7 days before</option>
                    </select>
                 </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">Settings saved!</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    Save Transaction Settings
                </button>
            </div>
        </form>
    );
};

export default TransactionManagementSettingsComponent;
