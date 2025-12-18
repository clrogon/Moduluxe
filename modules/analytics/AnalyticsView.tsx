
import React, { useMemo } from 'react';
import DashboardCard from '../../components/ui/DashboardCard';
import BarChart from '../../components/ui/BarChart';
import DonutChart from '../../components/ui/DonutChart';
import { BuildingIcon, UsersIcon, DocumentTextIcon, CreditCardIcon, ChartPieIcon } from '../../components/ui/icons/Icons';
import { House, User, Contract, Payment, MonthlyRevenue, ActivityFeedItem, Booking, LocalizationPreferences } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { formatCurrency } from '../../core/utils/format';

interface AnalyticsViewProps {
  houses: House[];
  users: User[];
  contracts: Contract[];
  payments: Payment[];
  monthlyRevenue: MonthlyRevenue[];
  activityFeed: ActivityFeedItem[];
  bookings: Booking[];
  localizationPreferences: LocalizationPreferences;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ houses, users, contracts, payments, monthlyRevenue, activityFeed, bookings, localizationPreferences }) => {
  const { t } = useTranslation();
  const activeContracts = contracts.filter(c => c.status === 'Active').length;
  const occupiedHouses = houses.filter(p => p.status === 'Occupied').length;
  const totalUsers = users.length;
  const duePayments = payments.filter(p => p.status === 'Due' || p.status === 'Late').length;
  
  const occupancyRate = houses.length > 0 ? Math.round((occupiedHouses / houses.length) * 100) : 0;
  
  const totalRevenueYTD = monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0);

  const revenueByHouseType = useMemo(() => {
    const revenueMap: { [key: string]: number } = { 'Apartment': 0, 'House': 0, 'Condo': 0 };
    payments.forEach(payment => {
      const contract = contracts.find(c => c.id === payment.contractId);
      if (contract) {
        const booking = bookings.find(b => b.id === contract.bookingId);
        if (booking) {
          const house = houses.find(h => h.id === booking.houseId);
          if (house && revenueMap[house.type] !== undefined) {
            revenueMap[house.type] += payment.amount;
          }
        }
      }
    });
    return Object.entries(revenueMap).map(([name, value]) => ({ name, value })).filter(item => item.value > 0);
  }, [payments, contracts, bookings, houses]);

  const feedIcon = (type: ActivityFeedItem['type']) => {
    switch(type) {
      case 'payment': return <CreditCardIcon className="h-5 w-5 text-green-500" />;
      case 'contract': return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'user': return <UsersIcon className="h-5 w-5 text-purple-500" />;
      default: return <UsersIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title={t('analytics.totalRevenue')} value={formatCurrency(totalRevenueYTD, localizationPreferences)} icon={<CreditCardIcon className="h-8 w-8 text-green-500" />} />
            <DashboardCard title={t('analytics.activeContracts')} value={activeContracts.toString()} icon={<DocumentTextIcon className="h-8 w-8 text-blue-500" />} />
            <DashboardCard title={t('analytics.totalUsers')} value={totalUsers.toString()} icon={<UsersIcon className="h-8 w-8 text-purple-500" />} />
            <DashboardCard title={t('analytics.paymentsDue')} value={duePayments.toString()} icon={<CreditCardIcon className="h-8 w-8 text-red-500" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('analytics.revenueOverview')}</h3>
                    <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                        <option>{t('analytics.thisYear')}</option>
                        <option>{t('analytics.lastYear')}</option>
                    </select>
                </div>
                <div className="h-80">
                    <BarChart data={monthlyRevenue} />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                     <DonutChart data={revenueByHouseType} title={t('analytics.revenueByProperty')}/>
                </div>
            </div>
        </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{t('analytics.recentActivity')}</h3>
                 <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {activityFeed.map(item => (
                        <li key={item.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 p-2 rounded-full mt-1">
                                {feedIcon(item.type)}
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item.description}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.timestamp.toLocaleDateString()}</p>
                            </div>
                        </li>
                    ))}
                     {activityFeed.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">{t('analytics.noActivity')}</p>}
                 </ul>
            </div>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center border border-gray-200 dark:border-gray-700">
                 <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('analytics.occupancyRate')}</h3>
                 <div className="relative h-40 w-40 flex items-center justify-center">
                    <svg className="transform -rotate-90 w-full h-full">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="15" fill="transparent" className="text-gray-200 dark:text-gray-700" />
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="15" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * occupancyRate) / 100} className="text-blue-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <span className="absolute text-3xl font-bold text-gray-800 dark:text-gray-100">{occupancyRate}%</span>
                 </div>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('analytics.propertiesOccupied', { occupied: occupiedHouses, total: houses.length })}</p>
            </div>
         </div>
    </div>
  );
};

export default AnalyticsView;
