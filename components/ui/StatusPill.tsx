
import React from 'react';

interface StatusPillProps {
  status: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const statusClasses: { [key: string]: string } = {
    // HouseStatus
    Available: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Occupied: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    
    // UserStatus, ContractStatus, BookingStatus
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    
    // BookingStatus
    Finished: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    
    // ContractStatus
    Expired: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Terminated: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    
    // PaymentStatus
    Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Due: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Late: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',

    // MaintenanceStatus
    Pending: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',

    // MaintenancePriority
    Low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    High: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',

    // InvoiceStatus
    Unpaid: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Overdue: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  const pillClass = statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

  return (
    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${pillClass}`}>
      {status}
    </span>
  );
};

export default StatusPill;