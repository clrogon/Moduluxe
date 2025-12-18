import React, { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from './icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
  initialSearchTerm?: string;
}

const DataTable = <T extends { id: string }>(
  { title, columns, data, emptyState, onRowClick, initialSearchTerm }: DataTableProps<T>
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | string; direction: 'ascending' | 'descending' } | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const sortedAndFilteredData = useMemo(() => {
    let processData = [...data];

    // Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processData = processData.filter((item) =>
        Object.values(item as Object).some((val) =>
          String(val).toLowerCase().includes(lowerTerm)
        )
      );
    }

    // Sort
    if (sortConfig !== null) {
      processData.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof T];
        const bVal = b[sortConfig.key as keyof T];

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortConfig.direction === 'ascending' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        if (aVal < bVal) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return processData;
  }, [data, searchTerm, sortConfig]);

  const requestSort = (key: keyof T | string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button 
                    onClick={() => col.key !== 'actions' && requestSort(col.key)} 
                    className={`flex items-center space-x-1 focus:outline-none ${col.key !== 'actions' ? 'hover:text-gray-800 dark:hover:text-gray-200' : 'cursor-default'}`}
                    disabled={col.key === 'actions'}
                    aria-label={`Sort by ${col.label}`}
                  >
                    <span>{col.label}</span>
                    {sortConfig?.key === col.key ? (
                        sortConfig.direction === 'ascending' 
                        ? <ChevronUpIcon className="h-4 w-4" /> 
                        : <ChevronDownIcon className="h-4 w-4" />
                    ) : col.key !== 'actions' && <span className="h-4 w-4"></span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedAndFilteredData.length > 0 ? sortedAndFilteredData.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick && onRowClick(item)}
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td key={`${item.id}-${String(col.key)}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {col.render ? col.render(item) : (item[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            )) : (
                <tr>
                    <td colSpan={columns.length} className="p-0">
                        {emptyState ? emptyState : (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                {searchTerm ? t('common.noResults', { term: searchTerm }) : t('common.noData')}
                            </div>
                        )}
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;