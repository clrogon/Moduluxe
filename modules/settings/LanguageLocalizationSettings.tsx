
import React, { useState, useEffect } from 'react';
import { LocalizationPreferences } from '../../shared/types/index';
import { GlobeAltIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface LanguageLocalizationSettingsProps {
    preferences: LocalizationPreferences;
    onUpdatePreferences: (preferences: LocalizationPreferences) => void;
}

const SelectInput: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
}> = ({ label, name, value, onChange, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            {children}
        </select>
    </div>
);


const LanguageLocalizationSettings: React.FC<LanguageLocalizationSettingsProps> = ({ preferences, onUpdatePreferences }) => {
    const [formData, setFormData] = useState<LocalizationPreferences>(preferences);
    const [region, setRegion] = useState<string>('Custom');
    const [isSaved, setIsSaved] = useState(false);
    const { setLanguage, t } = useTranslation();

    useEffect(() => {
        setFormData(preferences);
        
        // Strict heuristic to detect if a preset matches
        const isAngola = 
            preferences.language === 'pt-AO' && 
            preferences.currency === 'AOA' && 
            preferences.timezone === 'Africa/Luanda' &&
            preferences.dateFormat === 'DD/MM/YYYY' &&
            preferences.timeFormat === '24-hour' &&
            preferences.measurementUnits === 'Square Meters';

        const isUS = 
            preferences.language === 'en-US' && 
            preferences.currency === 'USD' &&
            preferences.timezone === 'America/New_York';

        if (isAngola) {
            setRegion('Angola');
        } else if (isUS) {
            setRegion('United States');
        } else {
            setRegion('Custom');
        }
    }, [preferences]);

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRegion = e.target.value;
        setRegion(selectedRegion);

        let newPrefs: Partial<LocalizationPreferences> = {};

        switch (selectedRegion) {
            case 'Angola':
                newPrefs = {
                    language: 'pt-AO',
                    currency: 'AOA',
                    dateFormat: 'DD/MM/YYYY',
                    timeFormat: '24-hour',
                    timezone: 'Africa/Luanda',
                    measurementUnits: 'Square Meters'
                };
                break;
            case 'United States':
                newPrefs = {
                    language: 'en-US',
                    currency: 'USD',
                    dateFormat: 'MM/DD/YYYY',
                    timeFormat: '12-hour',
                    timezone: 'America/New_York',
                    measurementUnits: 'Square Feet'
                };
                break;
            default:
                return; // Keep current if Custom or unknown
        }

        if (Object.keys(newPrefs).length > 0) {
            setFormData(prev => ({ ...prev, ...newPrefs }));
            if (newPrefs.language) {
                setLanguage(newPrefs.language);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegion('Custom'); // Switch to custom if user manually tweaks a setting
        
        if (name === 'language') {
            setLanguage(value as LocalizationPreferences['language']);
        }

        setFormData(prev => ({ ...prev, [name]: value as any }));
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
                <div className="bg-cyan-100 dark:bg-cyan-900/50 p-3 rounded-lg">
                    <GlobeAltIcon className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">{t('settings.language.title')}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('settings.language.description')}</p>
                </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                
                <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                    <SelectInput label="Region Preset" name="region" value={region} onChange={handleRegionChange}>
                        <option value="Custom">Custom</option>
                        <option value="Angola">Angola</option>
                        <option value="United States">United States</option>
                    </SelectInput>
                    
                    {region === 'Angola' && (
                        <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center">
                            <span className="mr-1">🇦🇴</span> Configured for Angola: Português (AO), Kwanza (AOA), Luanda Time (WAT), 24h & m².
                        </p>
                    )}
                    {region === 'Custom' && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Manually configure your regional preferences below.
                        </p>
                    )}
                </div>

                <SelectInput label={t('settings.language.displayLanguage')} name="language" value={formData.language} onChange={handleChange}>
                    <option value="pt-AO">Português (Angola)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-MX">Español (México)</option>
                </SelectInput>

                <SelectInput label={t('settings.language.currency')} name="currency" value={formData.currency} onChange={handleChange}>
                    <option value="AOA">AOA (Kwanza)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="BRL">BRL (R$)</option>
                </SelectInput>
                
                <SelectInput label={t('settings.language.dateFormat')} name="dateFormat" value={formData.dateFormat} onChange={handleChange}>
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                </SelectInput>

                <SelectInput label={t('settings.language.timeFormat')} name="timeFormat" value={formData.timeFormat} onChange={handleChange}>
                    <option>24-hour</option>
                    <option>12-hour</option>
                </SelectInput>

                <SelectInput label={t('settings.language.timezone')} name="timezone" value={formData.timezone} onChange={handleChange}>
                    <option value="Africa/Luanda">West Africa Time (WAT)</option>
                    <option value="Europe/Lisbon">Western European Time (WET)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                </SelectInput>
                
                <SelectInput label={t('settings.language.measurementUnits')} name="measurementUnits" value={formData.measurementUnits} onChange={handleChange}>
                    <option>Square Meters</option>
                    <option>Square Feet</option>
                </SelectInput>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">{t('settings.savedMessage')}</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    {t('settings.saveChanges')}
                </button>
            </div>
        </form>
    );
};

export default LanguageLocalizationSettings;
