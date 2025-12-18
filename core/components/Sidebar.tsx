
import React from 'react';
import { AppView, User } from '../../shared/types/index';
import { moduleConfig } from '../../modules/modules.config';
import { useTranslation } from '../i18n/LanguageContext';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  currentUser: User | null;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ icon, label, isActive, onClick, disabled = false }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 text-left rounded-md ${
        isActive
          ? 'bg-blue-600 text-white shadow'
          : disabled 
          ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
      {disabled && <span className="ml-auto text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">{t('sidebar.future')}</span>}
    </button>
  );
};

const NavSection: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    children ? (
      <div>
          <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h3>
          <div className="space-y-1">
              {children}
          </div>
      </div>
    ) : null
);


const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, currentUser, onLogout, isOpen, onClose }) => {
  const { t } = useTranslation();
  
  const filterModules = (modules: typeof moduleConfig['core']) => {
    if (!currentUser) return [];
    return modules.filter(m => !m.allowedRoles || m.allowedRoles.includes(currentUser.type));
  };

  const handleNavClick = (view: AppView) => {
    setView(view);
    onClose(); // Close sidebar on mobile when link is clicked
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-transform duration-300 ease-in-out transform 
        md:static md:translate-x-0 flex flex-col border-r border-gray-200 dark:border-gray-700
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h1 className="text-2xl font-bold tracking-wider text-gray-800 dark:text-gray-100">Moduluxe</h1>
        </div>
        
        <div className="flex flex-col items-center py-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
                {currentUser?.name.charAt(0)}
            </div>
            <h3 className="mt-2 font-medium text-sm text-gray-800 dark:text-gray-100">{currentUser?.name}</h3>
            <span className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded mt-1">
                {currentUser?.type}
            </span>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
          {Object.entries(moduleConfig).map(([sectionKey, modules]) => {
              const visibleModules = filterModules(modules);
              if (visibleModules.length === 0) return null;

              return (
                  <NavSection title={t(`sidebar.sections.${sectionKey}`)} key={sectionKey}>
                      {visibleModules.map((item) => (
                          <NavLink
                              key={item.key}
                              icon={item.icon}
                              label={t(item.name)}
                              isActive={currentView === item.key}
                              onClick={() => handleNavClick(item.key)}
                              disabled={!item.enabled}
                          />
                      ))}
                  </NavSection>
              );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button 
              onClick={() => { onLogout(); onClose(); }}
              className="w-full text-left flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {t('sidebar.signOut')}
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-500">&copy; 2024 Moduluxe Inc.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
