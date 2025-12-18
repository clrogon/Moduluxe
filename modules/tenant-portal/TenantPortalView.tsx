import React from 'react';
import { User, Contract, Payment, MaintenanceRequest } from '../../shared/types/index';
import DashboardCard from '../../components/ui/DashboardCard';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import { DocumentTextIcon, CreditCardIcon, WrenchScrewdriverIcon, CalendarDaysIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface TenantPortalViewProps {
    user: User;
    contracts: Contract[];
    payments: Payment[];
    maintenanceRequests: MaintenanceRequest[];
}

const TenantPortalView: React.FC<TenantPortalViewProps> = ({ user, contracts, payments, maintenanceRequests }) => {
    const { t } = useTranslation();
    const activeContract = contracts.find(c => c.status === 'Active');
    const upcomingPayment = payments.filter(p => p.status === 'Due' || p.status === 'Late').sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
    const openMaintenanceRequests = maintenanceRequests.filter(m => m.status !== 'Completed').length;

    const paymentColumns = [
        { key: 'dueDate', label: t('payments.columns.dueDate') },
        { key: 'amount', label: t('payments.columns.amount'), render: (item: Payment) => `$${item.amount.toLocaleString()}` },
        { key: 'status', label: t('payments.columns.status'), render: (item: Payment) => <StatusPill status={item.status} /> },
        { key: 'paidDate', label: t('payments.columns.paidDate'), render: (item: Payment) => item.paidDate || 'N/A' },
    ];
    
    const maintenanceColumns = [
        { key: 'description', label: t('maintenance.columns.issue') },
        { key: 'priority', label: t('maintenance.columns.priority'), render: (item: MaintenanceRequest) => <StatusPill status={item.priority} /> },
        { key: 'reportedDate', label: t('maintenance.columns.reported') },
        { key: 'status', label: t('maintenance.columns.status'), render: (item: MaintenanceRequest) => <StatusPill status={item.status} /> },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('tenantPortal.welcome', { name: user.name })}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('tenantPortal.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard 
                    title={t('tenantPortal.activeContract')}
                    value={activeContract ? activeContract.houseName : 'None'} 
                    icon={<DocumentTextIcon className="h-8 w-8 text-blue-500" />} 
                />
                <DashboardCard 
                    title={t('tenantPortal.contractEndDate')}
                    value={activeContract ? activeContract.endDate : 'N/A'} 
                    icon={<CalendarDaysIcon className="h-8 w-8 text-indigo-500" />} 
                />
                <DashboardCard 
                    title={t('tenantPortal.nextPayment')}
                    value={upcomingPayment ? `$${upcomingPayment.amount} on ${upcomingPayment.dueDate}` : 'None'} 
                    icon={<CreditCardIcon className="h-8 w-8 text-red-500" />} 
                />
                <DashboardCard 
                    title={t('tenantPortal.openMaintenance')}
                    value={openMaintenanceRequests.toString()} 
                    icon={<WrenchScrewdriverIcon className="h-8 w-8 text-yellow-500" />} 
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataTable title={t('tenantPortal.paymentHistory')} columns={paymentColumns} data={payments} />
                <DataTable title={t('tenantPortal.maintenanceRequests')} columns={maintenanceColumns} data={maintenanceRequests} />
            </div>
        </div>
    );
};

export default TenantPortalView;