import { IExportStrategy } from './IExportStrategy';
import { PdfExportStrategy } from './strategies/PdfExportStrategy';
import { CsvExportStrategy } from './strategies/CsvExportStrategy';
import { JsonExportStrategy } from './strategies/JsonExportStrategy';

/**
 * ExportContext
 * Follows the classic GoF Strategy Pattern Context model.
 * Manages active strategies and lets views retrieve or swap engines dynamically.
 */
export class ExportContext {
    private static instance: ExportContext | null = null;
    private strategies: Map<string, IExportStrategy> = new Map();
    private activeStrategyId: string = 'pdf';

    private constructor() {
        this.register(new PdfExportStrategy());
        this.register(new CsvExportStrategy());
        this.register(new JsonExportStrategy());
    }

    public static getInstance(): ExportContext {
        if (!ExportContext.instance) {
            ExportContext.instance = new ExportContext();
        }
        return ExportContext.instance;
    }

    public register(strategy: IExportStrategy): void {
        this.strategies.set(strategy.id, strategy);
    }

    public getActiveStrategy(): IExportStrategy {
        const strategy = this.strategies.get(this.activeStrategyId);
        return strategy || new PdfExportStrategy();
    }

    public setActiveStrategy(id: string): void {
        if (this.strategies.has(id)) {
            this.activeStrategyId = id;
        }
    }

    public getAllStrategies(): IExportStrategy[] {
        return Array.from(this.strategies.values());
    }
}
