
import React, { useState, useRef, useMemo } from 'react';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { ArrowDownTrayIcon, DocumentTextIcon, CheckCircleIcon, ExclamationCircleIcon, SpinnerIcon } from '../../components/ui/icons/Icons';
import { parseBankFile, BankTransaction } from './utils/fileParser';
import { Payment } from '../../shared/types/index';
import { formatCurrency } from '../../core/utils/format';
import { useToast } from '../../core/context/ToastContext';

interface BankReconciliationViewProps {
    payments: Payment[];
    onProcessPayment: (paymentId: string, proofData: { transactionId: string; date: string; amount: number }) => void;
}

interface ReconciledRow extends BankTransaction {
    status: 'Matched' | 'Unmatched' | 'Processed';
    matchedPaymentId?: string;
    matchConfidence: number;
}

const BankReconciliationView: React.FC<BankReconciliationViewProps> = ({ payments, onProcessPayment }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [transactions, setTransactions] = useState<ReconciledRow[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const parsed = parseBankFile(content);
            
            // Auto-matching logic
            const matched = parsed.map(txn => {
                // Find a payment that is Due or Late, matches amount, and potentially matches ID/Contract in description
                const match = payments.find(p => {
                    const isAmountMatch = Math.abs(p.amount - txn.amount) < 1; // Tolerance for floating point
                    const isPending = p.status === 'Due' || p.status === 'Late';
                    // Check if description contains contract ID or if transaction ID matches stored ref (unlikely for new file but good for re-runs)
                    const descriptionMatch = txn.description.toLowerCase().includes(p.contractId.toLowerCase());
                    
                    return isAmountMatch && isPending && descriptionMatch;
                });

                return {
                    ...txn,
                    status: match ? 'Matched' : 'Unmatched',
                    matchedPaymentId: match?.id,
                    matchConfidence: match ? 100 : 0
                } as ReconciledRow;
            });

            setTransactions(matched);
        };
        reader.readAsText(file);
    };

    const handleManualMatch = (txnId: string, paymentId: string) => {
        setTransactions(prev => prev.map(t => {
            if (t.id === txnId) {
                return {
                    ...t,
                    status: 'Matched',
                    matchedPaymentId: paymentId,
                    matchConfidence: 100 // Manually assigned
                };
            }
            return t;
        }));
    };

    const handleProcessAll = () => {
        setIsProcessing(true);
        setTimeout(() => {
            let processedCount = 0;
            const newTransactions = transactions.map(txn => {
                if (txn.status === 'Matched' && txn.matchedPaymentId) {
                    onProcessPayment(txn.matchedPaymentId, {
                        transactionId: txn.reference,
                        date: txn.date,
                        amount: txn.amount
                    });
                    processedCount++;
                    return { ...txn, status: 'Processed' as const };
                }
                return txn;
            });
            
            setTransactions(newTransactions);
            setIsProcessing(false);
            showToast('success', `${processedCount} payments successfully reconciled.`);
        }, 1000);
    };

    // Filter payments available for manual matching (Due/Late and not already matched in current session)
    const getAvailablePayments = (currentMatchedId?: string) => {
        const matchedIds = new Set(transactions.map(t => t.matchedPaymentId).filter(id => id !== undefined));
        return payments.filter(p => {
            const isPending = p.status === 'Due' || p.status === 'Late';
            const notMatchedYet = !matchedIds.has(p.id) || p.id === currentMatchedId;
            return isPending && notMatchedYet;
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('reconciliation.title')}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('reconciliation.subtitle')}</p>
                </div>
                {transactions.length > 0 && (
                    <button
                        onClick={handleProcessAll}
                        disabled={isProcessing || transactions.filter(t => t.status === 'Matched').length === 0}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? <SpinnerIcon className="animate-spin h-5 w-5 mr-2" /> : <CheckCircleIcon className="h-5 w-5 mr-2" />}
                        {t('reconciliation.processButton')}
                    </button>
                )}
            </div>

            {transactions.length === 0 ? (
                <div 
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ArrowDownTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{t('reconciliation.uploadTitle')}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('reconciliation.uploadDesc')}</p>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".csv,.txt"
                        onChange={handleFileUpload}
                    />
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 uppercase">
                                <tr>
                                    <th className="px-6 py-3">{t('reconciliation.colDate')}</th>
                                    <th className="px-6 py-3">{t('reconciliation.colRef')}</th>
                                    <th className="px-6 py-3">{t('reconciliation.colDesc')}</th>
                                    <th className="px-6 py-3">{t('reconciliation.colAmount')}</th>
                                    <th className="px-6 py-3">{t('reconciliation.colStatus')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {transactions.map((txn) => (
                                    <tr key={txn.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{txn.date}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{txn.reference}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate" title={txn.description}>{txn.description}</td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                                            {txn.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                        </td>
                                        <td className="px-6 py-4">
                                            {txn.status === 'Processed' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    {t('reconciliation.statusProcessed')}
                                                </span>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    {txn.status === 'Matched' ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                            {t('reconciliation.statusMatched')}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                                                            <ExclamationCircleIcon className="w-3 h-3 mr-1" />
                                                            {t('reconciliation.statusUnmatched')}
                                                        </span>
                                                    )}
                                                    
                                                    {/* Manual Match Dropdown */}
                                                    {(txn.status === 'Unmatched' || txn.status === 'Matched') && (
                                                        <select
                                                            className="ml-2 block w-40 pl-2 pr-8 py-1 text-xs border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                            value={txn.matchedPaymentId || ''}
                                                            onChange={(e) => handleManualMatch(txn.id, e.target.value)}
                                                        >
                                                            <option value="">{t('reconciliation.selectPayment')}</option>
                                                            {getAvailablePayments(txn.matchedPaymentId).map(p => (
                                                                <option key={p.id} value={p.id}>
                                                                    {p.amount.toLocaleString()} - {p.contractId}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('reconciliation.summary', { 
                                count: transactions.length, 
                                matched: transactions.filter(t => t.status === 'Matched').length 
                            })}
                        </p>
                        <button 
                            onClick={() => { setTransactions([]); if(fileInputRef.current) fileInputRef.current.value = '' }}
                            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                        >
                            {t('common.cancel')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankReconciliationView;
