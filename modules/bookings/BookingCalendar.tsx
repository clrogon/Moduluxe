
import React, { useState } from 'react';
import { Booking } from '../../shared/types/index';

interface BookingCalendarProps {
    bookings: Booking[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    // Generate days array with padding for previous month
    const days = Array.from({ length: 42 }, (_, i) => {
        const dayNumber = i - firstDay + 1;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
        return {
            date: date,
            dayNumber: dayNumber,
            isCurrentMonth: dayNumber > 0 && dayNumber <= daysInMonth,
        };
    });

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const getBookingsForDate = (date: Date) => {
        // Simple comparison ignoring time
        const dateString = date.toISOString().split('T')[0];
        return bookings.filter(b => {
             return dateString >= b.startDate && dateString <= b.endDate;
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex space-x-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                         <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                         <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2">{day}</div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 auto-rows-fr bg-gray-200 dark:bg-gray-700 gap-[1px]">
                {days.map((dayObj, index) => {
                    const dayBookings = getBookingsForDate(dayObj.date);
                    
                    return (
                        <div 
                            key={index} 
                            className={`min-h-[100px] bg-white dark:bg-gray-800 p-2 ${!dayObj.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}`}
                        >
                            <div className="text-right text-sm font-medium mb-1">
                                {dayObj.date.getDate()}
                            </div>
                            <div className="space-y-1">
                                {dayBookings.map((b) => (
                                    <div 
                                        key={b.id} 
                                        className={`text-[10px] px-1.5 py-0.5 rounded truncate ${
                                            b.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800' :
                                            b.status === 'Finished' ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' :
                                            'bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-300'
                                        }`}
                                        title={`${b.houseName} - ${b.userName}`}
                                    >
                                        {b.houseName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingCalendar;