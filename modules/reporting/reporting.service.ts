import { Payment, Contract, House, Booking } from '../../shared/types/index';

export interface ReportFilters {
    startDate: string;
    endDate: string;
    houseType: 'All' | 'Apartment' | 'House' | 'Condo';
}

interface ReportData {
    id: string;
    paymentDate: string;
    tenantName: string;
    propertyAddress: string;
    propertyType: string;
    amount: number;
}

interface ReportSummary {
    totalRevenue: number;
    paymentCount: number;
    newBookings: number;
}

interface ReportPayload {
    payments: Payment[];
    contracts: Contract[];
    houses: House[];
    bookings: Booking[];
}

export const generateReportData = (
    data: ReportPayload,
    filters: ReportFilters
): { reportData: ReportData[]; summary: ReportSummary } => {
    const { payments, contracts, houses, bookings } = data;
    const { startDate, endDate, houseType } = filters;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Filter payments by date
    const filteredPayments = payments.filter(p => {
        if (!p.paidDate) return false;
        const paidDate = new Date(p.paidDate);
        return paidDate >= startDateObj && paidDate <= endDateObj;
    });

    let reportData: ReportData[] = [];

    filteredPayments.forEach(payment => {
        const contract = contracts.find(c => c.id === payment.contractId);
        if (!contract) return;

        const booking = bookings.find(b => b.id === contract.bookingId);
        if (!booking) return;
        
        const house = houses.find(h => h.id === booking.houseId);
        if (!house) return;

        // Filter by house type
        if (houseType !== 'All' && house.type !== houseType) {
            return;
        }

        reportData.push({
            id: payment.id,
            paymentDate: payment.paidDate || 'N/A',
            tenantName: contract.userName,
            propertyAddress: house.address,
            propertyType: house.type,
            amount: payment.amount,
        });
    });
    
    // Calculate summary
    const totalRevenue = reportData.reduce((acc, item) => acc + item.amount, 0);
    const paymentCount = reportData.length;

    const newBookings = bookings.filter(b => {
        const bookingStartDate = new Date(b.startDate);
        return bookingStartDate >= startDateObj && bookingStartDate <= endDateObj;
    }).length;

    const summary: ReportSummary = {
        totalRevenue,
        paymentCount,
        newBookings,
    };
    
    // Sort data by date descending
    reportData.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

    return { reportData, summary };
};