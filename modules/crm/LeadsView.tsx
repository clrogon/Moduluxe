
import React, { useState } from 'react';
import { Lead, LeadStatus, House } from '../../shared/types/index';
import { FunnelIcon } from '../../components/ui/icons/Icons';
import Modal from '../../components/ui/Modal';
import LeadForm from './LeadForm';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface LeadsViewProps {
    leads: Lead[];
    houses: House[];
    onAddLead: (lead: Lead) => void;
    onUpdateLead: (lead: Lead) => void;
    onDeleteLead: (id: string) => void;
}

const KanbanColumn: React.FC<{
    status: LeadStatus;
    leads: Lead[];
    onDrop: (e: React.DragEvent, status: LeadStatus) => void;
    onEdit: (lead: Lead) => void;
    title: string;
}> = ({ status, leads, onDrop, onEdit, title }) => {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div 
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 min-w-[280px] flex flex-col h-full border border-gray-200 dark:border-gray-700"
            onDragOver={handleDragOver}
            onDrop={(e) => onDrop(e, status)}
        >
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">{title}</h3>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold px-2 py-0.5 rounded-full">
                    {leads.length}
                </span>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                {leads.map(lead => (
                    <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('leadId', lead.id)}
                        onClick={() => onEdit(lead)}
                        className="bg-white dark:bg-gray-700 p-3 rounded shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow active:cursor-grabbing"
                    >
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{lead.interest}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                            <span>{lead.source}</span>
                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LeadsView: React.FC<LeadsViewProps> = ({ leads, houses, onAddLead, onUpdateLead, onDeleteLead }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const { t } = useTranslation();

    const statuses: LeadStatus[] = ['New', 'Contacted', 'Showing', 'Offer', 'Closed'];

    const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
        const leadId = e.dataTransfer.getData('leadId');
        const lead = leads.find(l => l.id === leadId);
        if (lead && lead.status !== status) {
            onUpdateLead({ ...lead, status });
        }
    };

    const handleAddClick = () => {
        setSelectedLead(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    const handleSubmit = (lead: Lead) => {
        if (selectedLead) {
            onUpdateLead(lead);
        } else {
            onAddLead(lead);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        onDeleteLead(id);
        setIsModalOpen(false);
    };

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('crm.title')}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('crm.subtitle')}</p>
                </div>
                <button 
                    onClick={handleAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
                >
                    <FunnelIcon className="h-5 w-5 mr-2" />
                    {t('crm.addLead')}
                </button>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex space-x-4 h-full min-w-max">
                    {statuses.map(status => (
                        <KanbanColumn 
                            key={status} 
                            status={status} 
                            title={t(`crm.status.${status}`)}
                            leads={leads.filter(l => l.status === status)} 
                            onDrop={handleDrop}
                            onEdit={handleEditClick}
                        />
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedLead ? t('crm.editLead') : t('crm.addLead')}
            >
                <LeadForm 
                    initialData={selectedLead} 
                    houses={houses} 
                    onSubmit={handleSubmit} 
                    onCancel={() => setIsModalOpen(false)}
                    onDelete={selectedLead ? handleDelete : undefined}
                />
            </Modal>
        </div>
    );
};

export default LeadsView;
