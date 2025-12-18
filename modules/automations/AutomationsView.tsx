import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import AutomationForm from './AutomationForm';
import EmptyState from '../../components/ui/EmptyState';
import { Automation } from '../../shared/types/index';
import { BoltIcon, PencilIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

// Mock type since it was added in shared/types but might be missing in some contexts
interface AutomationsViewProps {
  automations: Automation[];
  onAddAutomation: (automation: Automation) => void;
  onUpdateAutomation: (automation: Automation) => void;
  onDeleteAutomation: (id: string) => void;
}

const AutomationsView: React.FC<AutomationsViewProps> = ({ automations, onAddAutomation, onUpdateAutomation, onDeleteAutomation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const { t } = useTranslation();

  const handleEditClick = (automation: Automation) => {
    setSelectedAutomation(automation);
    setIsModalOpen(true);
  };

  const columns = useMemo(() => [
    { key: 'name', label: t('automations.columns.name') },
    { key: 'trigger', label: t('automations.columns.trigger') },
    { key: 'action', label: t('automations.columns.action') },
    { key: 'active', label: t('automations.columns.status'), render: (item: Automation) => <StatusPill status={item.active ? 'Active' : 'Inactive'} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: Automation) => (
            <div className="flex justify-end">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`${t('common.edit')} automation ${item.name}`}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t]);

  const handleAddClick = () => {
    setSelectedAutomation(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (automation: Automation) => {
    if (selectedAutomation) {
      onUpdateAutomation(automation);
    } else {
      onAddAutomation(automation);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
      onDeleteAutomation(id);
      setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
        <div className="flex justify-end">
            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <BoltIcon className="h-5 w-5 mr-2" />
                {t('automations.create')}
            </button>
        </div>

        <DataTable 
            title={t('automations.tableTitle')}
            columns={columns} 
            data={automations} 
            emptyState={
                <EmptyState 
                    icon={<BoltIcon className="h-8 w-8"/>} 
                    title={t('automations.empty.title')}
                    message={t('automations.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedAutomation ? t('automations.editTitle') : t('automations.addTitle')}
        >
            <AutomationForm 
                initialData={selectedAutomation}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                onDelete={selectedAutomation ? handleDelete : undefined}
            />
        </Modal>
    </div>
  );
};

export default AutomationsView;