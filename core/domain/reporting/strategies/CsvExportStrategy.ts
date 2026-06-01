import { IExportStrategy, ExportSummary, ExportRow } from '../IExportStrategy';

/**
 * Strategy implementation for exporting reports into clean CSV format.
 */
export class CsvExportStrategy implements IExportStrategy {
    public readonly id = 'csv';
    public readonly name = 'Comma-Separated Spreadsheet (CSV)';
    public readonly fileExtension = 'csv';

    public export(summary: ExportSummary, data: ExportRow[]): void {
        let csvContent = "data:text/csv;charset=utf-8,";
        
        // Compile summary headers and details
        csvContent += "REPORT SUMMARY\r\n";
        csvContent += `Start Date,${summary.startDate}\r\n`;
        csvContent += `End Date,${summary.endDate}\r\n`;
        csvContent += `Total Revenue (AOA),${summary.totalRevenue}\r\n`;
        csvContent += `Recorded Transactions,${summary.paymentCount}\r\n`;
        csvContent += `New Bookings,${summary.newBookings}\r\n\r\n`;
        
        // Compile grid columns
        csvContent += "TRANSACTION RECORDS\r\n";
        csvContent += "Date,Tenant,Property Address,Property Type,Amount (AOA)\r\n";
        
        // Add grid records
        data.forEach(row => {
            const cleanAddress = row.propertyAddress.replace(/"/g, '""');
            csvContent += `${row.paymentDate},"${row.tenantName}","${cleanAddress}","${row.propertyType}",${row.amount}\r\n`;
        });

        // Trigger browser download safely without iframe blocks
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Moduluxe_Report_${summary.startDate}_to_${summary.endDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
