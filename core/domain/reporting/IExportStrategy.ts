export interface ExportSummary {
    totalRevenue: number;
    paymentCount: number;
    newBookings: number;
    startDate: string;
    endDate: string;
}

export interface ExportRow {
    paymentDate: string;
    tenantName: string;
    propertyAddress: string;
    propertyType: string;
    amount: number;
}

/**
 * Strategy contract for document and report generation.
 * Part of the Bounded Context: FinancesDomain -> ReportingSubdomain
 */
export interface IExportStrategy {
    readonly id: string;
    readonly name: string;
    readonly fileExtension: string;
    
    export(summary: ExportSummary, data: ExportRow[]): void;
}
