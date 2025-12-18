import React, { useState, useEffect } from 'react';
import { CRMSettings } from '../../shared/types/index';
import { UserGroupIcon } from '../../components/ui/icons/Icons';

interface CRMSettingsProps {
    settings: CRMSettings;
    onUpdateSettings: (settings: CRMSettings) => void;
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

const CRMSettingsComponent: React.FC<CRMSettingsProps> = ({ settings, onUpdateSettings }) => {
    const [formData, setFormData] = useState<CRMSettings>(settings);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as any }));
    };
    
    const handleToggleChange = (key: keyof CRMSettings, value: boolean) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateSettings(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-lg">
                    <UserGroupIcon className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">CRM & Client Management</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure client relationship workflows and automations.</p>
                </div>
            </div>
            
            <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lead Management</h4>
                <div>
                    <label htmlFor="defaultLeadStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Lead Status</label>
                    <select id="defaultLeadStatus" name="defaultLeadStatus" value={formData.defaultLeadStatus} onChange={handleChange} className="mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                        <option>Unqualified</option>
                    </select>
                </div>
            </div>

            <div className="p-6 space-y-6">
                 <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Communication</h4>
                 <ToggleSwitch 
                    label="Auto-Reply to New Inquiries"
                    description="Automatically send a welcome email to new leads."
                    enabled={formData.autoReplyNewInquiries}
                    onChange={(val) => handleToggleChange('autoReplyNewInquiries', val)}
                 />
                 <div>
                    <label htmlFor="emailSignature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Email Signature</label>
                    <textarea 
                        id="emailSignature" 
                        name="emailSignature" 
                        rows={4}
                        value={formData.emailSignature} 
                        onChange={handleChange} 
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                 </div>
            </div>

            <div className="p-6 space-y-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Task Automation</h4>
                <ToggleSwitch 
                    label="Create Task on New Lead"
                    description="Automatically create a 'Follow Up' task when a new lead is added."
                    enabled={formData.createTaskOnNewLead}
                    onChange={(val) => handleToggleChange('createTaskOnNewLead', val)}
                />
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">Settings saved!</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    Save CRM Settings
                </button>
            </div>
        </form>
    );
};

export default CRMSettingsComponent;
