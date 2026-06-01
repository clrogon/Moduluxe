import { IPersistenceStrategy } from '../IPersistenceStrategy';

/**
 * In-Memory Database Strategy
 * Saves all domain records in static client-side transient containers.
 * Resets back to defaults upon browser refresh. Useful for zero-touch sandbox evaluation.
 */
export class InMemorySandboxPersistenceStrategy implements IPersistenceStrategy {
    public readonly id = 'in_memory';
    public readonly name = 'In-Memory Transient Space';
    public readonly description = 'Operates instantly inside transient client state memory. No storage footprint; wipes on refresh.';
    public readonly isConfigurable = false;

    private storageMap: Map<string, any> = new Map();

    public async initialize(): Promise<boolean> {
        return true;
    }

    public async load<T>(key: string, defaultItems: T[]): Promise<T[]> {
        if (!this.storageMap.has(key)) {
            // Seed transient cache
            this.storageMap.set(key, JSON.parse(JSON.stringify(defaultItems)));
        }
        return this.storageMap.get(key) as T[];
    }

    public async save<T>(key: string, items: T[]): Promise<boolean> {
        this.storageMap.set(key, JSON.parse(JSON.stringify(items)));
        return true;
    }
}
