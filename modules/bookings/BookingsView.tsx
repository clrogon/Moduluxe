import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import BookingForm from './BookingForm';
import BookingCalendar from './BookingCalendar';
import EmptyState from '../../components/ui/EmptyState';
import { Booking, House, User } from '../../shared/types/index';
import { CalendarDaysIcon, ClipboardDocumentListIcon, PencilIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface BookingsViewProps {
  bookings: Booking[];
  houses: House[];
  users: User[];
  onAddBooking: (booking: Booking) => void;
  onUpdateBooking: (booking: Booking) => void;
  onCancelBooking: (id: string) => void;
  initialSearchTerm?: string;
}

const BookingsView: React.FC<BookingsViewProps> = ({ bookings, houses, users, onAddBooking, onUpdateBooking, onCancelBooking, initialSearchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const { t } = useTranslation();
  
  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const bookingColumns = useMemo(() => [
    { key: 'houseName', label: t('bookings.columns.house') },
    { key: 'userName', label: t('bookings.columns.user') },
    { key: 'startDate', label: t('bookings.columns.startDate') },
    { key: 'endDate', label: t('bookings.columns.endDate') },
    { key: 'status', label: t('bookings.columns.status'), render: (item: Booking) => <StatusPill status={item.status} /> },
    { 
        key: 'actions', 
        label: t('common.actions'), 
        render: (item: Booking) => (
            <div className="flex justify-end">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                    }}
                    className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                    aria-label={`${t('common.edit')} booking for ${item.houseName}`}
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
            </div>
        )
    }
  ], [t]);

  const handleAddClick = () => {
    setSelectedBooking(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (booking: Booking) => {
    if (selectedBooking) {
      onUpdateBooking(booking);
    } else {
      onAddBooking(booking);
    }
    setIsModalOpen(false);
  };

  const handleCancelBooking = (id: string) => {
    onCancelBooking(id);
    setIsModalOpen(false);
  };
  
  return (
    <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             {/* View Switcher */}
            <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-lg inline-flex">
                <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    <span className="flex items-center">
                        <ClipboardDocumentListIcon className="h-4 w-4 mr-2" />
                        {t('bookings.listView')}
                    </span>
                </button>
                <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    <span className="flex items-center">
                        <CalendarDaysIcon className="h-4 w-4 mr-2" />
                        {t('bookings.calendarView')}
                    </span>
                </button>
            </div>

            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                {t('bookings.newBooking')}
            </button>
        </div>

        {viewMode === 'list' ? (
             <DataTable 
                title={t('bookings.tableTitle')}
                columns={bookingColumns} 
                data={bookings} 
                initialSearchTerm={initialSearchTerm}
                emptyState={
                    <EmptyState 
                        icon={<CalendarDaysIcon className="h-8 w-8"/>} 
                        title={t('bookings.empty.title')}
                        message={t('bookings.empty.message')}
                    />
                }
            />
        ) : (
            <BookingCalendar bookings={bookings} />
        )}

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedBooking ? t('bookings.editTitle') : t('bookings.addTitle')}
        >
            <BookingForm 
                initialData={selectedBooking}
                houses={houses}
                users={users}
                onSubmit={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                onCancelBooking={selectedBooking ? handleCancelBooking : undefined}
            />
        </Modal>
    </div>
    );
};

export default BookingsView;