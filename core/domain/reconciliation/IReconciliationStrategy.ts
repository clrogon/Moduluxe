import { BankTransaction } from '../../../modules/bank-reconciliation/utils/fileParser';

/**
 * Strategy contract for parsing and structural validation of bank reconciliation statement files.
 * Part of the Bounded Context: FinancesDomain -> ReconciliationSubdomain
 */
export interface IReconciliationStrategy {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    
    /**
     * Determines if the strategy is capable of parsing the given file input.
     * Can perform heuristic sniffing such as matching specific header schemas, delimiters, or tokens.
     */
    canHandle(content: string): boolean;

    /**
     * Parses the raw file content into standardized BankTransaction records.
     */
    parse(content: string): BankTransaction[];
}
