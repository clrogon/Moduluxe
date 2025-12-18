
import React, { useState, useEffect } from 'react';
import { AppearancePreferences } from '../../shared/types/index';
import { PaintBrushIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface AppearanceDisplaySettingsProps {
    preferences: AppearancePreferences;
    onUpdatePreferences: (preferences: AppearancePreferences) => void;
}

const RadioGroup: React.FC<{
    label: string;
    options: string[];
    selectedValue: string;
    onChange: (value: string) => void;
}> = ({ label, options, selectedValue, onChange }) => (
    <div>
        <h5 className="font-medium text-gray-800 dark:text-gray-200">{label}</h5>
        <div className="mt-2 flex flex-wrap gap-2">
            {options.map(option => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all border ${
                        selectedValue === option 
                        ? 'bg-blue-600 text-white border-blue-600 shadow' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

const AppearanceDisplaySettings: React.FC<AppearanceDisplaySettingsProps> = ({ preferences, onUpdatePreferences }) => {
    const [formData, setFormData] = useState<AppearancePreferences>(preferences);
    const [isSaved, setIsSaved] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        setFormData(preferences);
    }, [preferences]);

    const handleRadioChange = (key: keyof AppearancePreferences, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
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
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                    <PaintBrushIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Appearance & Display</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Customize the look and feel of your workspace.</p>
                </div>
            </div>
            
            <div className="p-6 space-y-8">
                <RadioGroup 
                    label="Theme Mode"
                    options={['Light', 'Dark', 'Auto']}
                    selectedValue={formData.theme}
                    onChange={(val) => handleRadioChange('theme', val)}
                />

                <div>
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Color Theme</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: 'Nzila Ember', color: '#F97316' },
                            { name: 'Zen Path', color: '#577365' },
                            { name: 'Urban Traverse', color: '#18181B' },
                            { name: 'Nzila Harmony', color: '#0EA5E9' }
                        ].map((theme) => (
                            <button
                                key={theme.name}
                                type="button"
                                onClick={() => handleRadioChange('colorTheme', theme.name)}
                                className={`relative flex items-center p-3 rounded-lg border-2 transition-all ${
                                    formData.colorTheme === theme.name
                                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                                }`}
                            >
                                <span className="h-6 w-6 rounded-full mr-3 shadow-sm" style={{ backgroundColor: theme.color }}></span>
                                <span className={`font-medium ${formData.colorTheme === theme.name ? 'text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {t(`settings.appearance.themes.${theme.name.toLowerCase().replace(/ /g, '_')}`) || theme.name}
                                </span>
                                {formData.colorTheme === theme.name && (
                                    <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-blue-600"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <RadioGroup 
                    label="Density"
                    options={['Comfortable', 'Compact']}
                    selectedValue={formData.density}
                    onChange={(val) => handleRadioChange('density', val)}
                />

                <RadioGroup 
                    label="Font Size"
                    options={['Small', 'Medium', 'Large']}
                    selectedValue={formData.fontSize}
                    onChange={(val) => handleRadioChange('fontSize', val)}
                />
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">Preferences saved!</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default AppearanceDisplaySettings;
