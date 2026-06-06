import { IPersistenceStrategy } from './IPersistenceStrategy';
import { InMemorySandboxPersistenceStrategy } from './strategies/InMemorySandboxPersistenceStrategy';
import { LocalStoragePersistenceStrategy } from './strategies/LocalStoragePersistenceStrategy';
import { SupabasePersistenceStrategy } from './strategies/SupabasePersistenceStrategy';

/**
 * PersistenceStrategyRegistry
 * Thread-safe singleton containing all supported database persistence engine options.
 * Respects the Open-Closed Principle (OCP)—plug in new storage mediums (e.g. IndexedDB, LocalForage) effortlessly.
 */
export class PersistenceStrategyRegistry {
    private static instance: PersistenceStrategyRegistry | null = null;
    private strategies: Map<string, IPersistenceStrategy> = new Map();
    private activeStrategyId: string = 'local_storage';

    private constructor() {
        this.register(new LocalStoragePersistenceStrategy());
        this.register(new InMemorySandboxPersistenceStrategy());
        this.register(new SupabasePersistenceStrategy());

        if (typeof window !== 'undefined') {
            const savedId = localStorage.getItem('moduluxe_active_persistence_strategy_id');
            if (savedId && this.strategies.has(savedId)) {
                this.activeStrategyId = savedId;
            } else {
                // Auto-select Supabase when env vars are configured
                const env = (import.meta as any).env || {};
                if (env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY) {
                    this.activeStrategyId = 'supabase';
                }
            }
        }
    }

    public static getInstance(): PersistenceStrategyRegistry {
        if (!PersistenceStrategyRegistry.instance) {
            PersistenceStrategyRegistry.instance = new PersistenceStrategyRegistry();
        }
        return PersistenceStrategyRegistry.instance;
    }

    /**
     * Dynamically enrolls a new strategy.
     */
    public register(strategy: IPersistenceStrategy): void {
        this.strategies.set(strategy.id, strategy);
    }

    /**
     * Retrieves all available database choices.
     */
    public getAllStrategies(): IPersistenceStrategy[] {
        return Array.from(this.strategies.values());
    }

    /**
     * Gets the currently selected active persistence strategy.
     */
    public getActiveStrategy(): IPersistenceStrategy {
        const strategy = this.strategies.get(this.activeStrategyId);
        return strategy || new LocalStoragePersistenceStrategy();
    }

    /**
     * Updates the active persistence strategy choice.
     */
    public setActiveStrategy(id: string): void {
        if (this.strategies.has(id)) {
            this.activeStrategyId = id;
            if (typeof window !== 'undefined') {
                localStorage.setItem('moduluxe_active_persistence_strategy_id', id);
            }
        }
    }
}
