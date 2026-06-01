import { IReconciliationStrategy } from '../IReconciliationStrategy';
import { BankTransaction } from '../../../../modules/bank-reconciliation/utils/fileParser';

/**
 * Strategy implementation for Standard Comma-Separated CSV formats (US Common Format).
 */
export class CsvReconciliationStrategy implements IReconciliationStrategy {
    public readonly id = 'csv_standard';
    public readonly name = 'Standard CSV (Comma Delimited)';
    public readonly description = 'Parses global transaction records separated by standard commas.';

    public canHandle(content: string): boolean {
        if (!content) return false;
        const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length === 0) return false;
        
        // Sniff for a comma on the first line that looks like transactional headers
        const leadingLine = lines[0].toLowerCase();
        return leadingLine.includes(',') && !leadingLine.includes(';');
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

            const parts = line.split(',');
            if (parts.length >= 4) {
                let amountStr = parts[3].trim();
                
                // US standard format parsing: 1,000.00
                amountStr = amountStr.replace(/,/g, '');
                amountStr = amountStr.replace(/[^0-9.-]+/g, "");
                
                const amount = parseFloat(amountStr);
                if (!isNaN(amount)) {
                    transactions.push({
                        id: `txn-csv-${Date.now()}-${index}`,
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
