import React, { useMemo } from 'react';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import { AuditLogEntry } from '../../shared/types/index';
import { ClipboardDocumentListIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface AuditLogViewProps {
  auditLog: AuditLogEntry[];
}

const AuditLogView: React.FC<AuditLogViewProps> = ({ auditLog }) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    { key: 'timestamp', label: t('auditLog.columns.timestamp'), render: (item: AuditLogEntry) => new Date(item.timestamp).toLocaleString() },
    { key: 'userName', label: t('auditLog.columns.user') },
    { key: 'action', label: t('auditLog.columns.action') },
    { key: 'details', label: t('auditLog.columns.details') },
  ], [t]);

  return (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('auditLog.title')}</h2>
        <DataTable 
            title={t('auditLog.tableTitle')}
            columns={columns} 
            data={auditLog} 
            emptyState={
                <EmptyState 
                    icon={<ClipboardDocumentListIcon className="h-8 w-8"/>} 
                    title={t('auditLog.empty.title')}
                    message={t('auditLog.empty.message')}
                />
            }
        />
    </div>
  );
};

export default AuditLogView;