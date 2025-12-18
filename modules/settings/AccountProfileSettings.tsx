
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { ExclamationCircleIcon } from '../../components/ui/icons/Icons';

interface AccountProfileSettingsProps {
    profile: UserProfile;
    onUpdateProfile: (profile: UserProfile) => void;
}

const AccountProfileSettings: React.FC<AccountProfileSettingsProps> = ({ profile, onUpdateProfile }) => {
    const [formData, setFormData] = useState<UserProfile>(profile);
    const [isSaved, setIsSaved] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'iban' || name === 'beneficiary') {
            setFormData(prev => ({
                ...prev,
                bankDetails: {
                    ...prev.bankDetails,
                    [name]: value
                }
            }));
            // Clear error when user types in bank fields
            if (validationError) setValidationError(null);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleServiceAreasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, serviceAreas: e.target.value.split(',').map(s => s.trim()) }));
    };

    const validateIBAN = (iban: string): boolean => {
        // Remove spaces and dots
        const cleanIban = iban.replace(/[\s.]/g, '').toUpperCase();
        
        if (cleanIban.length === 0) return true; // Allow empty if not using feature

        // Check for Angolan IBAN format: AO + 23 digits = 25 characters
        if (cleanIban.startsWith('AO')) {
            const digitPart = cleanIban.substring(2);
            return /^\d{23}$/.test(digitPart);
        }
        
        // Basic fallback for international: 15-34 alphanumerics
        return /^[A-Z0-9]{15,34}$/.test(cleanIban);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateIBAN(formData.bankDetails.iban)) {
            setValidationError('Invalid IBAN format. Angolan IBANs must start with AO followed by 23 digits.');
            return;
        }

        if (formData.bankDetails.iban && !formData.bankDetails.beneficiary) {
            setValidationError('Beneficiary Name is required when an IBAN is provided.');
            return;
        }

        onUpdateProfile(formData);
        setIsSaved(true);
        setValidationError(null);
        setTimeout(() => setIsSaved(false), 2000); // Hide message after 2s
    };
    
    const formInputClasses = "mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
    const formLabelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6 space-y-6">
                <div className="flex items-center space-x-5">
                    <img className="h-20 w-20 rounded-full" src={formData.profilePictureUrl} alt="Profile" />
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{t('settings.account.profilePicture')}</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('settings.account.profilePictureDesc')}</p>
                        <button type="button" className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            {t('common.change')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="fullName" className={formLabelClasses}>{t('users.form.name')}</label>
                        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className={formInputClasses} />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="professionalTitle" className={formLabelClasses}>{t('settings.account.professionalTitle')}</label>
                        <input type="text" name="professionalTitle" id="professionalTitle" value={formData.professionalTitle} onChange={handleChange} className={formInputClasses} />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="licenseNumber" className={formLabelClasses}>{t('settings.account.licenseNumber')}</label>
                        <input type="text" name="licenseNumber" id="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className={formInputClasses} />
                    </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="email" className={formLabelClasses}>{t('users.form.email')}</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={formInputClasses} />
                    </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="phone" className={formLabelClasses}>{t('users.form.phone')}</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={formInputClasses} />
                    </div>
                    
                    <div className="sm:col-span-6">
                        <label htmlFor="serviceAreas" className={formLabelClasses}>{t('settings.account.serviceAreas')}</label>
                        <input type="text" name="serviceAreas" id="serviceAreas" value={formData.serviceAreas.join(', ')} onChange={handleServiceAreasChange} className={formInputClasses} />
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="bio" className={formLabelClasses}>{t('settings.account.bio')}</label>
                        <textarea id="bio" name="bio" rows={4} value={formData.bio} onChange={handleChange} className={formInputClasses} />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t('settings.account.bioDesc')}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{t('settings.account.bankDetails')}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('settings.account.bankDetailsDesc')}</p>
                </div>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="iban" className={formLabelClasses}>IBAN</label>
                        <input 
                            type="text" 
                            name="iban" 
                            id="iban" 
                            value={formData.bankDetails.iban} 
                            onChange={handleChange} 
                            className={`${formInputClasses} ${validationError && !validateIBAN(formData.bankDetails.iban) ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="AO06..."
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="beneficiary" className={formLabelClasses}>{t('settings.account.beneficiary')}</label>
                        <input 
                            type="text" 
                            name="beneficiary" 
                            id="beneficiary" 
                            value={formData.bankDetails.beneficiary} 
                            onChange={handleChange} 
                            className={formInputClasses} 
                        />
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end items-center space-x-4">
                 {validationError && (
                     <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                         <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                         {validationError}
                     </div>
                 )}
                 {isSaved && <span className="text-sm font-medium text-green-600 dark:text-green-400">{t('settings.savedMessage')}</span>}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                    {t('settings.saveChanges')}
                </button>
            </div>
        </form>
    );
};

export default AccountProfileSettings;
