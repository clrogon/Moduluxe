import { Invoice, Contract, User, House } from '../../shared/types/index';

// Global declaration for jspdf provided via CDN
declare const jspdf: any;

interface FinancialReportSummary {
    totalRevenue: number;
    paymentCount: number;
    newBookings: number;
    startDate: string;
    endDate: string;
}

interface FinancialReportRow {
    paymentDate: string;
    tenantName: string;
    propertyAddress: string;
    propertyType: string;
    amount: number;
}

export const PDFService = {
    generateFinancialReportPDF: (summary: FinancialReportSummary, data: FinancialReportRow[]) => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.text("Moduluxe Financial Report", 14, 22);
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Period: ${summary.startDate} to ${summary.endDate}`, 14, 36);

        // Summary Box
        doc.setDrawColor(200);
        doc.setFillColor(245, 247, 250);
        doc.rect(14, 45, 182, 25, 'FD');

        doc.setFontSize(10);
        doc.setTextColor(50);
        doc.text("Total Revenue", 20, 55);
        doc.text("Transactions", 90, 55);
        doc.text("New Bookings", 160, 55);

        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(summary.totalRevenue.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' }), 20, 63);
        doc.text(summary.paymentCount.toString(), 90, 63);
        doc.text(summary.newBookings.toString(), 160, 63);

        // Table
        const tableColumn = ["Date", "Tenant", "Property", "Type", "Amount"];
        const tableRows = [];

        data.forEach(row => {
            const rowData = [
                row.paymentDate,
                row.tenantName,
                row.propertyAddress,
                row.propertyType,
                row.amount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 80,
            theme: 'grid',
            headStyles: { fillColor: [66, 133, 244] },
            styles: { fontSize: 9 },
        });

        doc.save(`Moduluxe_Financial_Report_${summary.startDate}.pdf`);
    },

    generateInvoicePDF: (invoice: Invoice, contract: Contract | undefined, user: User | undefined, house: House | undefined) => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF();

        // Company Header
        doc.setFontSize(22);
        doc.setTextColor(41, 128, 185);
        doc.text("INVOICE", 150, 20);

        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("Moduluxe Real Estate", 14, 20);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Luanda, Angola", 14, 26);
        doc.text("Phone: +244 222 000 000", 14, 31);
        doc.text("Email: billing@moduluxe.ao", 14, 36);

        // Line
        doc.setDrawColor(200);
        doc.line(14, 45, 196, 45);

        // Bill To
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Bill To:", 14, 55);
        
        doc.setFontSize(10);
        doc.setTextColor(80);
        if (user) {
            doc.text(user.name, 14, 62);
            doc.text(user.email, 14, 67);
            doc.text(user.phone, 14, 72);
        } else {
            doc.text("Unknown Tenant", 14, 62);
        }

        // Invoice Details
        doc.setFontSize(10);
        doc.text(`Invoice #: ${invoice.id}`, 140, 55);
        doc.text(`Date: ${invoice.issuedDate}`, 140, 60);
        doc.text(`Due Date: ${invoice.dueDate}`, 140, 65);
        doc.text(`Status: ${invoice.status}`, 140, 70);

        // Property Details
        if (house) {
            doc.text(`Property: ${house.address}`, 14, 85);
        }

        // Line Items Table
        const tableColumn = ["Description", "Amount"];
        const tableRows = [
            [`Rent Payment - Contract ${contract?.id || 'N/A'}`, invoice.amount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })]
        ];

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 95,
            theme: 'striped',
            headStyles: { fillColor: [52, 73, 94] },
        });

        // Total
        const finalY = (doc as any).lastAutoTable.finalY || 120;
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(`Total: ${invoice.amount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}`, 140, finalY + 15);

        // Footer
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text("Thank you for your business.", 14, finalY + 30);
        doc.text("Please pay via Multicaixa Express or Bank Transfer.", 14, finalY + 35);

        doc.save(`Invoice_${invoice.id}.pdf`);
    }
};