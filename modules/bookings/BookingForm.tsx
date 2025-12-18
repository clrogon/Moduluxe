import React, { useState, useEffect } from 'react';
import { Booking, House, User, BookingStatus } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface BookingFormProps {
  initialData?: Booking | null;
  houses: House[];
  users: User[];
  onSubmit: (booking: Booking) => void;
  onCancel: () => void;
  onCancelBooking?: (id: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialData, houses, users, onSubmit, onCancel, onCancelBooking }) => {
  const [houseId, setHouseId] = useState(houses.length > 0 ? houses[0].id : '');
  const [userId, setUserId] = useState(users.length > 0 ? users[0].id : '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<BookingStatus>('Active');
  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setHouseId(initialData.houseId);
      setUserId(initialData.userId);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setStatus(initialData.status);
    } else {
        setHouseId(houses.length > 0 ? houses[0].id : '');
        setUserId(users.length > 0 ? users[0].id : '');
        setStartDate('');
        setEndDate('');
        setStatus('Active');
    }
  }, [initialData, houses, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedHouse = houses.find(h => h.id === houseId);
    const selectedUser = users.find(u => u.id === userId);

    const booking: Booking = {
      id: initialData ? initialData.id : `b-${Date.now()}`,
      houseId,
      userId,
      houseName: selectedHouse ? selectedHouse.address : 'Unknown',
      userName: selectedUser ? selectedUser.name : 'Unknown',
      startDate,
      endDate,
      status,
    };
    onSubmit(booking);
  };

  const handleCancelBooking = () => {
    if (initialData && onCancelBooking) {
        if (window.confirm(t('bookings.form.cancelPrompt', { id: initialData.id, houseName: initialData.houseName }))) {
            onCancelBooking(initialData.id);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="house" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bookings.form.property')}</label>
            <select
            id="house"
            required
            value={houseId}
            onChange={(e) => setHouseId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            disabled={!!initialData}
            >
                {houses.map(h => (
                    <option key={h.id} value={h.id}>{h.address}</option>
                ))}
            </select>
        </div>
        <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bookings.form.user')}</label>
            <select
            id="user"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            disabled={!!initialData}
            >
                {users.filter(u => u.type === 'Tenant').map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                ))}
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bookings.form.startDate')}</label>
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
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bookings.form.endDate')}</label>
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
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('bookings.form.status')}</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as BookingStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Finished">Finished</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        {initialData && onCancelBooking && initialData.status !== 'Cancelled' ? (
            <button
                type="button"
                onClick={handleCancelBooking}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
            >
                {t('bookings.form.cancelBooking')}
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

export default BookingForm;
