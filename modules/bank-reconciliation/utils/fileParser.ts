
export interface BankTransaction {
    id: string;
    date: string;
    reference: string;
    description: string;
    amount: number;
    rawLine: string;
}

export const parseBankFile = (content: string): BankTransaction[] => {
    const lines = content.split(/\r?\n/);
    const transactions: BankTransaction[] = [];

    // Heuristic: Detect delimiter based on the first data-looking line
    const firstDataLine = lines.find((l, i) => l.trim().length > 0 && i < 5) || lines[0];
    const delimiter = firstDataLine && firstDataLine.includes(';') ? ';' : ',';

    lines.forEach((line, index) => {
        if (!line.trim()) return;
        
        const lowerLine = line.toLowerCase();
        // Skip header rows commonly found in bank exports
        if (index === 0 || lowerLine.includes('date') || lowerLine.includes('data') || lowerLine.includes('descrição') || lowerLine.includes('montante')) {
            return;
        }

        const parts = line.split(delimiter);
        
        // Expecting at least: Date, Reference, Description, Amount
        if (parts.length >= 4) {
            let amountStr = parts[3].trim();
            
            // Intelligent Currency Parsing
            // Case A: 1.000,00 (AO/EU format) -> Remove dots, replace comma with dot
            // Case B: 1,000.00 (US format) -> Remove commas
            
            const lastDot = amountStr.lastIndexOf('.');
            const lastComma = amountStr.lastIndexOf(',');

            if (lastComma > lastDot) {
                // Assume 1.234,56 format
                amountStr = amountStr.replace(/\./g, '').replace(',', '.');
            } else {
                // Assume 1,234.56 format
                amountStr = amountStr.replace(/,/g, '');
            }

            // Remove any remaining currency symbols or whitespace
            amountStr = amountStr.replace(/[^0-9.-]+/g, "");
            
            const amount = parseFloat(amountStr);

            if (!isNaN(amount)) {
                transactions.push({
                    id: `txn-${Date.now()}-${index}`,
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
};
