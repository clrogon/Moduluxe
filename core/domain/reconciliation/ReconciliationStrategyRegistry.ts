import { IReconciliationStrategy } from './IReconciliationStrategy';
import { CsvReconciliationStrategy } from './strategies/CsvReconciliationStrategy';
import { SemicolonReconciliationStrategy } from './strategies/SemicolonReconciliationStrategy';
import { MulticaixaReconciliationStrategy } from './strategies/MulticaixaReconciliationStrategy';
import { BankTransaction } from '../../../modules/bank-reconciliation/utils/fileParser';

/**
 * ReconciliationStrategyRegistry
 * Thread-safe singleton managing available reconciliation file processing strategies.
 * Implements open/closed principle (OCP) - new strategies can be written and registered here without modifying view components.
 */
export class ReconciliationStrategyRegistry {
    private static instance: ReconciliationStrategyRegistry | null = null;
    private strategies: Map<string, IReconciliationStrategy> = new Map();

    private constructor() {
        // Core default Strategy registrations
        this.register(new CsvReconciliationStrategy());
        this.register(new SemicolonReconciliationStrategy());
        this.register(new MulticaixaReconciliationStrategy());
    }

    public static getInstance(): ReconciliationStrategyRegistry {
        if (!ReconciliationStrategyRegistry.instance) {
            ReconciliationStrategyRegistry.instance = new ReconciliationStrategyRegistry();
        }
        return ReconciliationStrategyRegistry.instance;
    }

    /**
     * Registers a strategy dynamically
     */
    public register(strategy: IReconciliationStrategy): void {
        this.strategies.set(strategy.id, strategy);
    }

    /**
     * Retrieves a strategy by unique ID
     */
    public getStrategy(id: string): IReconciliationStrategy | undefined {
        return this.strategies.get(id);
    }

    /**
     * Lists all registered parsing strategies
     */
    public getAllStrategies(): IReconciliationStrategy[] {
        return Array.from(this.strategies.values());
    }

    /**
     * Auto-detects the matching strategy based on the content layout and parses it.
     */
    public detectAndParse(content: string): { strategyUsed: IReconciliationStrategy; transactions: BankTransaction[] } {
        const matchingStrategy = this.getAllStrategies().find(s => s.canHandle(content));
        
        // Fallback strategy: Standard Csv
        const resolvedStrategy = matchingStrategy || this.getStrategy('csv_standard') || new CsvReconciliationStrategy();
        
        return {
            strategyUsed: resolvedStrategy,
            transactions: resolvedStrategy.parse(content)
        };
    }
}
