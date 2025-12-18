import React, { useState, useEffect } from 'react';
import { Payment, Contract, PaymentStatus } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface PaymentFormProps {
  initialData?: Payment | null;
  contracts: Contract[];
  onSubmit: (payment: Payment) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ initialData, contracts, onSubmit, onCancel }) => {
  const [contractId, setContractId] = useState(contracts.length > 0 ? contracts[0].id : '');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paidDate, setPaidDate] = useState('');
  const [status, setStatus] = useState<PaymentStatus>('Due');
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setContractId(initialData.contractId);
      setAmount(initialData.amount.toString());
      setDueDate(initialData.dueDate);
      setPaidDate(initialData.paidDate || '');
      setStatus(initialData.status);
    } else {
        setContractId(contracts.length > 0 ? contracts[0].id : '');
        setAmount('');
        setDueDate('');
        setPaidDate('');
        setStatus('Due');
    }
  }, [initialData, contracts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payment: Payment = {
      id: initialData ? initialData.id : `pay-${Date.now()}`,
      contractId,
      amount: Number(amount),
      dueDate,
      paidDate: paidDate || null,
      status,
    };
    onSubmit(payment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="contract" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.form.contract')}</label>
        <select
          id="contract"
          required
          value={contractId}
          onChange={(e) => setContractId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          disabled={!!initialData}
        >
            {contracts.map(c => (
                <option key={c.id} value={c.id}>
                    {c.id} - {c.houseName} ({c.userName})
                </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.form.amount')}</label>
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
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.form.dueDate')}</label>
            <input
                type="date"
                id="dueDate"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="paidDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.form.paidDate')}</label>
            <input
                type="date"
                id="paidDate"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.form.status')}</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as PaymentStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Paid">Paid</option>
          <option value="Due">Due</option>
          <option value="Late">Late</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? t('common.save') : t('payments.recordPayment')}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;