
import React, { useState, useRef, useEffect } from 'react';
import { AppView, Notification, House, User, Contract } from '../../shared/types/index';
import { BellIcon, Bars3Icon, BellAlertIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../i18n/LanguageContext';
import GlobalSearch from './GlobalSearch';

interface HeaderProps {
  currentView: AppView;
  notifications: Notification[];
  onMenuClick: () => void;
  onMarkAllRead?: () => void;
  houses: House[];
  users: User[];
  contracts: Contract[];
  onSearchNavigate: (result: { view: AppView, term: string }) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, notifications, onMenuClick, onMarkAllRead, houses, users, contracts, onSearchNavigate }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
      setShowNotifications(!showNotifications);
  };
  
  const getViewTranslationKey = (view: AppView) => {
      const keyMap: Record<AppView, string> = {
          [AppView.ANALYTICS]: 'sidebar.analytics',
          [AppView.USERS]: 'sidebar.users',
          [AppView.HOUSES]: 'sidebar.houses',
          [AppView.BOOKINGS]: 'sidebar.bookings',
          [AppView.PAYMENTS]: 'sidebar.payments',
          [AppView.CONTRACTS]: 'sidebar.contracts',
          [AppView.COMMUNICATIONS]: 'sidebar.communications',
          [AppView.MAINTENANCE]: 'sidebar.maintenance',
          [AppView.INVOICES]: 'sidebar.invoices',
          [AppView.DOCUMENTS]: 'sidebar.documents',
          [AppView.REPORTING]: 'sidebar.reporting',
          [AppView.SETTINGS]: 'sidebar.settings',
          [AppView.TENANT_PORTAL]: 'sidebar.myPortal',
          [AppView.AUTOMATIONS]: 'sidebar.automations',
          [AppView.AUDIT_LOG]: 'sidebar.auditLog',
          [AppView.LEADS]: 'sidebar.leads',
          [AppView.BANK_RECONCILIATION]: 'sidebar.reconciliation',
      };
      return keyMap[view] || view;
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 mr-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 truncate">{t(getViewTranslationKey(currentView))}</h2>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <GlobalSearch 
            houses={houses} 
            users={users} 
            contracts={contracts} 
            onNavigate={onSearchNavigate}
        />
      </div>

      <div className="flex items-center" ref={dropdownRef}>
        <button 
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-500 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring"
        >
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
            <div className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{t('header.notifications')}</h3>
                    {unreadCount > 0 && onMarkAllRead && (
                        <button 
                            onClick={onMarkAllRead}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                            {t('header.markAllRead')}
                        </button>
                    )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                            {notifications.map((notification) => (
                                <li key={notification.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 mt-0.5 ${
                                            notification.type === 'WARNING' ? 'text-yellow-500' :
                                            notification.type === 'SUCCESS' ? 'text-green-500' : 'text-blue-500'
                                        }`}>
                                            <BellAlertIcon className="h-5 w-5" />
                                        </div>
                                        <div className="ml-3 w-0 flex-1">
                                            <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300'}`}>
                                                {notification.message}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                {new Date(notification.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="ml-2 flex-shrink-0">
                                                <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                           {t('header.noNotifications')}
                        </div>
                    )}
                </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;