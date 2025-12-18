import React, { useState, useEffect } from 'react';
import { Invoice, Contract, InvoiceStatus } from '../../shared/types/index';

interface InvoiceFormProps {
  initialData?: Invoice | null;
  contracts: Contract[];
  onSubmit: (invoice: Invoice) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ initialData, contracts, onSubmit, onCancel, onDelete }) => {
  const [contractId, setContractId] = useState(contracts.length > 0 ? contracts[0].id : '');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<InvoiceStatus>('Unpaid');

  useEffect(() => {
    if (initialData) {
      setContractId(initialData.contractId);
      setAmount(initialData.amount.toString());
      setDueDate(initialData.dueDate);
      setIssuedDate(initialData.issuedDate);
      setStatus(initialData.status);
    } else {
        setContractId(contracts.length > 0 ? contracts[0].id : '');
        setAmount('');
        setDueDate('');
        setIssuedDate(new Date().toISOString().split('T')[0]);
        setStatus('Unpaid');
    }
  }, [initialData, contracts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoice: Invoice = {
      id: initialData ? initialData.id : `inv-${Date.now()}`,
      contractId,
      amount: Number(amount),
      dueDate,
      issuedDate,
      status,
    };
    onSubmit(invoice);
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
        if (window.confirm(`Are you sure you want to delete invoice "${initialData.id}"? This action cannot be undone.`)) {
            onDelete(initialData.id);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="contract" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contract</label>
        <select
          id="contract"
          required
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            {contracts.map(c => (
                <option key={c.id} value={c.id}>
                    {c.id} - {c.houseName} ({c.userName})
                </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount ($)</label>
        <input
          type="number"
          id="amount"
          required
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="issuedDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issued Date</label>
            <input
                type="date"
                id="issuedDate"
                required
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
            <input
                type="date"
                id="dueDate"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Invoice Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        {initialData && onDelete ? (
            <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
            >
                Delete Invoice
            </button>
        ) : (
            <div></div> /* Spacer */
        )}
        <div className="flex space-x-3">
            <button
            type="button"
            onClick={onCancel}
            className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            {initialData ? 'Save Changes' : 'Create Invoice'}
            </button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;