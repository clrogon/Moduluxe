import React, { useState, useEffect } from 'react';
import { Contract, ContractStatus, Booking } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface ContractFormProps {
  initialData?: Contract | null;
  bookings: Booking[];
  onSubmit: (contract: Contract) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ initialData, bookings, onSubmit, onCancel, onDelete }) => {
  const [bookingId, setBookingId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<ContractStatus>('Active');
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setBookingId(initialData.bookingId);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setStatus(initialData.status);
    } else {
      // Default to first booking if available
      if (bookings.length > 0) {
        setBookingId(bookings[0].id);
        setStartDate(bookings[0].startDate);
        setEndDate(bookings[0].endDate);
      } else {
        setBookingId('');
        setStartDate('');
        setEndDate('');
      }
    }
  }, [initialData, bookings]);

  // Update dates when booking selection changes
  useEffect(() => {
    if (!initialData) { // Only auto-update for new contracts
        const selectedBooking = bookings.find(b => b.id === bookingId);
        if (selectedBooking) {
            setStartDate(selectedBooking.startDate);
            setEndDate(selectedBooking.endDate);
        }
    }
  }, [bookingId, bookings, initialData]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedBooking = bookings.find(b => b.id === bookingId);
    if (!selectedBooking) {
        alert("Please select a valid booking.");
        return;
    }

    const contract: Contract = {
      id: initialData ? initialData.id : `c-${Date.now()}`,
      bookingId,
      houseName: selectedBooking.houseName,
      userName: selectedBooking.userName,
      startDate,
      endDate,
      status,
    };
    onSubmit(contract);
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
        if (window.confirm(t('contracts.form.deletePrompt', { id: initialData.id }))) {
            onDelete(initialData.id);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="booking" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contracts.form.booking')}</label>
        <select
          id="booking"
          required
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          disabled={!!initialData} // Prevent changing the booking on an existing contract
        >
            {bookings.map(b => (
                <option key={b.id} value={b.id}>
                    {b.houseName} - {b.userName} ({b.startDate} to {b.endDate})
                </option>
            ))}
        </select>
         {initialData && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('contracts.form.bookingDisabled')}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contracts.form.startDate')}</label>
            <input
                type="date"
                id="startDate"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contracts.form.endDate')}</label>
            <input
                type="date"
                id="endDate"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contracts.form.status')}</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ContractStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Terminated">Terminated</option>
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

export default ContractForm;