import { IExportStrategy, ExportSummary, ExportRow } from '../IExportStrategy';

/**
 * Strategy implementation for exportation in structural JSON nodes.
 */
export class JsonExportStrategy implements IExportStrategy {
    public readonly id = 'json';
    public readonly name = 'Structured JSON Document';
    public readonly fileExtension = 'json';

    public export(summary: ExportSummary, data: ExportRow[]): void {
        const payload = {
            metadata: {
                title: "Moduluxe Real Estate Financial Report",
                generatedAt: new Date().toISOString(),
                schema: "v1.0.0"
            },
            summary: {
                startDate: summary.startDate,
                endDate: summary.endDate,
                totalRevenue: summary.totalRevenue,
                paymentCount: summary.paymentCount,
                newBookings: summary.newBookings
            },
            records: data
        };

        const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
        const link = document.createElement("a");
        link.setAttribute("href", jsonString);
        link.setAttribute("download", `Moduluxe_Report_${summary.startDate}_to_${summary.endDate}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
