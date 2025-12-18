
import React, { useState } from 'react';
import { User, Contract, Payment, MaintenanceRequest, UserProfile } from '../../shared/types/index';
import DashboardCard from '../../components/ui/DashboardCard';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import MaintenanceRequestForm from '../maintenance/MaintenanceRequestForm';
import PaymentProofModal from '../payments/PaymentProofModal';
import { DocumentTextIcon, CreditCardIcon, WrenchScrewdriverIcon, CalendarDaysIcon, ArrowDownTrayIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface TenantPortalViewProps {
    user: User;
    contracts: Contract[];
    payments: Payment[];
    maintenanceRequests: MaintenanceRequest[];
    onAddMaintenanceRequest: (req: MaintenanceRequest) => void;
    onProcessPaymentProof: (paymentId: string, data: { transactionId: string; date: string; amount: number }) => void;
    userProfile: UserProfile; // System profile to get Bank IBAN for validation
}

const TenantPortalView: React.FC<TenantPortalViewProps> = ({ 
    user, contracts, payments, maintenanceRequests, onAddMaintenanceRequest, onProcessPaymentProof, userProfile 
}) => {
    const { t } = useTranslation();
    const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentForProof, setSelectedPaymentForProof] = useState<string | null>(null);

    const activeContract = contracts.find(c => c.status === 'Active');
    // Sort payments: Due/Late first, then by date
    const sortedPayments = [...payments].sort((a, b) => {
        if (a.status === 'Paid' && b.status !== 'Paid') return 1;
        if (a.status !== 'Paid' && b.status === 'Paid') return -1;
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    });

    const upcomingPayment = payments.filter(p => p.status === 'Due' || p.status === 'Late').sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];
    const openMaintenanceRequests = maintenanceRequests.filter(m => m.status !== 'Completed').length;

    const handlePayClick = (payment: Payment) => {
        setSelectedPaymentForProof(payment.id);
        setIsPaymentModalOpen(true);
    };

    const handleMaintenanceSubmit = (req: MaintenanceRequest) => {
        // Ensure the request is linked to the tenant's active house
        if (activeContract) {
            // Find house ID from contract/booking link usually, but here we simplify 
            // assuming the mock data structure allows us to infer or we rely on the form
            // In a real app, we'd enforce the houseId from the active contract.
            onAddMaintenanceRequest(req);
            setIsMaintenanceModalOpen(false);
        } else {
            alert("No active contract found to link this request to.");
        }
    };

    const handleProofProcess = (paymentId: string, data: { transactionId: string; date: string; amount: number }) => {
        onProcessPaymentProof(paymentId, data);
        setIsPaymentModalOpen(false);
    };

    const paymentColumns = [
        { key: 'dueDate', label: t('payments.columns.dueDate') },
        { key: 'amount', label: t('payments.columns.amount'), render: (item: Payment) => `$${item.amount.toLocaleString()}` },
        { key: 'status', label: t('payments.columns.status'), render: (item: Payment) => <StatusPill status={item.status} /> },
        { 
            key: 'actions', 
            label: t('common.actions'), 
            render: (item: Payment) => item.status !== 'Paid' ? (
                <button 
                    onClick={() => handlePayClick(item)}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded shadow-sm transition-colors flex items-center"
                >
                    <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
                    {t('payments.uploadProof')}
                </button>
            ) : (
                <span className="text-xs text-gray-500">{item.paidDate}</span>
            )
        },
    ];
    
    const maintenanceColumns = [
        { key: 'description', label: t('maintenance.columns.issue') },
        { key: 'priority', label: t('maintenance.columns.priority'), render: (item: MaintenanceRequest) => <StatusPill status={item.priority} /> },
        { key: 'reportedDate', label: t('maintenance.columns.reported') },
        { key: 'status', label: t('maintenance.columns.status'), render: (item: MaintenanceRequest) => <StatusPill status={item.status} /> },
    ];

    // Get House for Maintenance Form
    // In this mock, we create a fake "House" object based on the contract to pass to the form
    // so the dropdown works or pre-selects.
    const tenantHouses = activeContract ? [{ id: 'h-current', address: activeContract.houseName, type: 'Apartment' as const, rent: 0, status: 'Occupied' as const }] : [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('tenantPortal.welcome', { name: user.name })}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t('tenantPortal.subtitle')}</p>
                </div>
                <button 
                    onClick={() => setIsMaintenanceModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
                >
                    <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                    {t('maintenance.reportIssue')}
                </button>
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
                    value={upcomingPayment ? `$${upcomingPayment.amount.toLocaleString()}` : 'None'} 
                    icon={<CreditCardIcon className="h-8 w-8 text-red-500" />} 
                />
                <DashboardCard 
                    title={t('tenantPortal.openMaintenance')}
                    value={openMaintenanceRequests.toString()} 
                    icon={<WrenchScrewdriverIcon className="h-8 w-8 text-yellow-500" />} 
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataTable title={t('tenantPortal.paymentHistory')} columns={paymentColumns} data={sortedPayments} />
                <DataTable title={t('tenantPortal.maintenanceRequests')} columns={maintenanceColumns} data={maintenanceRequests} />
            </div>

            {/* Maintenance Modal */}
            <Modal
                isOpen={isMaintenanceModalOpen}
                onClose={() => setIsMaintenanceModalOpen(false)}
                title={t('maintenance.addTitle')}
            >
                <MaintenanceRequestForm 
                    houses={tenantHouses}
                    onSubmit={handleMaintenanceSubmit}
                    onCancel={() => setIsMaintenanceModalOpen(false)}
                />
            </Modal>

            {/* Payment Proof Modal */}
            <PaymentProofModal 
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                payments={payments.filter(p => p.id === selectedPaymentForProof)} // Only pass the specific payment to avoid ambiguity
                onProcessProof={handleProofProcess}
                userProfile={userProfile}
            />
        </div>
    );
};

export default TenantPortalView;
