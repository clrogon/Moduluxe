import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import ContractForm from './ContractForm';
import EmptyState from '../../components/ui/EmptyState';
import { Contract, Booking } from '../../shared/types/index';
import { DocumentTextIcon, PencilIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface ContractsViewProps {
  contracts: Contract[];
  bookings: Booking[];
  onAddContract: (contract: Contract) => void;
  onUpdateContract: (contract: Contract) => void;
  onDeleteContract: (id: string) => void;
  initialSearchTerm?: string;
}

const ContractsView: React.FC<ContractsViewProps> = ({ contracts, bookings, onAddContract, onUpdateContract, onDeleteContract, initialSearchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const { t } = useTranslation();

  const handleEditClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const contractColumns = useMemo(() => [
    { key: 'id', label: t('contracts.columns.id')},
    { key: 'houseName', label: t('contracts.columns.house') },
    { key: 'userName', label: t('contracts.columns.user') },
    { key: 'startDate', label: t('contracts.columns.startDate') },
    { key: 'endDate', label: t('contracts.columns.endDate') },
    { key: 'status', label: t('contracts.columns.status'), render: (item: Contract) => <StatusPill status={item.status} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: Contract) => (
            <div className="flex justify-end">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`${t('common.edit')} contract ${item.id}`}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t]);

  const handleAddClick = () => {
    setSelectedContract(null);
    setIsModalOpen(true);
  };
  
  const handleSubmit = (contract: Contract) => {
    if (selectedContract) {
      onUpdateContract(contract);
    } else {
      onAddContract(contract);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onDeleteContract(id);
    setIsModalOpen(false);
  };
  
  return (
    <div className="space-y-4">
        <div className="flex justify-end">
            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                {t('contracts.addContract')}
            </button>
        </div>

        <DataTable 
            title={t('contracts.tableTitle')}
            columns={contractColumns} 
            data={contracts}
            initialSearchTerm={initialSearchTerm}
            emptyState={
                <EmptyState 
                    icon={<DocumentTextIcon className="h-8 w-8"/>} 
                    title={t('contracts.empty.title')}
                    message={t('contracts.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedContract ? t('contracts.editTitle') : t('contracts.addTitle')}
        >
            <ContractForm 
                initialData={selectedContract}
                bookings={bookings}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                onDelete={selectedContract ? handleDelete : undefined}
            />
        </Modal>
    </div>
  );
};

export default ContractsView;