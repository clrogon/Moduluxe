import { IReconciliationStrategy } from '../IReconciliationStrategy';
import { BankTransaction } from '../../../../modules/bank-reconciliation/utils/fileParser';

/**
 * Strategy implementation for Semicolon-Separated CSV formats (Common in Angolan & European banking systems, i.e., BAI/BFA/Millennium).
 */
export class SemicolonReconciliationStrategy implements IReconciliationStrategy {
    public readonly id = 'semicolon_standard';
    public readonly name = 'Regional Semicolon CSV (BFA/BAI)';
    public readonly description = 'Parses records using semicolons, supporting regional Portuguese/Angolan numeric layouts.';

    public canHandle(content: string): boolean {
        if (!content) return false;
        const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length === 0) return false;
        
        // Sniff for a semicolon
        const leadingLine = lines[0].toLowerCase();
        return leadingLine.includes(';');
    }

    public parse(content: string): BankTransaction[] {
        const lines = content.split(/\r?\n/);
        const transactions: BankTransaction[] = [];

        lines.forEach((line, index) => {
            if (!line.trim()) return;

            const lowerLine = line.toLowerCase();
            // Skip headers
            if (index === 0 || lowerLine.includes('date') || lowerLine.includes('data') || lowerLine.includes('descrição') || lowerLine.includes('montante')) {
                return;
            }

            const parts = line.split(';');
            if (parts.length >= 4) {
                let amountStr = parts[3].trim();
                
                // Format: 1.000,00 -> Remove dots, replace comma with dot
                amountStr = amountStr.replace(/\./g, '').replace(',', '.');
                amountStr = amountStr.replace(/[^0-9.-]+/g, "");
                
                const amount = parseFloat(amountStr);
                if (!isNaN(amount)) {
                    transactions.push({
                        id: `txn-semi-${Date.now()}-${index}`,
                        date: parts[0].trim(),
                        reference: parts[1].trim(),
                        description: parts[2].trim(),
                        amount: amount,
                        rawLine: line
                    });
                }
            }
        });

        return transactions;
    }
}
