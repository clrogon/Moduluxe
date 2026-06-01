/**
 * Strategy contract for Bounded Context: PersistenceSubdomain
 * Standardizes read/write interfaces across client-side sandbox environments and remote live engines.
 */
export interface IPersistenceStrategy {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly isConfigurable: boolean;

    /**
     * Bootstraps standard validation or authentications.
     */
    initialize(): Promise<boolean>;

    /**
     * Retrieves collections from the persistent database medium.
     */
    load<T>(key: string, defaultItems: T[]): Promise<T[]>;

    /**
     * Persists altered entities securely in the active storage layer.
     */
    save<T>(key: string, items: T[]): Promise<boolean>;
}
