import React, { useState, useMemo, useEffect, useRef } from 'react';
import { House, User, Contract, AppView } from '../../shared/types/index';
import { MagnifyingGlassIcon, BuildingIcon, UsersIcon, DocumentTextIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../i18n/LanguageContext';

interface GlobalSearchProps {
    houses: House[];
    users: User[];
    contracts: Contract[];
    onNavigate: (result: { view: AppView, term: string }) => void;
}

type SearchResult = {
    id: string;
    type: 'Property' | 'User' | 'Contract';
    title: string;
    subtitle: string;
    view: AppView;
    term: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ houses, users, contracts, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useMemo(() => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const allResults: SearchResult[] = [];

        // Search Houses
        houses.forEach(h => {
            if (h.address.toLowerCase().includes(lowerQuery)) {
                allResults.push({ id: `h-${h.id}`, type: 'Property', title: h.address, subtitle: `Rent: $${h.rent}`, view: AppView.HOUSES, term: h.address });
            }
        });

        // Search Users
        users.forEach(u => {
            if (u.name.toLowerCase().includes(lowerQuery) || u.email.toLowerCase().includes(lowerQuery)) {
                allResults.push({ id: `u-${u.id}`, type: 'User', title: u.name, subtitle: u.email, view: AppView.USERS, term: u.name });
            }
        });
        
        // Search Contracts
        contracts.forEach(c => {
             if (c.id.toLowerCase().includes(lowerQuery) || c.userName.toLowerCase().includes(lowerQuery) || c.houseName.toLowerCase().includes(lowerQuery)) {
                allResults.push({ id: `c-${c.id}`, type: 'Contract', title: `Contract ${c.id}`, subtitle: `${c.houseName} - ${c.userName}`, view: AppView.CONTRACTS, term: c.id });
            }
        });
        
        setResults(allResults.slice(0, 10)); // Limit to 10 results
        setIsOpen(allResults.length > 0);

    }, [query, houses, users, contracts]);
    
    const handleResultClick = (result: SearchResult) => {
        onNavigate({ view: result.view, term: result.term });
        setQuery('');
        setIsOpen(false);
    };

    const getIcon = (type: SearchResult['type']) => {
        switch(type) {
            case 'Property': return <BuildingIcon className="h-5 w-5 text-gray-400" />;
            case 'User': return <UsersIcon className="h-5 w-5 text-gray-400" />;
            case 'Contract': return <DocumentTextIcon className="h-5 w-5 text-gray-400" />;
        }
    }

    return (
        <div className="relative w-full max-w-lg" ref={searchRef}>
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setResults.length > 0 && setIsOpen(true)}
                    placeholder={t('header.searchPlaceholder')}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            {isOpen && (
                <div className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto">
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                        {results.map(result => (
                            <li key={result.id}>
                                <button 
                                    onClick={() => handleResultClick(result)}
                                    className="w-full text-left flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <div className="mr-3">{getIcon(result.type)}</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{result.subtitle}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;