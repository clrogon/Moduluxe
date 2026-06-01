import { IPersistenceStrategy } from '../IPersistenceStrategy';

/**
 * LocalStorage Database Strategy
 * Persists collections securely into browser LocalStorage keys.
 * Offers standard persistence that survives window refreshes and browser restarts.
 */
export class LocalStoragePersistenceStrategy implements IPersistenceStrategy {
    public readonly id = 'local_storage';
    public readonly name = 'Local Web Storage Persistent';
    public readonly description = 'Syncs automatically to your local browser storage. Accessible privately on this device.';
    public readonly isConfigurable = false;

    private readonly prefix = 'moduluxe_strategy_';

    public async initialize(): Promise<boolean> {
        return true;
    }

    public async load<T>(key: string, defaultItems: T[]): Promise<T[]> {
        if (typeof window === 'undefined') return defaultItems;
        try {
            const raw = localStorage.getItem(`${this.prefix}${key}`);
            if (!raw) {
                // Initialize localStorage with initial schema
                localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(defaultItems));
                return defaultItems;
            }
            return JSON.parse(raw) as T[];
        } catch (error) {
            console.error(`LocalStorageStrategy: Fail to read key "${key}"`, error);
            return defaultItems;
        }
    }

    public async save<T>(key: string, items: T[]): Promise<boolean> {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(items));
            return true;
        } catch (error) {
            console.error(`LocalStorageStrategy: Fail to write key "${key}"`, error);
            return false;
        }
    }
}
