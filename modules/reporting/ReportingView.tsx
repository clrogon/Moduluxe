import React, { useState, useMemo } from 'react';
import { Payment, Contract, House, Booking } from '../../shared/types/index';
import { generateReportData, ReportFilters } from './reporting.service';
import DataTable from '../../components/ui/DataTable';
import { ChartBarIcon, CreditCardIcon, DocumentTextIcon, CalendarDaysIcon } from '../../components/ui/icons/Icons';
import DashboardCard from '../../components/ui/DashboardCard';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { ExportContext } from '../../core/domain/reporting/ExportContext';
import { PDFService } from '../../core/services/pdfService';

interface ReportingViewProps {
    payments: Payment[];
    contracts: Contract[];
    houses: House[];
    bookings: Booking[];
}

const ReportingView: React.FC<ReportingViewProps> = ({ payments, contracts, houses, bookings }) => {
    const { t } = useTranslation();
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));

    const [filters, setFilters] = useState<ReportFilters>({
        startDate: thirtyDaysAgo.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
        houseType: 'All',
    });
    
    // Strategy selection state
    const [exportType, setExportType] = useState('pdf');

    const { reportData, summary } = useMemo(() => {
        return generateReportData({ payments, contracts, houses, bookings }, filters);
    }, [payments, contracts, houses, bookings, filters]);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value } as ReportFilters));
    };

    const handleExport = () => {
        const expSummary = {
            totalRevenue: summary.totalRevenue,
            paymentCount: summary.paymentCount,
            newBookings: summary.newBookings,
            startDate: filters.startDate,
            endDate: filters.endDate
        };
        
        const context = ExportContext.getInstance();
        context.setActiveStrategy(exportType);
        context.getActiveStrategy().export(expSummary, reportData);
    };

    const columns = useMemo(() => [
        { key: 'paymentDate', label: t('reporting.columns.date') },
        { key: 'tenantName', label: t('reporting.columns.tenant') },
        { key: 'propertyAddress', label: t('reporting.columns.property') },
        { key: 'propertyType', label: t('reporting.columns.type') },
        { key: 'amount', label: t('reporting.columns.amount'), render: (item: any) => item.amount.toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'}) },
    ], [t]);

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-full mr-4">
                    <ChartBarIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('reporting.title')}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t('reporting.subtitle')}</p>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full md:w-auto">
                    <label htmlFor="startDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('reporting.startDate')}</label>
                    <input type="date" id="startDate" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-sm"/>
                </div>
                <div className="flex-1 w-full md:w-auto">
                    <label htmlFor="endDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('reporting.endDate')}</label>
                    <input type="date" id="endDate" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-700 text-sm"/>
                </div>
                <div className="flex-1 w-full md:w-auto">
                    <label htmlFor="houseType" className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('reporting.propertyType')}</label>
                    <select id="houseType" name="houseType" value={filters.houseType} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm rounded-md">
                        <option value="All">All</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Condo">Condo</option>
                    </select>
                </div>
                <div className="w-full md:w-auto self-end flex flex-row items-center gap-2">
                    <div className="flex-1 min-w-[120px]">
                        <select 
                            id="exportType"
                            name="exportType"
                            value={exportType}
                            onChange={(e) => setExportType(e.target.value)}
                            className="block w-full py-2.5 pl-3 pr-10 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="pdf">PDF Report</option>
                            <option value="csv">CSV Sheet</option>
                            <option value="json">JSON Schema</option>
                        </select>
                    </div>
                    <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg shadow transition-colors flex items-center justify-center whitespace-nowrap">
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        {t('reporting.export')}
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard title={t('reporting.totalRevenue')} value={summary.totalRevenue.toLocaleString('pt-AO', {style: 'currency', currency: 'AOA'})} icon={<CreditCardIcon className="h-8 w-8 text-green-500" />} />
                <DashboardCard title={t('reporting.paymentsRecorded')} value={summary.paymentCount.toString()} icon={<DocumentTextIcon className="h-8 w-8 text-blue-500" />} />
                <DashboardCard title={t('reporting.newBookings')} value={summary.newBookings.toString()} icon={<CalendarDaysIcon className="h-8 w-8 text-purple-500" />} />
            </div>

            {/* Data Table */}
            <DataTable 
                title={t('reporting.tableTitle', { startDate: filters.startDate, endDate: filters.endDate })}
                columns={columns}
                data={reportData}
            />
        </div>
    );
};

export default ReportingView;