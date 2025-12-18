import React, { useState, useEffect } from 'react';
import { PropertyListingDefaults } from '../../shared/types/index';
import { ClipboardDocumentListIcon } from '../../components/ui/icons/Icons';

interface PropertyListingDefaultsSettingsProps {
    defaults: PropertyListingDefaults;
    onUpdateDefaults: (defaults: PropertyListingDefaults) => void;
}

const ToggleSwitch: React.FC<{
    label: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}> = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>
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

const PropertyListingDefaultsSettings: React.FC<PropertyListingDefaultsSettingsProps> = ({ defaults, onUpdateDefaults }) => {
    const [formData, setFormData] = useState<PropertyListingDefaults>(defaults);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(defaults);
    }, [defaults]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value as any }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateDefaults(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 flex items-start space-x-4">
                <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg">
                    <ClipboardDocumentListIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Property Listing Defaults</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Streamline new listing creation by setting default values.</p>
                </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                <div>
                    <label htmlFor="listingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Listing Type</label>
                    <select id="listingType" name="listingType" value={formData.listingType} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="listingDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Listing Duration (days)</label>
                     <select id="listingDuration" name="listingDuration" value={formData.listingDuration} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option value={90}>90 days</option>
                        <option value={180}>180 days</option>
                        <option value={365}>365 days</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Commission Rate (%)</label>
                    <input type="number" name="commissionRate" id="commissionRate" value={formData.commissionRate} onChange={handleChange} step="0.1" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>

            <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Media Requirements</h4>
                 <ToggleSwitch label="Require Virtual Tour" enabled={formData.requireVirtualTour} onChange={(val) => setFormData(p => ({...p, requireVirtualTour: val}))} />
                 <ToggleSwitch label="Require Floor Plan" enabled={formData.requireFloorPlan} onChange={(val) => setFormData(p => ({...p, requireFloorPlan: val}))} />
            </div>

             <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Syndication</h4>
                 <ToggleSwitch label="Auto-publish to MLS" enabled={formData.syndicateToMLS} onChange={(val) => setFormData(p => ({...p, syndicateToMLS: val}))} />
                 <ToggleSwitch label="Auto-publish to Zillow" enabled={formData.syndicateToZillow} onChange={(val) => setFormData(p => ({...p, syndicateToZillow: val}))} />
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">Defaults saved!</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    Save Defaults
                </button>
            </div>
        </form>
    );
};

export default PropertyListingDefaultsSettings;