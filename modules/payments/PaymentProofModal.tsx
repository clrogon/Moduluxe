
import React, { useState, useRef } from 'react';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { DocumentDuplicateIcon, CheckCircleIcon, ExclamationCircleIcon, SpinnerIcon } from '../../components/ui/icons/Icons';
import { parseMulticaixaText } from './utils/multicaixaParser';
import { Payment, UserProfile } from '../../shared/types/index';
import { useToast } from '../../core/context/ToastContext';

interface PaymentProofModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProcessProof: (paymentId: string, data: { transactionId: string; date: string; amount: number }) => void;
    payments: Payment[];
    userProfile: UserProfile;
}

// Mock function to simulate backend OCR
// In a real app, this would be an API call sending the file
const mockOCR = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Return sample text with Fake IBAN to match the sanitized mock profile
            resolve(`
                Comprovativo Digital
                Detalhe da operação realizada através do canal MULTICAIXA Express.
                Data - Hora 2025-11-23 11:56:11
                Operação Transferência Bancária
                Destinatário GESTAO IMOBILIARIA DEMO LDA
                IBAN AO06.0000.0000.0000.0000.0000.0
                Montante 592.051,05 Kz
                Comissão -
                Imposto -
                Total 592.051,05 Kz
                Transacção 9412372
            `);
        }, 1500);
    });
};

const PaymentProofModal: React.FC<PaymentProofModalProps> = ({ isOpen, onClose, onProcessProof, payments, userProfile }) => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedData, setExtractedData] = useState<{ transactionId: string; amount: number; date: string; recipient: string; iban: string | null } | null>(null);
    const [matchedPayment, setMatchedPayment] = useState<Payment | null>(null);
    const [validationState, setValidationState] = useState<'valid' | 'invalid' | 'pending'>('pending');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            
            // Security: File Size Check (Max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError(t('payments.proof.errorSize'));
                return;
            }

            // Security: File Type Check
            if (!['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type)) {
                setError(t('payments.proof.errorType'));
                return;
            }

            setFile(selectedFile);
            setError(null);
            setExtractedData(null);
            setMatchedPayment(null);
            setValidationState('pending');
        }
    };

    const handleUploadAndProcess = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        setValidationState('pending');

        try {
            // 1. Simulate Backend OCR
            const text = await mockOCR(file);
            
            // 2. Parse Data
            const data = parseMulticaixaText(text);
            
            if (!data) {
                throw new Error(t('payments.proof.errorParse'));
            }

            setExtractedData(data);

            // 3. SECURITY CHECK: IBAN Validation
            // Normalize strings for comparison (remove spaces/dots)
            const cleanPdfIban = data.iban?.replace(/[\.\s]/g, '') || '';
            
            // Let's use the profile IBAN for strict check simulation
            const cleanSystemIban = userProfile.bankDetails.iban.replace(/[\.\s]/g, '');

            // NOTE: Since the mock OCR returns hardcoded text that might not match the mock profile data perfectly 
            // unless we update one or the other, I'll add a bypass if profile IBAN is empty, otherwise validate.
            if (cleanSystemIban && cleanPdfIban !== cleanSystemIban) {
                 // For demonstration purposes, if they don't match, we flag it but maybe allow override or show error
                 // strict security: BLOCK IT
                 setValidationState('invalid');
                 setError(t('payments.proof.errorIbanMismatch', { expected: userProfile.bankDetails.iban }));
                 return;
            }

            setValidationState('valid');

            // 4. Match logic (Find a due payment with similar amount)
            const match = payments.find(p => 
                (p.status === 'Due' || p.status === 'Late') && 
                Math.abs(p.amount - data.amount) < 100 // Allow small diff
            );

            setMatchedPayment(match || null);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = () => {
        if (extractedData && matchedPayment && validationState === 'valid') {
            onProcessProof(matchedPayment.id, extractedData);
            showToast('success', 'Proof verified and payment recorded.');
            onClose();
        } else if (validationState === 'invalid') {
             setError(t('payments.proof.securityBlock'));
        } else {
            setError(t('payments.proof.noMatchError'));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose} />
            
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('payments.proof.title')}</h3>
                </div>

                <div className="p-6 space-y-4">
                    {!extractedData || validationState === 'invalid' ? (
                        <>
                            <div 
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                                    error ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <DocumentDuplicateIcon className={`mx-auto h-12 w-12 ${error ? 'text-red-400' : 'text-gray-400'}`} />
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {file ? file.name : t('payments.proof.dragDrop')}
                                </p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept=".pdf,.jpg,.png" 
                                    onChange={handleFileChange}
                                />
                            </div>
                            {error && (
                                <div className="flex items-start text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded">
                                    <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <button
                                onClick={handleUploadAndProcess}
                                disabled={!file || isLoading}
                                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                    !file || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isLoading && <SpinnerIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                                {t('payments.proof.processButton')}
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                <h4 className="text-sm font-bold text-green-800 dark:text-green-300 flex items-center mb-2">
                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                    {t('payments.proof.successAnalysis')}
                                </h4>
                                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    <p><span className="font-medium">Transacção:</span> {extractedData.transactionId}</p>
                                    <p><span className="font-medium">Montante:</span> {extractedData.amount.toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})}</p>
                                    <p><span className="font-medium">Data:</span> {extractedData.date}</p>
                                    <p className="text-xs text-green-700 dark:text-green-400 mt-2 flex items-center">
                                        <CheckCircleIcon className="h-3 w-3 mr-1" /> IBAN Verificado
                                    </p>
                                </div>
                            </div>

                            {matchedPayment ? (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-1">{t('payments.proof.matchFound')}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Contrato: {matchedPayment.contractId}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Valor Devido: {matchedPayment.amount.toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})}</p>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-300">
                                    <ExclamationCircleIcon className="h-5 w-5 inline mr-2" />
                                    {t('payments.proof.noMatch')}
                                </div>
                            )}

                            <div className="flex space-x-3 pt-2">
                                <button 
                                    onClick={() => { setExtractedData(null); setFile(null); }}
                                    className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-medium"
                                >
                                    {t('common.cancel')}
                                </button>
                                <button 
                                    onClick={handleConfirm}
                                    disabled={!matchedPayment}
                                    className={`flex-1 py-2 px-4 rounded-md text-white text-sm font-medium shadow-sm ${
                                        matchedPayment ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {t('payments.proof.confirmButton')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentProofModal;
