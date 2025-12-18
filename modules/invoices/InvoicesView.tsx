import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import InvoiceForm from './InvoiceForm';
import EmptyState from '../../components/ui/EmptyState';
import { Invoice, Contract } from '../../shared/types/index';
import { DocumentChartBarIcon, PencilIcon, ArrowDownTrayIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { PDFService } from '../../core/services/pdfService';
import { useMockData } from '../../core/hooks/useMockData'; // Import to access other data needed for PDF

interface InvoicesViewProps {
  invoices: Invoice[];
  contracts: Contract[];
  onAddInvoice: (invoice: Invoice) => void;
  onUpdateInvoice: (invoice: Invoice) => void;
  onDeleteInvoice: (id: string) => void;
  initialSearchTerm?: string;
}

const InvoicesView: React.FC<InvoicesViewProps> = ({ invoices, contracts, onAddInvoice, onUpdateInvoice, onDeleteInvoice, initialSearchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { t } = useTranslation();
  const { users, houses, bookings } = useMockData(); // Need these to enrich PDF data

  const handleEditClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDownloadPDF = (invoice: Invoice) => {
      const contract = contracts.find(c => c.id === invoice.contractId);
      let user, house;
      
      if (contract) {
          const booking = bookings.find(b => b.id === contract.bookingId);
          if (booking) {
              user = users.find(u => u.id === booking.userId);
              house = houses.find(h => h.id === booking.houseId);
          }
      }
      
      PDFService.generateInvoicePDF(invoice, contract, user, house);
  };

  const columns = useMemo(() => [
    { key: 'id', label: t('invoices.columns.id') },
    { key: 'contractId', label: t('invoices.columns.contract') },
    { key: 'amount', label: t('invoices.columns.amount'), render: (item: Invoice) => item.amount.toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'}) },
    { key: 'dueDate', label: t('invoices.columns.dueDate') },
    { key: 'issuedDate', label: t('invoices.columns.issued') },
    { key: 'status', label: t('invoices.columns.status'), render: (item: Invoice) => <StatusPill status={item.status} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: Invoice) => (
            <div className="flex justify-end space-x-2">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadPDF(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    title="Download PDF"
                >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    title={t('common.edit')}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t, contracts, users, houses, bookings]);

  const handleAddClick = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (invoice: Invoice) => {
    if (selectedInvoice) {
      onUpdateInvoice(invoice);
    } else {
      onAddInvoice(invoice);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
      onDeleteInvoice(id);
      setIsModalOpen(false);
  };
  
  return (
    <div className="space-y-4">
        <div className="flex justify-end">
            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <DocumentChartBarIcon className="h-5 w-5 mr-2" />
                {t('invoices.createInvoice')}
            </button>
        </div>

        <DataTable 
            title={t('invoices.tableTitle')}
            columns={columns} 
            data={invoices} 
            initialSearchTerm={initialSearchTerm}
            emptyState={
                <EmptyState 
                    icon={<DocumentChartBarIcon className="h-8 w-8"/>} 
                    title={t('invoices.empty.title')}
                    message={t('invoices.empty.message')}
                />
            }
        />

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedInvoice ? t('invoices.editTitle') : t('invoices.addTitle')}
        >
            <InvoiceForm 
                initialData={selectedInvoice}
                contracts={contracts}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                onDelete={selectedInvoice ? handleDelete : undefined}
            />
        </Modal>
    </div>
  );
};

export default InvoicesView;