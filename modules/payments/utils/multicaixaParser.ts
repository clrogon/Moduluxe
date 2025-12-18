
/**
 * multicaixaParser.ts
 * Logic to parse text extracted from Multicaixa Express PDFs/Images.
 */

interface ExtractedPaymentData {
    transactionId: string;
    amount: number;
    date: string;
    recipient: string;
    iban: string | null;
}

export const parseMulticaixaText = (text: string): ExtractedPaymentData | null => {
    if (!text) return null;

    // SECURITY: Limit input length to prevent ReDoS (Regular Expression Denial of Service)
    // A standard slip shouldn't exceed 2000 chars.
    const MAX_LENGTH = 3000;
    const cleanText = text.substring(0, MAX_LENGTH);

    // 1. Extract Transaction ID
    // Pattern: "Transacção 3945975" or "Transacção: 3945975"
    // Using atomic groups notion or simpler bounded quantifiers to avoid catastrophic backtracking
    const transactionMatch = cleanText.match(/Transacç[ãa]o\s*:?\s*(\d{5,15})/i);
    if (!transactionMatch) return null;

    // 2. Extract Amount
    // Pattern: "Montante 250.000,00 Kz"
    // Handle dots/commas safely. Constrain surrounding whitespace.
    const amountMatch = cleanText.match(/Montante\s*:?\s*([\d\.,]+)\s*Kz/i);
    if (!amountMatch) return null;

    // Clean amount string: remove dots, replace comma with dot
    // "250.000,00" -> "250000.00"
    const rawAmount = amountMatch[1].replace(/\./g, '').replace(',', '.');
    const amount = parseFloat(rawAmount);
    if (isNaN(amount)) return null;

    // 3. Extract Date
    // Pattern: "Data - Hora 2023-05-13 11:48:29"
    // Strict format check YYYY-MM-DD HH:MM:SS
    const dateMatch = cleanText.match(/Data\s*-\s*Hora\s*:?\s*(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})/i);
    if (!dateMatch) return null;

    // 4. Extract Recipient (Optional validation)
    // Grab text after Destinatário until new line, max 100 chars
    const recipientMatch = cleanText.match(/Destinat[áa]rio\s*:?\s*([^\n\r]{1,100})/i);
    const recipient = recipientMatch ? recipientMatch[1].trim() : 'Unknown';

    // 5. Extract IBAN (Security validation)
    // Pattern: AO06.0004... Limit length to standard IBAN length (25 chars for AO)
    const ibanMatch = cleanText.match(/(AO\d{2}[\.\d]{21,30})/);
    const iban = ibanMatch ? ibanMatch[1] : null;

    return {
        transactionId: transactionMatch[1],
        amount,
        date: dateMatch[1],
        recipient,
        iban
    };
};
