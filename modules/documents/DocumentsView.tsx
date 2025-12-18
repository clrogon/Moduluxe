
import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import DocumentForm from './DocumentForm';
import { Document, User, House } from '../../shared/types/index';
import { DocumentDuplicateIcon, ArrowDownTrayIcon, TrashIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface DocumentsViewProps {
  documents: Document[];
  users: User[];
  houses: House[];
  onAddDocument: (doc: Document) => void;
  onDeleteDocument: (id: string) => void;
  initialSearchTerm?: string;
}

const DocumentsView: React.FC<DocumentsViewProps> = ({ documents, users, houses, onAddDocument, onDeleteDocument, initialSearchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document? This cannot be undone.')) {
      onDeleteDocument(id);
    }
  };

  // Security: Sanitize URLs to prevent javascript: execution
  const getSafeUrl = (url: string) => {
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url === '#') {
          return url;
      }
      return '#'; // Fallback for unsafe or unknown protocols
  };

  const columns = useMemo(() => [
    { key: 'name', label: t('documents.columns.name') },
    { key: 'type', label: t('documents.columns.type') },
    { key: 'relatedTo.name', label: t('documents.columns.relatedTo'), render: (item: Document) => `${item.relatedTo.type}: ${item.relatedTo.name}`},
    { key: 'uploadDate', label: t('documents.columns.uploadDate') },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: Document) => (
            <div className="flex items-center justify-end space-x-2">
                <a 
                    href={getSafeUrl(item.fileUrl)} 
                    download 
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`Download ${item.name}`}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                </a>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                    }}
                    className="text-gray-500 hover:text-red-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-red-400"
                    aria-label={`Delete ${item.name}`}
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t]);
  
  const handleSubmit = (doc: Document) => {
    onAddDocument(doc);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
             <div>
                 <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('documents.title')}</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{t('documents.subtitle')}</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                {t('documents.uploadButton')}
            </button>
        </div>

        <DataTable 
            title={t('documents.tableTitle')}
            columns={columns} 
            data={documents}
            initialSearchTerm={initialSearchTerm}
            emptyState={
                <EmptyState 
                    icon={<DocumentDuplicateIcon className="h-8 w-8"/>} 
                    title={t('documents.empty.title')}
                    message={t('documents.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={t('documents.modalTitle')}
        >
            <DocumentForm
                users={users}
                houses={houses}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            />
        </Modal>
    </div>
  );
};

export default DocumentsView;
