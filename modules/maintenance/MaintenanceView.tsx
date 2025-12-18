import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import MaintenanceRequestForm from './MaintenanceRequestForm';
import EmptyState from '../../components/ui/EmptyState';
import { MaintenanceRequest, House } from '../../shared/types/index';
import { WrenchScrewdriverIcon, PencilIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface MaintenanceViewProps {
  maintenanceRequests: MaintenanceRequest[];
  houses: House[];
  onAddRequest: (req: MaintenanceRequest) => void;
  onUpdateRequest: (req: MaintenanceRequest) => void;
  onDeleteRequest: (id: string) => void;
  initialSearchTerm?: string;
}

const MaintenanceView: React.FC<MaintenanceViewProps> = ({ maintenanceRequests, houses, onAddRequest, onUpdateRequest, onDeleteRequest, initialSearchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const { t } = useTranslation();

  const handleEditClick = (req: MaintenanceRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const columns = useMemo(() => [
    { key: 'houseName', label: t('maintenance.columns.property') },
    { key: 'description', label: t('maintenance.columns.issue') },
    { key: 'priority', label: t('maintenance.columns.priority'), render: (item: MaintenanceRequest) => <StatusPill status={item.priority} /> },
    { key: 'reportedDate', label: t('maintenance.columns.reported') },
    { key: 'status', label: t('maintenance.columns.status'), render: (item: MaintenanceRequest) => <StatusPill status={item.status} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: MaintenanceRequest) => (
            <div className="flex justify-end">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`${t('common.edit')} request for ${item.houseName}`}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t]);

  const handleAddClick = () => {
    setSelectedRequest(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (req: MaintenanceRequest) => {
      if (selectedRequest) {
          onUpdateRequest(req);
      } else {
          onAddRequest(req);
      }
      setIsModalOpen(false);
  };

  const handleDelete = () => {
      if (selectedRequest) {
          onDeleteRequest(selectedRequest.id);
          setIsModalOpen(false);
      }
  };
  
  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <div>
                 <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('maintenance.title')}</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{t('maintenance.subtitle')}</p>
            </div>
            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                {t('maintenance.reportIssue')}
            </button>
        </div>

        <DataTable 
            title={t('maintenance.tableTitle')}
            columns={columns} 
            data={maintenanceRequests}
            initialSearchTerm={initialSearchTerm}
            emptyState={
                <EmptyState 
                    icon={<WrenchScrewdriverIcon className="h-8 w-8"/>} 
                    title={t('maintenance.empty.title')}
                    message={t('maintenance.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedRequest ? t('maintenance.editTitle') : t('maintenance.addTitle')}
        >
            <MaintenanceRequestForm 
                initialData={selectedRequest}
                houses={houses}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                onDelete={selectedRequest ? handleDelete : undefined}
            />
        </Modal>
    </div>
  );
};

export default MaintenanceView;