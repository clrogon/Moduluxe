
import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import PaymentForm from './PaymentForm';
import PaymentProofModal from './PaymentProofModal';
import EmptyState from '../../components/ui/EmptyState';
import { Payment, Contract, UserProfile, LocalizationPreferences } from '../../shared/types/index';
import { CreditCardIcon, PencilIcon, DocumentDuplicateIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { formatCurrency, formatDate } from '../../core/utils/format';

interface PaymentsViewProps {
  payments: Payment[];
  contracts: Contract[];
  onAddPayment: (payment: Payment) => void;
  onUpdatePayment: (payment: Payment) => void;
  initialSearchTerm?: string;
  processPaymentProof: (paymentId: string, data: { transactionId: string; date: string; amount: number }) => void;
  userProfile: UserProfile;
  localizationPreferences: LocalizationPreferences;
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ payments, contracts, onAddPayment, onUpdatePayment, initialSearchTerm, processPaymentProof, userProfile, localizationPreferences }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { t } = useTranslation();

  const handleEditClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const paymentColumns = useMemo(() => [
    { key: 'contractId', label: t('payments.columns.contractId') },
    { key: 'amount', label: t('payments.columns.amount'), render: (item: Payment) => formatCurrency(item.amount, localizationPreferences) },
    { key: 'dueDate', label: t('payments.columns.dueDate'), render: (item: Payment) => formatDate(item.dueDate, localizationPreferences) },
    { key: 'paidDate', label: t('payments.columns.paidDate'), render: (item: Payment) => item.paidDate ? formatDate(item.paidDate, localizationPreferences) : 'N/A' },
    { key: 'status', label: t('payments.columns.status'), render: (item: Payment) => <StatusPill status={item.status} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: Payment) => (
            <div className="flex justify-end">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`${t('common.edit')} payment ${item.id}`}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t, localizationPreferences]);

  const handleAddClick = () => {
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (payment: Payment) => {
    if (selectedPayment) {
      onUpdatePayment(payment);
    } else {
      onAddPayment(payment);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
         <div className="flex justify-end space-x-3">
            <button 
                onClick={() => setIsProofModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                {t('payments.uploadProof')}
            </button>
            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <CreditCardIcon className="h-5 w-5 mr-2" />
                {t('payments.recordPayment')}
            </button>
        </div>

        <DataTable 
            title={t('payments.tableTitle')}
            columns={paymentColumns} 
            data={payments}
            initialSearchTerm={initialSearchTerm}
            emptyState={
                <EmptyState 
                    icon={<CreditCardIcon className="h-8 w-8"/>} 
                    title={t('payments.empty.title')}
                    message={t('payments.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedPayment ? t('payments.editTitle') : t('payments.addTitle')}
        >
            <PaymentForm 
                initialData={selectedPayment}
                contracts={contracts}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            />
        </Modal>

        <PaymentProofModal 
            isOpen={isProofModalOpen}
            onClose={() => setIsProofModalOpen(false)}
            payments={payments}
            onProcessProof={processPaymentProof}
            userProfile={userProfile}
        />
    </div>
  );
};

export default PaymentsView;
