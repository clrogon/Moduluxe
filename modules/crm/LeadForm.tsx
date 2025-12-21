
import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, House } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { UserCircleIcon } from '../../components/ui/icons/Icons';

interface LeadFormProps {
  initialData?: Lead | null;
  houses: House[];
  onSubmit: (lead: Lead) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  onConvert?: (lead: Lead) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, houses, onSubmit, onCancel, onDelete, onConvert }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<LeadStatus>('New');
  const [source, setSource] = useState('Website');
  const [interest, setInterest] = useState('');
  const [notes, setNotes] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setStatus(initialData.status);
      setSource(initialData.source);
      setInterest(initialData.interest);
      setNotes(initialData.notes);
    } else {
        setName('');
        setEmail('');
        setPhone('');
        setStatus('New');
        setSource('Website');
        setInterest('');
        setNotes('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      id: initialData ? initialData.id : `lead-${Date.now()}`,
      name,
      email,
      phone,
      status,
      source,
      interest,
      notes,
      createdAt: initialData ? initialData.createdAt : new Date().toISOString()
    };
    onSubmit(lead);
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
        if (window.confirm(t('crm.deletePrompt', { name: initialData.name }))) {
            onDelete(initialData.id);
        }
    }
  };

  const handleConvert = () => {
      if (initialData && onConvert) {
          if (window.confirm(`Convert ${initialData.name} to a Tenant? This will create a new user account and remove the lead.`)) {
              onConvert(initialData);
          }
      }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.name')}</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.email')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.phone')}</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.status')}</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="New">{t('crm.status.New')}</option>
            <option value="Contacted">{t('crm.status.Contacted')}</option>
            <option value="Showing">{t('crm.status.Showing')}</option>
            <option value="Offer">{t('crm.status.Offer')}</option>
            <option value="Closed">{t('crm.status.Closed')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.source')}</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g. Website, Referral"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.interest')}</label>
        <select
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            <option value="">{t('crm.form.selectProperty')}</option>
            {houses.map(h => (
                <option key={h.id} value={h.address}>{h.address}</option>
            ))}
            <option value="General Inquiry">{t('crm.form.generalInquiry')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('crm.form.notes')}</label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
            {initialData && onDelete && (
                <button
                    type="button"
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                >
                    {t('common.delete')}
                </button>
            )}
            {initialData && onConvert && (
                 <button
                    type="button"
                    onClick={handleConvert}
                    className="flex items-center text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium ml-4"
                >
                    <UserCircleIcon className="h-4 w-4 mr-1" />
                    Convert to Tenant
                </button>
            )}
        </div>
        
        <div className="flex space-x-3">
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
            {initialData ? t('common.save') : t('common.create')}
            </button>
        </div>
      </div>
    </form>
  );
};

export default LeadForm;
