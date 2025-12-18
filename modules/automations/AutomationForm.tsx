import React, { useState, useEffect } from 'react';
import { Automation } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface AutomationFormProps {
  initialData?: Automation | null;
  onSubmit: (automation: Automation) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

const AutomationForm: React.FC<AutomationFormProps> = ({ initialData, onSubmit, onCancel, onDelete }) => {
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');
  const [active, setActive] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTrigger(initialData.trigger);
      setAction(initialData.action);
      setActive(initialData.active);
    } else {
        setName('');
        setTrigger('');
        setAction('');
        setActive(true);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const automation: Automation = {
      id: initialData ? initialData.id : `auto-${Date.now()}`,
      name,
      trigger,
      action,
      active
    };
    onSubmit(automation);
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
        if (window.confirm(`Are you sure you want to delete automation "${initialData.name}"?`)) {
            onDelete(initialData.id);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('automations.form.name')}</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g. Late Payment Reminder"
        />
      </div>

      <div>
        <label htmlFor="trigger" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('automations.form.trigger')}</label>
        <select
          id="trigger"
          required
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            <option value="" disabled>Select a trigger</option>
            <option value="Payment is Late">Payment is Late</option>
            <option value="New Lease Signed">New Lease Signed</option>
            <option value="Maintenance Request Created">Maintenance Request Created</option>
            <option value="Contract Expiring Soon">Contract Expiring Soon</option>
        </select>
      </div>

      <div>
        <label htmlFor="action" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('automations.form.action')}</label>
        <select
          id="action"
          required
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            <option value="" disabled>Select an action</option>
            <option value="Send Email">Send Email</option>
            <option value="Send SMS">Send SMS</option>
            <option value="Create Task">Create Task</option>
            <option value="Notify Owner">Notify Owner</option>
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('automations.form.status')}</label>
        <select
          id="status"
          value={active ? 'Active' : 'Inactive'}
          onChange={(e) => setActive(e.target.value === 'Active')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        {initialData && onDelete ? (
            <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
            >
                {t('common.delete')}
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

export default AutomationForm;