import React, { useState, useEffect } from 'react';
import { NotificationPreferences } from '../../shared/types/index';
import { BellAlertIcon } from '../../components/ui/icons/Icons';

interface NotificationSettingsProps {
    preferences: NotificationPreferences;
    onUpdatePreferences: (preferences: NotificationPreferences) => void;
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
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
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


const NotificationSettings: React.FC<NotificationSettingsProps> = ({ preferences, onUpdatePreferences }) => {
    const [formData, setFormData] = useState<NotificationPreferences>(preferences);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(preferences);
    }, [preferences]);
    
    const handleToggleChange = (category: 'email' | 'sms', key: string, value: boolean) => {
        setFormData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const handleQuietHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            quietHours: {
                ...prev.quietHours,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdatePreferences(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                 <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg">
                    <BellAlertIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage how you receive alerts about leads, transactions, and messages.</p>
                </div>
            </div>
            
            {/* Email Notifications */}
            <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email Notifications</h4>
                <ToggleSwitch 
                    label="New Lead Inquiry"
                    description="Get an email when a new lead comes in."
                    enabled={formData.email.newLead}
                    onChange={(val) => handleToggleChange('email', 'newLead', val)}
                />
                <ToggleSwitch 
                    label="Showing Request"
                    description="Receive an email when a client requests a showing."
                    enabled={formData.email.showingRequest}
                    onChange={(val) => handleToggleChange('email', 'showingRequest', val)}
                />
                <ToggleSwitch 
                    label="Offer Submitted"
                    description="Instant notification for new offers on your listings."
                    enabled={formData.email.offerSubmitted}
                    onChange={(val) => handleToggleChange('email', 'offerSubmitted', val)}
                />
                 <ToggleSwitch 
                    label="Document Signed"
                    description="Get notified when a client signs a document."
                    enabled={formData.email.documentSigned}
                    onChange={(val) => handleToggleChange('email', 'documentSigned', val)}
                />
            </div>
            
            {/* SMS Notifications */}
            <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">SMS Notifications</h4>
                 <ToggleSwitch 
                    label="Urgent: Offer Received"
                    description="Receive a text for time-sensitive offers."
                    enabled={formData.sms.urgentOffer}
                    onChange={(val) => handleToggleChange('sms', 'urgentOffer', val)}
                />
                 <ToggleSwitch 
                    label="Urgent: Showing Confirmed/Cancelled"
                    description="Get text alerts for last-minute showing changes."
                    enabled={formData.sms.showingConfirmed}
                    onChange={(val) => handleToggleChange('sms', 'showingConfirmed', val)}
                />
            </div>

            {/* Delivery Preferences */}
            <div className="p-6 space-y-4">
                 <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Delivery Preferences</h4>
                 <div className="flex items-center justify-between">
                    <div>
                        <h5 className="font-medium text-gray-800 dark:text-gray-200">Quiet Hours</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pause non-urgent notifications during these times.</p>
                    </div>
                     <label className="flex items-center cursor-pointer">
                        <input type="checkbox" name="enabled" checked={formData.quietHours.enabled} onChange={handleQuietHoursChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                 </div>
                 {formData.quietHours.enabled && (
                    <div className="flex items-center space-x-4">
                        <input type="time" name="start" value={formData.quietHours.start} onChange={handleQuietHoursChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        <span className="dark:text-gray-300">to</span>
                        <input type="time" name="end" value={formData.quietHours.end} onChange={handleQuietHoursChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                 )}
            </div>


            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">Preferences saved successfully!</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default NotificationSettings;