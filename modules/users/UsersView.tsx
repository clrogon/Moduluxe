import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import UserForm from './UserForm';
import EmptyState from '../../components/ui/EmptyState';
import { User } from '../../shared/types/index';
import { UsersIcon, PencilIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface UsersViewProps {
  users: User[];
  onAddUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  initialSearchTerm?: string;
}

const UsersView: React.FC<UsersViewProps> = ({ users, onAddUser, onUpdateUser, onDeleteUser, initialSearchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const userColumns = useMemo(() => [
    { key: 'name', label: t('users.columns.name') },
    { key: 'type', label: t('users.columns.type') },
    { key: 'email', label: t('users.columns.email') },
    { key: 'phone', label: t('users.columns.phone') },
    { key: 'status', label: t('users.columns.status'), render: (item: User) => <StatusPill status={item.status} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: User) => (
            <div className="flex justify-end">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`${t('common.edit')} ${item.name}`}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t]);

  const handleAddClick = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (user: User) => {
    if (selectedUser) {
        onUpdateUser(user);
    } else {
        onAddUser(user);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onDeleteUser(id);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
         <div className="flex justify-between items-center">
            <div>
                 <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('users.title')}</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{t('users.subtitle')}</p>
            </div>
            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <UsersIcon className="h-5 w-5 mr-2" />
                {t('users.addUser')}
            </button>
        </div>

        <DataTable 
            title={t('users.tableTitle')}
            columns={userColumns} 
            data={users}
            initialSearchTerm={initialSearchTerm}
            emptyState={
                <EmptyState 
                    icon={<UsersIcon className="h-8 w-8"/>} 
                    title={t('users.empty.title')}
                    message={t('users.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedUser ? t('users.editTitle') : t('users.addTitle')}
        >
            <UserForm 
                initialData={selectedUser} 
                onSubmit={handleSubmit} 
                onCancel={() => setIsModalOpen(false)}
                onDelete={selectedUser ? handleDelete : undefined}
            />
        </Modal>
    </div>
  );
};

export default UsersView;