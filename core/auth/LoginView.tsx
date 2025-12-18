import React, { useState } from 'react';
import { User } from '../../shared/types/index';
import { SpinnerIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../i18n/LanguageContext';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<User['type'] | null>(null);
  const { t } = useTranslation();

  const handleDemoLogin = (role: User['type']) => {
    setIsLoading(true);
    setLoadingRole(role);
    // Simulate network request
    setTimeout(() => {
      const mockUser: User = {
        id: `u-${role.toLowerCase()}`,
        name: role === 'Admin' ? 'System Administrator' : role === 'Owner' ? 'Diana Prince' : 'Alice Johnson',
        email: `${role.toLowerCase()}@moduluxe.com`,
        phone: '555-0000',
        status: 'Active',
        type: role,
      };
      onLogin(mockUser);
      setIsLoading(false);
      setLoadingRole(null);
    }, 800);
  };
  
  const DemoButton: React.FC<{role: User['type']}> = ({role}) => (
    <button
        onClick={() => handleDemoLogin(role)}
        className={`w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
    >
        {isLoading && loadingRole === role ? (
            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" />
        ) : null}
        {role}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">M</span>
            </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('login.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('login.subtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('login.emailLabel')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={t('login.emailPlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('login.passwordLabel')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={t('login.passwordPlaceholder')}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                disabled
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 opacity-50 cursor-not-allowed"
              >
                {t('login.signInButton')}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('login.demoSeparator')}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
                <DemoButton role="Admin" />
                <DemoButton role="Owner" />
                <DemoButton role="Tenant" />
            </div>
            {isLoading && (
                <div className="mt-4 text-center text-sm text-blue-600">
                    {t('login.authenticating', { role: loadingRole })}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;