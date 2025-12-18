
import { Invoice } from '../../shared/types/index';

/**
 * InvoiceService
 * Simulates async API calls for managing Invoices.
 */
export const InvoiceService = {
  getAll: async (): Promise<Invoice[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
};