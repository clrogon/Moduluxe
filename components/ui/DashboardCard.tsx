import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-transform transform hover:scale-105">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;