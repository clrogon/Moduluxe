
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, CloseIcon } from '../../components/ui/icons/Icons';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center w-full max-w-xs p-4 space-x-3 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border-l-4 ${
              toast.type === 'success' ? 'border-green-500' :
              toast.type === 'error' ? 'border-red-500' : 'border-blue-500'
            }`}
            role="alert"
          >
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
               toast.type === 'success' ? 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200' :
               toast.type === 'error' ? 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200' : 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200'
            }`}>
               {toast.type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
               {toast.type === 'error' && <ExclamationCircleIcon className="w-5 h-5" />}
               {toast.type === 'info' && <InformationCircleIcon className="w-5 h-5" />}
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
