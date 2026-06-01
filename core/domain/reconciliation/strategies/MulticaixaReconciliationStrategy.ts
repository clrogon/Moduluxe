import { IReconciliationStrategy } from '../IReconciliationStrategy';
import { BankTransaction } from '../../../../modules/bank-reconciliation/utils/fileParser';
import { parseMulticaixaText } from '../../../../modules/payments/utils/multicaixaParser';

/**
 * Strategy implementation for Multicaixa Express receipt content.
 * Allows pasting or uploading raw OCR text slips into the batch reconciliation window.
 */
export class MulticaixaReconciliationStrategy implements IReconciliationStrategy {
    public readonly id = 'multicaixa_slip';
    public readonly name = 'Multicaixa Express Slip OCR';
    public readonly description = 'Parses direct digital receipts or extracted OCR strings from Multicaixa Express.';

    public canHandle(content: string): boolean {
        if (!content) return false;
        const lower = content.toLowerCase();
        // Sniff for Multicaixa receipts signatures
        return lower.includes('multicaixa') || lower.includes('transacç') || lower.includes('express');
    }

    public parse(content: string): BankTransaction[] {
        const parsed = parseMulticaixaText(content);
        if (!parsed) return [];

        return [{
            id: `txn-mcx-${parsed.transactionId}`,
            date: parsed.date,
            reference: parsed.transactionId,
            description: `Multicaixa Verification Slip - IBAN: ${parsed.iban || 'N/A'} - Recipient: ${parsed.recipient}`,
            amount: parsed.amount,
            rawLine: content
        }];
    }
}
