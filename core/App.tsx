
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { AppView, User, AppearancePreferences, Lead } from '../shared/types/index';
import { useMockData } from './hooks/useMockData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Assistant from './assistant/Assistant';
import LoginView from './auth/LoginView';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { moduleConfig } from '../modules/modules.config';
import { THEMES } from './config/theme.config';
import ErrorBoundary from './components/ErrorBoundary';
import { SpinnerIcon } from '../components/ui/icons/Icons';

// Architecture: Lazy Load modules to improve startup performance (Code Splitting)
const AnalyticsView = React.lazy(() => import('../modules/analytics/AnalyticsView'));
const HousesView = React.lazy(() => import('../modules/houses/HousesView'));
const UsersView = React.lazy(() => import('../modules/users/UsersView'));
const ContractsView = React.lazy(() => import('../modules/contracts/ContractsView'));
const PaymentsView = React.lazy(() => import('../modules/payments/PaymentsView'));
const BookingsView = React.lazy(() => import('../modules/bookings/BookingsView'));
const CommunicationsView = React.lazy(() => import('../modules/communications/CommunicationsView'));
const MaintenanceView = React.lazy(() => import('../modules/maintenance/MaintenanceView'));
const InvoicesView = React.lazy(() => import('../modules/invoices/InvoicesView'));
const DocumentsView = React.lazy(() => import('../modules/documents/DocumentsView'));
const ReportingView = React.lazy(() => import('../modules/reporting/ReportingView'));
const SettingsView = React.lazy(() => import('../modules/settings/SettingsView'));
const TenantPortalView = React.lazy(() => import('../modules/tenant-portal/TenantPortalView'));
const AutomationsView = React.lazy(() => import('../modules/automations/AutomationsView'));
const AuditLogView = React.lazy(() => import('../modules/audit-log/AuditLogView'));
const LeadsView = React.lazy(() => import('../modules/crm/LeadsView'));
const BankReconciliationView = React.lazy(() => import('../modules/bank-reconciliation/BankReconciliationView'));

type InitialSearch = {
  view: AppView;
  term: string;
}

const AccessDenied: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
            You do not have permission to view this module. If you believe this is an error, please contact your administrator.
        </p>
    </div>
);

const LoadingFallback: React.FC = () => (
    <div className="flex items-center justify-center h-full">
        <SpinnerIcon className="h-8 w-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-gray-500 dark:text-gray-400">Loading module...</span>
    </div>
);

const AppContent: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.ANALYTICS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [initialSearch, setInitialSearch] = useState<InitialSearch | null>(null);
  const { t, setLanguage } = useTranslation();
  const { showToast } = useToast();
  
  // Initialize mock data hook with current user ID to ensure profile/settings isolation
  const {
    houses, addHouse, updateHouse, deleteHouse,
    users, addUser, updateUser, deleteUser,
    userProfile, updateUserProfile,
    notificationPreferences, updateNotificationPreferences,
    appearancePreferences, updateAppearancePreferences,
    localizationPreferences, updateLocalizationPreferences,
    propertyListingDefaults, updatePropertyListingDefaults,
    crmSettings, updateCrmSettings,
    transactionManagementSettings, updateTransactionManagementSettings,
    subscription, paymentMethods, billingInvoices,
    integrations, connectIntegration, disconnectIntegration,
    contracts, addContract, updateContract, deleteContract,
    payments, addPayment, updatePayment, processPaymentProof,
    documents, addDocument, deleteDocument,
    notifications, markAllNotificationsAsRead,
    bookings, addBooking, updateBooking, cancelBooking,
    communications, addCommunication, markCommunicationAsRead,
    maintenanceRequests, addMaintenanceRequest, updateMaintenanceRequest, deleteMaintenanceRequest,
    invoices, addInvoice, updateInvoice, deleteInvoice,
    automations, addAutomation, updateAutomation, deleteAutomation,
    auditLog,
    leads, addLead, updateLead, deleteLead,
    monthlyRevenue, activityFeed,
    settings, addSetting, updateSetting, deleteSetting,
  } = useMockData(currentUser?.id);

  // --- SECURITY: Session Timeout Logic ---
  useEffect(() => {
      if (!currentUser) return;

      // Parse timeout setting (e.g., "30 mins" -> milliseconds)
      const timeoutSetting = settings.find(s => s.key === 'Session Timeout')?.value || '30 mins';
      let timeoutMs = 30 * 60 * 1000; // Default 30m
      const match = timeoutSetting.match(/(\d+)\s*(min|hr)/);
      if (match) {
          const val = parseInt(match[1], 10);
          timeoutMs = match[2] === 'hr' ? val * 60 * 60 * 1000 : val * 60 * 1000;
      }

      let timeoutId: ReturnType<typeof setTimeout>;

      const resetTimer = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
              setCurrentUser(null);
              showToast('info', 'Session expired due to inactivity.');
          }, timeoutMs);
      };

      // Listen for activity
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
      window.addEventListener('click', resetTimer);
      window.addEventListener('scroll', resetTimer);

      resetTimer(); // Start timer

      return () => {
          clearTimeout(timeoutId);
          window.removeEventListener('mousemove', resetTimer);
          window.removeEventListener('keydown', resetTimer);
          window.removeEventListener('click', resetTimer);
          window.removeEventListener('scroll', resetTimer);
      };
  }, [currentUser, settings, showToast]);
  // ----------------------------------------

  // Apply theme changes globally
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = appearancePreferences.theme === 'Dark' || 
      (appearancePreferences.theme === 'Auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);

    const themeName = appearancePreferences.colorTheme || 'Nzila Ember';
    const theme = THEMES[themeName];
    if (theme) {
        root.style.setProperty('--color-bg-light', theme.lightBg);
        root.style.setProperty('--color-surface', theme.surface);
        root.style.setProperty('--color-bg-dark', theme.darkBg);
        root.style.setProperty('--color-surface-dark', theme.darkSurface);
        root.style.setProperty('--color-accent-light', theme.accent);
        root.style.setProperty('--color-accent-dark', theme.accentDark || theme.accent);
        const className = `theme-${themeName.toLowerCase().replace(/ /g, '-')}`;
        root.classList.remove('theme-nzila-ember', 'theme-zen-path', 'theme-urban-traverse', 'theme-nzila-harmony');
        root.classList.add(className);
    }
  }, [appearancePreferences.theme, appearancePreferences.colorTheme]);

  useEffect(() => {
    setLanguage(localizationPreferences.language);
  }, [localizationPreferences.language, setLanguage]);

  useEffect(() => {
      if (currentUser) {
          if (currentUser.type === 'Tenant') {
              setView(AppView.TENANT_PORTAL);
          } else {
              setView(AppView.ANALYTICS);
          }
      }
  }, [currentUser]);

  const tenantFilteredData = useMemo(() => {
    if (!currentUser || currentUser.type !== 'Tenant') return null;
    
    // Improved security: trace relation via Booking -> User ID match, not Name
    const userContracts = contracts.filter(c => {
        const booking = bookings.find(b => b.id === c.bookingId);
        return booking?.userId === currentUser.id;
    });
    
    const userContractIds = userContracts.map(c => c.id);
    const userPayments = payments.filter(p => userContractIds.includes(p.contractId));
    const userBookings = bookings.filter(b => b.userId === currentUser.id);
    const userHouseIds = userBookings.map(b => b.houseId);
    
    // Maintenance requests for houses linked to the user's bookings
    const userMaintenanceRequests = maintenanceRequests.filter(m => userHouseIds.includes(m.houseId));
    const userCommunications = communications.filter(c => c.sender === currentUser.name || c.body.toLowerCase().includes(currentUser.name.toLowerCase()));

    return {
        contracts: userContracts,
        payments: userPayments,
        maintenanceRequests: userMaintenanceRequests,
        communications: userCommunications,
    };
  }, [currentUser, contracts, payments, maintenanceRequests, bookings, communications]);

  const handleSearchNavigation = (search: InitialSearch) => {
    setInitialSearch(search);
    setView(search.view);
  };
  
  const handleConvertLead = (lead: Lead) => {
      // 1. Create a new user from the lead
      const newUser: User = {
          id: `u-${Date.now()}`,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          type: 'Tenant',
          status: 'Active'
      };
      addUser(newUser);
      
      // 2. Archive/Delete the lead
      deleteLead(lead.id);
      
      showToast('success', `Lead ${lead.name} converted to Tenant successfully!`);
      // Optional: switch to Users view
      setView(AppView.USERS);
  };
  
  useEffect(() => {
    if (initialSearch) {
      const timer = setTimeout(() => setInitialSearch(null), 100);
      return () => clearTimeout(timer);
    }
  }, [initialSearch, view]);

  const renderContent = () => {
    const searchTerm = initialSearch && initialSearch.view === view ? initialSearch.term : undefined;

    if (currentUser) {
        const allModules = Object.values(moduleConfig).flat();
        const currentModuleConfig = allModules.find(m => m.key === view);
        if (currentModuleConfig && currentModuleConfig.allowedRoles) {
            if (!currentModuleConfig.allowedRoles.includes(currentUser.type)) {
                return <AccessDenied />;
            }
        }
    }

    // Wrap lazy components in Suspense
    return (
        <Suspense fallback={<LoadingFallback />}>
            {(() => {
                switch (view) {
                    case AppView.TENANT_PORTAL:
                        if (currentUser && currentUser.type === 'Tenant' && tenantFilteredData) {
                            return <TenantPortalView 
                                user={currentUser} 
                                contracts={tenantFilteredData.contracts} 
                                payments={tenantFilteredData.payments} 
                                maintenanceRequests={tenantFilteredData.maintenanceRequests}
                                onAddMaintenanceRequest={addMaintenanceRequest}
                                onProcessPaymentProof={processPaymentProof}
                                userProfile={userProfile}
                            />;
                        }
                        return <div>Loading tenant data...</div>;
                    case AppView.ANALYTICS: return <AnalyticsView houses={houses} users={users} contracts={contracts} payments={payments} monthlyRevenue={monthlyRevenue} activityFeed={activityFeed} bookings={bookings} localizationPreferences={localizationPreferences} />;
                    case AppView.LEADS: return <LeadsView leads={leads || []} houses={houses} onAddLead={addLead} onUpdateLead={updateLead} onDeleteLead={deleteLead} onConvertLead={handleConvertLead} />;
                    case AppView.HOUSES: return <HousesView houses={houses} onAddHouse={addHouse} onUpdateHouse={updateHouse} onDeleteHouse={deleteHouse} maintenanceRequests={maintenanceRequests} initialSearchTerm={searchTerm} />;
                    case AppView.USERS: return <UsersView users={users} onAddUser={addUser} onUpdateUser={updateUser} onDeleteUser={deleteUser} initialSearchTerm={searchTerm} />;
                    case AppView.CONTRACTS: return <ContractsView contracts={contracts} bookings={bookings} onAddContract={addContract} onUpdateContract={updateContract} onDeleteContract={deleteContract} initialSearchTerm={searchTerm} />;
                    case AppView.PAYMENTS: return <PaymentsView payments={payments} contracts={contracts} onAddPayment={addPayment} onUpdatePayment={updatePayment} initialSearchTerm={searchTerm} processPaymentProof={processPaymentProof} userProfile={userProfile} localizationPreferences={localizationPreferences} />;
                    case AppView.BOOKINGS: return <BookingsView bookings={bookings} houses={houses} users={users} onAddBooking={addBooking} onUpdateBooking={updateBooking} onCancelBooking={cancelBooking} initialSearchTerm={searchTerm} />;
                    case AppView.DOCUMENTS: return <DocumentsView documents={documents} users={users} houses={houses} onAddDocument={addDocument} onDeleteDocument={deleteDocument} initialSearchTerm={searchTerm} />;
                    case AppView.COMMUNICATIONS: return <CommunicationsView communications={tenantFilteredData?.communications ?? communications} onMarkAsRead={markCommunicationAsRead} onSend={addCommunication} />;
                    case AppView.MAINTENANCE: return <MaintenanceView maintenanceRequests={tenantFilteredData?.maintenanceRequests ?? maintenanceRequests} houses={houses} onAddRequest={addMaintenanceRequest} onUpdateRequest={updateMaintenanceRequest} onDeleteRequest={deleteMaintenanceRequest} initialSearchTerm={searchTerm} />;
                    case AppView.INVOICES: return <InvoicesView invoices={invoices} contracts={contracts} onAddInvoice={addInvoice} onUpdateInvoice={updateInvoice} onDeleteInvoice={deleteInvoice} initialSearchTerm={searchTerm} />;
                    case AppView.REPORTING: return <ReportingView payments={payments} contracts={contracts} houses={houses} bookings={bookings} />;
                    case AppView.AUTOMATIONS: return <AutomationsView automations={automations} onAddAutomation={addAutomation} onUpdateAutomation={updateAutomation} onDeleteAutomation={deleteAutomation} />;
                    case AppView.AUDIT_LOG: return <AuditLogView auditLog={auditLog} />;
                    case AppView.SETTINGS: return <SettingsView settings={settings} onAddSetting={addSetting} onUpdateSetting={updateSetting} onDeleteSetting={deleteSetting} userProfile={userProfile} onUpdateUserProfile={updateUserProfile} notificationPreferences={notificationPreferences} onUpdateNotificationPreferences={updateNotificationPreferences} appearancePreferences={appearancePreferences} onUpdateAppearancePreferences={updateAppearancePreferences} localizationPreferences={localizationPreferences} onUpdateLocalizationPreferences={updateLocalizationPreferences} propertyListingDefaults={propertyListingDefaults} onUpdatePropertyListingDefaults={updatePropertyListingDefaults} crmSettings={crmSettings} onUpdateCrmSettings={updateCrmSettings} transactionManagementSettings={transactionManagementSettings} onUpdateTransactionManagementSettings={updateTransactionManagementSettings} subscription={subscription} paymentMethods={paymentMethods} billingInvoices={billingInvoices} integrations={integrations} onConnectIntegration={connectIntegration} onDisconnectIntegration={disconnectIntegration} />;
                    case AppView.BANK_RECONCILIATION: return <BankReconciliationView payments={payments} onProcessPayment={processPaymentProof} />;
                    default: return <div>{t('error.selectView')}</div>;
                }
            })()}
        </Suspense>
    );
  };

  const appData = useMemo(() => ({ 
    houses, users, userProfile, contracts, payments, bookings, documents, notifications, notificationPreferences, appearancePreferences, localizationPreferences, propertyListingDefaults, crmSettings, transactionManagementSettings, subscription, paymentMethods, billingInvoices, integrations, maintenanceRequests, invoices, settings, automations, auditLog, leads
  }), [houses, users, userProfile, contracts, payments, bookings, documents, notifications, notificationPreferences, appearancePreferences, localizationPreferences, propertyListingDefaults, crmSettings, transactionManagementSettings, subscription, paymentMethods, billingInvoices, integrations, maintenanceRequests, invoices, settings, automations, auditLog, leads]);

  if (!currentUser) {
      return <LoginView onLogin={setCurrentUser} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Sidebar 
        currentView={view} 
        setView={setView} 
        currentUser={currentUser} 
        onLogout={() => setCurrentUser(null)}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentView={view} 
          notifications={notifications} 
          onMenuClick={() => setMobileMenuOpen(true)}
          onMarkAllRead={markAllNotificationsAsRead}
          houses={houses}
          users={users}
          contracts={contracts}
          onSearchNavigate={handleSearchNavigation}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 md:p-6 transition-colors duration-300">
          <ErrorBoundary>
            {renderContent()}
          </ErrorBoundary>
        </main>
      </div>
      <ErrorBoundary>
        <Assistant appData={appData} user={currentUser} />
      </ErrorBoundary>
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  </LanguageProvider>
);

export default App;
