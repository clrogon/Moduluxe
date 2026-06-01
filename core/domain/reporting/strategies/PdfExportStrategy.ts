import { IExportStrategy, ExportSummary, ExportRow } from '../IExportStrategy';
import { PDFService } from '../../../services/pdfService';

/**
 * Strategy implementation for compiling and downloading professional PDF reports.
 */
export class PdfExportStrategy implements IExportStrategy {
    public readonly id = 'pdf';
    public readonly name = 'Professional PDF Report';
    public readonly fileExtension = 'pdf';

    public export(summary: ExportSummary, data: ExportRow[]): void {
        PDFService.generateFinancialReportPDF(summary, data);
    }
}
