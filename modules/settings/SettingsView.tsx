import React, { useState } from 'react';
import { CogIcon } from '../../components/ui/icons/Icons';
import { AppSetting, SettingCategory, UserProfile, NotificationPreferences, AppearancePreferences, LocalizationPreferences, PropertyListingDefaults, CRMSettings, TransactionManagementSettings, Subscription, PaymentMethod, BillingInvoice, Integration } from '../../shared/types/index';
import AccountProfileSettings from './AccountProfileSettings';
import PrivacySecuritySettings from './PrivacySecuritySettings';
import NotificationSettings from './NotificationSettings';
import AppearanceDisplaySettings from './AppearanceDisplaySettings';
import LanguageLocalizationSettings from './LanguageLocalizationSettings';
import PropertyListingDefaultsSettings from './PropertyListingDefaultsSettings';
import CRMSettingsComponent from './CRMSettings';
import TransactionManagementSettingsComponent from './TransactionManagementSettings';
import BillingPaymentsSettings from './BillingPaymentsSettings';
import IntegrationsSettings from './IntegrationsSettings';
import WIPBanner from '../../components/ui/WIPBanner';
import { useTranslation } from '../../core/i18n/LanguageContext';


interface SettingsViewProps {
  settings: AppSetting[];
  onAddSetting: (setting: AppSetting) => void;
  onUpdateSetting: (setting: AppSetting) => void;
  onDeleteSetting: (id: string) => void;
  userProfile: UserProfile;
  onUpdateUserProfile: (profile: UserProfile) => void;
  notificationPreferences: NotificationPreferences;
  onUpdateNotificationPreferences: (prefs: NotificationPreferences) => void;
  appearancePreferences: AppearancePreferences;
  onUpdateAppearancePreferences: (prefs: AppearancePreferences) => void;
  localizationPreferences: LocalizationPreferences;
  onUpdateLocalizationPreferences: (prefs: LocalizationPreferences) => void;
  propertyListingDefaults: PropertyListingDefaults;
  onUpdatePropertyListingDefaults: (defaults: PropertyListingDefaults) => void;
  crmSettings: CRMSettings;
  onUpdateCrmSettings: (settings: CRMSettings) => void;
  transactionManagementSettings: TransactionManagementSettings;
  onUpdateTransactionManagementSettings: (settings: TransactionManagementSettings) => void;
  subscription: Subscription;
  paymentMethods: PaymentMethod[];
  billingInvoices: BillingInvoice[];
  integrations: Integration[];
  onConnectIntegration: (id: string) => void;
  onDisconnectIntegration: (id: string) => void;
}


const SettingsView: React.FC<SettingsViewProps> = (props) => {
  const [activeTab, setActiveTab] = useState<SettingCategory>('Account & Profile');
  const { t } = useTranslation();
  
  const categories: SettingCategory[] = [
    'Account & Profile', 
    'Privacy & Security', 
    'Notifications', 
    'Appearance & Display', 
    'Language & Localization',
    'Property Listing Defaults',
    'CRM & Client Management',
    'Transaction Management',
    'Billing & Payments',
    'Integrations',
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Account & Profile':
        return <AccountProfileSettings profile={props.userProfile} onUpdateProfile={props.onUpdateUserProfile} />;
      case 'Privacy & Security':
        return <PrivacySecuritySettings />;
      case 'Notifications':
        return <NotificationSettings preferences={props.notificationPreferences} onUpdatePreferences={props.onUpdateNotificationPreferences} />;
      case 'Appearance & Display':
        return <AppearanceDisplaySettings preferences={props.appearancePreferences} onUpdatePreferences={props.onUpdateAppearancePreferences} />;
      case 'Language & Localization':
        return <LanguageLocalizationSettings preferences={props.localizationPreferences} onUpdatePreferences={props.onUpdateLocalizationPreferences} />;
      case 'Property Listing Defaults':
        return <PropertyListingDefaultsSettings defaults={props.propertyListingDefaults} onUpdateDefaults={props.onUpdatePropertyListingDefaults} />;
      case 'CRM & Client Management':
        return <CRMSettingsComponent settings={props.crmSettings} onUpdateSettings={props.onUpdateCrmSettings} />;
      case 'Transaction Management':
        return <TransactionManagementSettingsComponent settings={props.transactionManagementSettings} onUpdateSettings={props.onUpdateTransactionManagementSettings} />;
      case 'Billing & Payments':
        return <BillingPaymentsSettings subscription={props.subscription} paymentMethods={props.paymentMethods} invoices={props.billingInvoices} />;
      case 'Integrations':
        return <IntegrationsSettings integrations={props.integrations} onConnect={props.onConnectIntegration} onDisconnect={props.onDisconnectIntegration} />;
      default:
        return (
            <div className="p-8 text-center">
                 <WIPBanner 
                    title="Section in Development"
                    message={`The settings for "${activeTab}" are currently being built and will be available in a future update.`}
                />
            </div>
        )
    }
  }
  
  const categoryTranslationKeys: Record<SettingCategory, string> = {
    'Account & Profile': 'settings.tabs.account',
    'Privacy & Security': 'settings.tabs.security',
    'Notifications': 'settings.tabs.notifications',
    'Appearance & Display': 'settings.tabs.appearance',
    'Language & Localization': 'settings.tabs.language',
    'Property Listing Defaults': 'settings.tabs.listingDefaults',
    'CRM & Client Management': 'settings.tabs.crm',
    'Transaction Management': 'settings.tabs.transactions',
    'Billing & Payments': 'settings.tabs.billing',
    'Integrations': 'settings.tabs.integrations',
    'Data & Storage': 'settings.tabs.data',
    'Marketing & Branding': 'settings.tabs.marketing',
    'Analytics & Reporting': 'settings.tabs.analytics',
    'Team & Collaboration': 'settings.tabs.team',
    'Legal & Compliance': 'settings.tabs.legal',
    'Mobile App Settings': 'settings.tabs.mobile',
    'Advanced Settings': 'settings.tabs.advanced',
    'Help & Support': 'settings.tabs.help',
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full mr-4">
            <CogIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('settings.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t('settings.subtitle')}</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation */}
        <div className="lg:w-1/4">
            <nav className="flex flex-col space-y-1 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md border dark:border-gray-700">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            activeTab === category 
                            ? 'bg-blue-600 text-white shadow' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        {t(categoryTranslationKeys[category])}
                    </button>
                ))}
            </nav>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 overflow-hidden">
                {renderContent()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;