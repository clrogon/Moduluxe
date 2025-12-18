
import React, { useState, useEffect } from 'react';
import { User, UserStatus } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { useToast } from '../../core/context/ToastContext';

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (user: User) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel, onDelete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'Tenant' | 'Owner' | 'Admin'>('Tenant');
  const [status, setStatus] = useState<UserStatus>('Active');
  const { t } = useTranslation();
  const { showToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setType(initialData.type);
      setStatus(initialData.status);
    } else {
        setName('');
        setEmail('');
        setPhone('');
        setType('Tenant');
        setStatus('Active');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
        showToast('error', 'Name is required');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('error', 'Invalid email address');
        return;
    }

    const user: User = {
      id: initialData ? initialData.id : `u-${Date.now()}`,
      name,
      email,
      phone,
      type,
      status,
    };
    onSubmit(user);
    showToast('success', initialData ? 'User updated successfully' : 'User created successfully');
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
        if (window.confirm(t('users.form.deletePrompt', { name: initialData.name }))) {
            onDelete(initialData.id);
            showToast('info', 'User deleted');
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users.form.name')}</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users.form.email')}</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users.form.phone')}</label>
          <input
            type="tel"
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="555-0123"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users.form.role')}</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="Tenant">Tenant</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('users.form.accountStatus')}</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatus)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
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

export default UserForm;
